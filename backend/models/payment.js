const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate({ Booking }) {
      this.hasMany(Booking, {
        foreignKey: {name: 'payment_id', allowNull: false, onDelete: 'NO ACTION', onUpdate: 'CASCADE'}
      });
    }
  }
  Payment.init(
    {
      id: {
        type: DataTypes.STRING(40),
        primaryKey: true
      },
      checkout_id: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      payment_method_id: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      charge_id: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      balance_transaction: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT(15),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      zip_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      card: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "payments",
      modelName: "Payment",
      timestamps: false,
    }
  );
  return Payment;
};
