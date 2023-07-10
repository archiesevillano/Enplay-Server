const express = require("express");
const cors = require("cors");
require('dotenv').config();
const axios = require('axios');
const app = express();
const PORT = 3001 || process.env.PORT;
const converter = require("./endpoints/Converter");
const download = require("./endpoints/Download");

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT
}));

app.use("/api", converter);
app.use("/api", download);

app.listen(PORT, () => {
    console.log("Enplay Server is now running");
})