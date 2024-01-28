//dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const app = express();
const port = process.env.SERVER_PORT || 3000;
const userRoutes = require("./routes/user-routes");
const ownerRoutes = require("./routes/owner-routes");

const {sequelize} = require('./models');

//dotenv
dotenv.config();

//App
app.use(cors());
app.use(express.json());

//routes
app.use("/api/users", userRoutes);
app.use("/api/owners", ownerRoutes);

app.use((err, req, res, next) => {
  console.log("Something went wrong!!!");
  console.log(err);
  return res.status(404).json({ error: "Something went wrong"});
})

app.listen(port, async () => {
  await sequelize.sync();
  console.log("Welcome to Node!! Server is running...");
});