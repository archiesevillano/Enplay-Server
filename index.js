const express = require("express");
const cors = require("cors");
require('dotenv').config();
const axios = require('axios');
const app = express();
const PORT = 3001 || process.env.PORT;

const converter = require("./endpoints/Converter");
const contact = require("./endpoints/Emailer");

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT
}));

// routes
app.use("/converter", converter);
app.use("/send", contact);

app.listen(PORT, () => {
    console.log("Enplay Server is now running");
})