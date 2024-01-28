const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

exports.dashboard = async (req, res, next) => {
    try {
        let { id } = req.body;
        const user = await sequelize.query(
            `select email, first_name, last_name, phone_number, photo_url from users where id = ?`,
            {
                replacements: [id],
                type: QueryTypes.SELECT
            }
        );
        if (user) {
            const total_hotels = await sequelize.query(
                `select count(distinct hotel_id) AS total_hotel_stayed from bookings where user_id = ?;`,
                {
                    replacements: [id],
                    type: QueryTypes.SELECT
                }
            );
            const total_rooms = await sequelize.query(
                `select Count(*) AS total_rooms_booked from bookings where user_id = ?;`,
                {
                    replacements: [id],
                    type: QueryTypes.SELECT
                }
            );
            
            const total_expenses = await sequelize.query(
                `select SUM(amount) AS total_expenses from payments where user_id = ?;`,
                {
                    replacements: [id],
                    type: QueryTypes.SELECT
                }
            );

            let total_expenses_per_month = {
                'January': 0,'February': 0,'March': 0,'April': 0,'May': 0,'June': 0,
                'July': 0,'August': 0,'September': 0,'October': 0,'November': 0,'December': 0
            }

            const exp_per_month = await sequelize.query(
                `SELECT monthname(checkout) as 'month', SUM(payments.amount) as total_amount
                FROM payments
                LEFT JOIN bookings ON bookings.payment_id = payments.id
                where year(UTC_DATE()) = year(checkout) and bookings.user_id = ?
                GROUP BY 1;`,
                {
                    replacements: [id],
                    type: QueryTypes.SELECT
                }
            );

            for(let i=0; i<exp_per_month.length; i++){
                const month = exp_per_month[i]['month'];
                total_expenses_per_month[month] = exp_per_month[i]['total_amount']; 
            }

            return res.status(200).json({
                email: user[0].email,
                first_name: user[0].first_name,
                last_name: user[0].last_name,
                photo_url: user[0].photo_url,
                phone_number: user[0].phone_number,
                total_hotel_stayed: total_hotels[0].total_hotel_stayed,
                total_rooms_booked: total_rooms[0].total_rooms_booked,
                total_expenses: total_expenses[0].total_expenses,
                total_expenses_per_month: total_expenses_per_month
            });
        } else {
            return res.status(404).json({ message: "User does not exist" });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};



exports.currentBookings = async (req, res, next) => {
    try {
        let { id } = req.body;
        const booking_details = await sequelize.query(
            `SELECT ROW_NUMBER() OVER () as booking_number, hotels.name as hotel_name, bookings.total_rooms,
            bookings.total_guests, payments.amount, bookings.checkin, bookings.checkout
            FROM bookings
            INNER JOIN hotels ON bookings.hotel_id = hotels.id
            INNER JOIN payments ON bookings.payment_id = payments.id
            where bookings.user_id = ? and (CURDATE() <= bookings.checkout);`,
            {
                replacements: [id],
                type: QueryTypes.SELECT
            }
        );
        return res.status(200).json({
            booking_details: booking_details
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.bookingDetails = async (req, res, next) => {
    try {
        let { id } = req.body;
        const booking_details = await sequelize.query(
            `SELECT ROW_NUMBER() OVER () as booking_number, hotels.name as hotel_name, bookings.total_rooms,
            bookings.total_guests, payments.amount, bookings.checkin, bookings.checkout, payments.id AS payment_id,
            payments.balance_transaction as transaction_id, payments.email, payments.phone, payments.zip_code, payments.card
            FROM bookings
            INNER JOIN hotels ON bookings.hotel_id = hotels.id
            INNER JOIN payments ON bookings.payment_id = payments.id
            where bookings.user_id = ?;`,
            {
                replacements: [id],
                type: QueryTypes.SELECT
            }
        );
        return res.status(200).json({
            booking_details: booking_details
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getProfile = async (req, res, next) => {
    try {
        let { id } = req.body;
        const user = await sequelize.query(
            `SELECT email, first_name, last_name, phone_number, photo_url from users where id = ?`,
            {
                replacements: [id],
                type: QueryTypes.SELECT
            }
        );
        if (user) {
            return res.status(200).json({
                user: user[0]
            });
        } else {
            return res.status(404).json({ error: "User doesn't exist." });
        }
    } catch (error) {
        next(error);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        let { id, email, first_name, last_name, phone_number, photo_url } = req.body;
        const user = await sequelize.query(
            `SELECT email from users where email = ? and id <> ?`,
            {
                replacements: [email, id],
                type: QueryTypes.SELECT
            }
        );

        if(user.length){
            return res.status(409).json({ error: "Email already exists" });
        }

        await sequelize.query(
            `UPDATE users
             SET email = ?, first_name = ?, last_name = ?, phone_number = ?, photo_url = ?
             WHERE id = ?`,
            {
                replacements: [email, first_name, last_name, phone_number, photo_url, id],
                type: QueryTypes.UPDATE
            }
        );
        return res.status(200).json({
            success: "Profile updated"
        });
    } catch (error) {
        next(error);
    }
};