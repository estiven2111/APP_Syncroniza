const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require("./routes/index")
// require("dotenv").config()
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", router)



module.exports = app