import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { readdirSync } from "fs";
require("dotenv").config();
const paypal = require('paypal-rest-sdk');
const app = express();

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// autoload route
readdirSync("./src/routes").forEach((route) => {
  app.use("/api", require(`./routes/${route}`));
});
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': '####yourclientid######',
  'client_secret': '####yourclientsecret#####'
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connect successfully"))
  .catch((error) => console.log(error));
mongoose.set("strictQuery", false);
// mongoose
//   .connect("mongodb://127.0.0.1:27017/duantn2023")
//   .then(() => console.log("Connect successfully"))
//   .catch((error) => console.log(error));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
