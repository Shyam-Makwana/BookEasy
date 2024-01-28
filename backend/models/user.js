const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Booking, Payment }) {
      this.hasMany(Booking, {
        foreignKey: {name: 'user_id', allowNull: false, onDelete: 'NO ACTION', onUpdate: 'CASCADE'}
      });
      this.hasMany(Payment, {
        foreignKey: {name: 'user_id', allowNull: false, onDelete: 'NO ACTION', onUpdate: 'CASCADE'}
      });
    }
  }
  User.init(
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
        allowNull: true,
        unique: true
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Guest"
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true
      },
      photo_url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://static.vecteezy.com/system/resources/previews/013/042/571/large_2x/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg",
        isUrl: true,
      },
      admin: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      auth_type: {
        type: DataTypes.STRING,
        allowNull: false,
        isIn: [['email', 'google', 'facebook', 'phone']]
      },
      reset_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      token_exp_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      timestamps: false,
    }
  );
  return User;
};
