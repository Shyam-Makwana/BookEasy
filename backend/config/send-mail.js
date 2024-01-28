const nodemailer = require("nodemailer");
const resetTemplate = require("./reset-template");
const subscribeTemplate = require("./subscribe-template");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "team.bookeasy@gmail.com",
    pass: "snrgsmvfktnpdyah",
  },
});

exports.resetMail = async (senderAddress, name, link) => {
  try {
    await transporter.sendMail({
      from: '"BookEasy Team" <team.bookeasy@gmail.com>', // sender address
      to: senderAddress, // list of receivers
      subject: "Please reset your BookEasy password", // Subject line
      html: resetTemplate(senderAddress, name, link)
    });
  } catch (error) {
    throw error;
  }
};

exports.subscribeMail = async (senderAddress) => {
  try {
    await transporter.sendMail({
      from: '"BookEasy Team" <team.bookeasy@gmail.com>', // sender address
      to: senderAddress, // list of receivers
      subject: "Bookeasy newsletter", // Subject line
      html: subscribeTemplate()
    });
  } catch (error) {
    throw error;
  }
};