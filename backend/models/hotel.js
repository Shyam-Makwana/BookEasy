const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    static associate({ Hotel_Image, Booking }) {
      this.hasMany(Hotel_Image, {
        foreignKey: {name: 'hotel_id', allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE'}
      });
      this.hasMany(Booking, {
        foreignKey: {name: 'hotel_id', allowNull: false, onDelete: 'NO ACTION', onUpdate: 'CASCADE'}
      });
    }
  }
  Hotel.init(
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
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      pincode: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      contact_no: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT(10),
        allowNull: false,
      },
      rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      beds_per_room: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      guests_per_room: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      wifi: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      television: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: "hotels",
      modelName: "Hotel",
      timestamps: false,
    }
  );
  return Hotel;
};
