const { Hotel, Hotel_Image } = require("../models");

exports.addHotel = async (req, res, next) => {
  try {
    let { name, description, address, city, state, pincode, country, contact_no, price, rooms, beds_per_room, 
        guests_per_room, bathrooms, wifi, television, id, urls } = req.body;
    const hotel_name = await Hotel.findOne({
      where: { name },
    });
    if (hotel_name) {
      return res.status(409).json({ error: "Hotel exists with the same name." });
    } else {
      const hotel = await Hotel.create({
        name, description, address, city, state, pincode, country, contact_no, price, rooms, beds_per_room, 
        guests_per_room, bathrooms, wifi, television, owner_id: id
      });

      for (const key in urls) {
        const hotel_images = await Hotel_Image.create({
           url: urls[key],
           hotel_id: hotel.id 
        });
      }

      return res.status(201).json({ message: "Hotel added successfully" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};