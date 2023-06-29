const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const router = require("./routes/index");
// require("dotenv").config()
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(fileupload());
// app.use(express.static("uploads"));
app.use("/", router);

module.exports = app;
