const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const { User, Subscribe } = require("../models");
const { Op } = require("sequelize");
const { resetMail, subscribeMail } = require("../config/send-mail");

exports.signup = async (req, res, next) => {
  try {
    let { email, phone_number, first_name, last_name, password, admin, auth_type } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      return res.status(409).json({ error: "Email already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const user = await User.create({
        email,
        phone_number,
        first_name,
        last_name,
        password,
        admin,
        auth_type,
      });
      return res.status(201).json({ message: "Account created successfully" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ error: "Email or password is incorrect" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Email or password is incorrect" });
      } else {
        const token = jwt.sign(
          { id: user.id, email: user.email, phone_number: user.phone_number },
          process.env.TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          id: user.id,
          token: token,
          first_name: user.first_name,
          last_name: user.last_name,
          photo_url: user.photo_url,
          admin: user.admin
        });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.firebaseAuth = async (req, res, next) => {
  try {
    let { auth_type } = req.body;
    if (auth_type == "google" || auth_type == "facebook") {
      let { email, display_name, photo_url, admin } = req.body;
      let [first_name, last_name] = display_name.split(" ");

      let user = await User.findOne({
        where: { email },
      });
      if (!user) {
        user = await User.create({
          email,
          first_name,
          last_name,
          photo_url,
          admin,
          auth_type,
        });
      }
      const token = jwt.sign(
        { id: user.id, email: user.email, phone_number: user.phone_number },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        id: user.id,
        token: token,
        first_name: user.first_name,
        last_name: user.last_name,
        photo_url: user.photo_url,
        admin: user.admin
      });

    }
    else if (auth_type == "phone") {
      let { phone_number, admin } = req.body;

      phone_number = phone_number.slice(-10);

      let user = await User.findOne({
        where: { phone_number },
      });

      if (!user) {
        user = await User.create({
          phone_number,
          admin,
          auth_type,
        });
      }
      const token = jwt.sign(
        { id: user.id, email: user.email, phone_number: user.phone_number },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        id: user.id,
        token: token,
        first_name: user.first_name,
        last_name: user.last_name,
        photo_url: user.photo_url,
        admin: user.admin
      });
    }
    return res.status(401).json({ error: "Authentication failed" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    let { email } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ error: "Email doesn't exist" });
    } else {
      const buffer = crypto.randomBytes(32);
      const token = buffer.toString("hex");
      user.reset_token = token;
      user.token_exp_time = Date.now() + 30 * 60000;
      await user.save();
      await resetMail(
        user.email,
        user.first_name,
        "https://bookeasy.netlify.app/reset-password/" + token
      );
      return res.status(200).json({ message: "Email sent successfully" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.newPassword = async (req, res) => {
  try {
    let { password, token } = req.body;
    const user = await User.findOne({
      where: {
        [Op.and]: [
          {
            reset_token: token,
          },
          {
            token_exp_time: {
              [Op.gt]: Date.now(),
            },
          },
        ],
      },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    } else {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.reset_token = null;
      user.token_exp_time = null;
      await user.save();
      return res.status(200).json({ message: "Password has been successfully reset" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.subscribe = async (req, res, next) => {
  try {
    let { email } = req.body;
    const is_subscribed = await Subscribe.findOne({
      where: { email },
    });
    if (!is_subscribed) {
      await subscribeMail(
        email
      );
      await Subscribe.create({
        email
      });
      return res.status(201).json({ message: "Thank you for subscribing to our daily newsletter." });
    } else {
      return res.status(200).json({ message: "You have already subscribed to our daily newsletter." });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};