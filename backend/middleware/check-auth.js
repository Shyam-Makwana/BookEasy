const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
const { User } = require("../models");

dotenv.config();

exports.authToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.body.id = decodedToken.id;
    return next();
  } catch (err) {
    return res.status(404).json({error: "Session expired"});
  }
};

exports.authType = async (req, res, next) => {
  try {
    let { email, auth_type } = req.body;
    if (auth_type == "phone") return next();
    const user = await User.findOne({
      attributes: ['email', 'auth_type'],
      where: { email },
    });
    if(user){
      if(user.auth_type != auth_type){
        if(user.auth_type == "email"){
          return res.status(401).json({error: `This account is not linked with ${auth_type}. Kindly login using your email address.`});
        }
        else if(user.auth_type == "google"){
          return res.status(401).json({error: `This account is not linked with ${auth_type}. Kindly login using your google account.`});
        }
        else if(user.auth_type == "facebook"){
          return res.status(401).json({error: `This account is not linked with ${auth_type}. Kindly login using your facebook account.`});
        }
      }
    }
    return next();
    
  } catch (error) {
    console.log(error)
    return res.status(404).json({error: "Session expired"});
  }
};