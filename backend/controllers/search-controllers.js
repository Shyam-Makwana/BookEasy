const { sequelize, Hotel } = require("../models");
const { Op, QueryTypes } = require("sequelize");

getTomDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedTomorrow = tomorrow.toLocaleString('sv-SE').substring(0, 10);
  return formattedTomorrow;
}

exports.search = async (req, res, next) => {

  const city = req.query.city ? req.query.city.toLowerCase() : 'bloomington';
  const guests = req.query.guests ? parseInt(req.query.guests) : 1;
  const rooms = req.query.rooms ? parseInt(req.query.rooms) : 1;
  const checkin = req.query.checkin ? req.query.checkin : (new Date().toLocaleString('sv-SE').substring(0, 10));
  const checkout = req.query.checkout ? req.query.checkout : getTomDate();

  try {
    const hotels = await sequelize.query(
      `SELECT h.id, h.name, h.price, h.beds_per_room, h.guests_per_room, (h.rooms - IFNULL(b.bookings_count, 0)) AS rooms_remaining, (select url from hotel_images where hotel_id = h.id LIMIT 1) as url
        FROM hotels h
        LEFT JOIN (
            SELECT hotel_id, COUNT(*) AS bookings_count
            FROM bookings
            WHERE ((? >= checkin and ? < checkout) or (? <= checkin and ? > checkin))
            GROUP BY hotel_id
        ) b ON h.id = b.hotel_id
        WHERE (h.rooms - IFNULL(b.bookings_count, 0)) >= ? and (? * guests_per_room) >= ? and h.city = ?`,
      {
        replacements: [checkin, checkin, checkin, checkout, rooms, rooms, guests, city],
        type: QueryTypes.SELECT
      }
    );
    return res.status(200).json({ hotels: hotels });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getHotel = async (req, res, next) => {

  const hotel_id = req.params.id;
  const checkin = req.query.checkin ? req.query.checkin : (new Date().toLocaleString('sv-SE').substring(0, 10));
  const checkout = req.query.checkout ? req.query.checkout : getTomDate();

  try {
    const hotels = await sequelize.query(
      `SELECT h.*, (h.rooms - IFNULL(b.bookings_count, 0)) AS rooms_remaining
        FROM hotels h
        LEFT JOIN (
            SELECT hotel_id, COUNT(*) AS bookings_count
            FROM bookings
            WHERE ((? >= checkin and ? < checkout) or (? <= checkin and ? > checkin))
            GROUP BY hotel_id
        ) b ON h.id = b.hotel_id
        WHERE h.id = ?`,
      {
        replacements: [checkin, checkin, checkin, checkout, hotel_id],
        type: QueryTypes.SELECT
      }
    );
    
    const hotel_images = await sequelize.query(
      `select url from hotel_images where hotel_id = ?`,
      {
        replacements: [hotel_id],
        type: QueryTypes.SELECT
      }
    );

    hotel_images.forEach((images, index) => {
      const image = images.url;
      const url = "url_" + (index+1);
      hotels[0][url] = image;
    });
    return res.status(200).json({ hotels: hotels });
  } catch (error) {
    next(error);
  }
};