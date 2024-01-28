const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subscribe extends Model {}
  Subscribe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      tableName: "subscribes",
      modelName: "Subscribe",
      timestamps: false,
    }
  );
  return Subscribe;
};
