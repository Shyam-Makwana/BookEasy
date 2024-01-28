const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Owner extends Model {
    static associate({ Hotel }) {
      this.hasMany(Hotel, {
        foreignKey: {name: 'owner_id', allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE'}
      });
    }
  }
  Owner.init(
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
      contact_no: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "owners",
      modelName: "Owner",
      timestamps: false,
    }
  );
  return Owner;
};
