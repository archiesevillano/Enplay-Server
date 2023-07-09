const express = require("express");
const router = express.Router();
const Axios = require("axios");

const requireAccessKey = (req, res, next) => {
    try {
        console.log(req.body.accessKey);
        console.log(req.body.url);
        if (!req.body.accessKey === process.env.ACCESS_KEY) {
            next(new Error("Permission denied"));
            return;
        }
        next();
    }
    catch (error) {
        console.log(error);
    }
}

router.get("/converter", requireAccessKey, async (req, res) => {
    const url = req.body.url;
    const { AIOV_API_KEY, AIOV_HOST, AIOV_URL } = process.env;

    console.log("AIOV_API_KEY: ");
    console.log(AIOV_API_KEY);
    console.log("--------------------");
    console.log("AIOV_HOST: ");
    console.log(AIOV_HOST);
    console.log("--------------------");
    console.log("Input URL");
    console.log(url);

    const options = {
        method: 'GET',
        url: AIOV_URL,
        params: {
            URL: url,
        },
        headers: {
            'X-RapidAPI-Key': `${AIOV_API_KEY}`,
            'X-RapidAPI-Host': `${AIOV_HOST}`
        }
    };

    try {
        const response = await Axios.request(options);
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }

});

module.exports = router;