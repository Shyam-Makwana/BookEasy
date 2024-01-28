const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {}
  Booking.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      checkin: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      checkout: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      total_rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_guests: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_nights: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      billing_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      billing_city: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      billing_state: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      billing_zip_code: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "bookings",
      modelName: "Booking",
      timestamps: false,
    }
  );
  return Booking;
};
