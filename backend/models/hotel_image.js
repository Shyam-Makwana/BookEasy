const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Hotel_Image extends Model {}
    Hotel_Image.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            url: {
                type: DataTypes.STRING(500),
                allowNull: false,
            }
        },
        {
            sequelize,
            tableName: "hotel_images",
            modelName: "Hotel_Image",
            timestamps: false,
        }
    );
    return Hotel_Image;
};
