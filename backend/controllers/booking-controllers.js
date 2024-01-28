const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const { Booking, Payment } = require("../models");

const tax_id = "txr_1MnaCAB1sRKdcQ9KcEPh9r6l";
const service_id = "txr_1MnaBaB1sRKdcQ9KJ6jkjHH4";

exports.checkout = async (req, res, next) => {
    const nights = (req.body.total_nights == 1) ? " night" : " nights";
    try {
        const session = await stripe.checkout.sessions.create({
            client_reference_id: req.body.id,
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: Array.from({ length: req.body.total_rooms }).fill().map((_, index) => {
                return {
                    quantity: 1,
                    price_data: {
                        currency: 'usd',
                        unit_amount: req.body.room_price * req.body.total_nights * 100,
                        product_data: {
                            name: 'Room ' + (index + 1),
                            description: req.body.total_nights + nights,
                            images: [req.body.image]
                        },
                    },
                    tax_rates: [service_id, tax_id],
                };
              }),
            phone_number_collection: {
                enabled: true,
            },
            metadata: {
                hotel_id: req.body.hotel_id,
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone: req.body.phone,
                billing_address: req.body.billing_address,
                billing_city: req.body.billing_city,
                billing_state: req.body.billing_state,
                billing_zip_code: req.body.billing_zip_code,
                checkin: req.body.checkin,
                checkout: req.body.checkout,
                total_rooms: req.body.total_rooms,
                total_guests: req.body.total_guests,
                total_nights: req.body.total_nights
            },
            success_url: 'https://bookeasy.netlify.app/confirmation',
            cancel_url: 'https://bookeasy.netlify.app/payment_failed',
        })
        res.json({ url: session.url });
    }
    catch (error) {
        console.log(error);
        next();
    }
};

exports.pay = async (request, response, next) => {
    try {
        const payloadString = JSON.stringify(request.body, null, 2);
        const secret = process.env.STRIPE_SECRET_KEY;

        const header = await stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret,
        });
        const event = stripe.webhooks.constructEvent(payloadString, header, secret);

        switch (event.type) {

            case 'checkout.session.completed':
                const checkoutSessionCompleted = event.data.object;

                const paymentIntent = await stripe.paymentIntents.retrieve(
                    checkoutSessionCompleted.payment_intent
                );

                const charge_id = paymentIntent.latest_charge;

                const charge = await stripe.charges.retrieve(
                    charge_id
                );

                const payment = await Payment.create({
                    id: charge.payment_intent,
                    checkout_id: checkoutSessionCompleted.id,
                    payment_method_id: charge.payment_method,
                    charge_id: charge.id,
                    balance_transaction: charge.balance_transaction,
                    amount: charge.amount_captured / 100,
                    email: charge.billing_details.email,
                    name: charge.billing_details.name,
                    phone: checkoutSessionCompleted.customer_details.phone,
                    zip_code: charge.billing_details.address.postal_code,
                    card: charge.payment_method_details.card.last4,
                    user_id: checkoutSessionCompleted.client_reference_id,
                });

                const booking = await Booking.create({
                    name: checkoutSessionCompleted.metadata.first_name + " " + checkoutSessionCompleted.metadata.last_name,
                    email: checkoutSessionCompleted.metadata.email,
                    phone: checkoutSessionCompleted.metadata.phone,
                    checkin: checkoutSessionCompleted.metadata.checkin,
                    checkout: checkoutSessionCompleted.metadata.checkout,
                    total_rooms: checkoutSessionCompleted.metadata.total_rooms,
                    total_guests: checkoutSessionCompleted.metadata.total_guests,
                    total_nights: checkoutSessionCompleted.metadata.total_nights,
                    billing_address: checkoutSessionCompleted.metadata.billing_address,
                    billing_city: checkoutSessionCompleted.metadata.billing_city,
                    billing_state: checkoutSessionCompleted.metadata.billing_state,
                    billing_zip_code: checkoutSessionCompleted.metadata.billing_zip_code,
                    hotel_id: checkoutSessionCompleted.metadata.hotel_id,
                    payment_id: charge.payment_intent,
                    user_id: checkoutSessionCompleted.client_reference_id,
                });

                break;

            case 'charge.succeeded':
                break;
            case 'payment_intent.succeeded':
                break;
            case 'payment_intent.created':
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        response.status(200).json({ success: "Payment successful." });
    }
    catch (error) {
        console.log(error)
        next();
    }
};