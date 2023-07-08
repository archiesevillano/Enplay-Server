const express = require("express");
const router = express.Router();
const Axios = require("axios");

router.get("/converter/download", async (req, res) => {
    const url = "https://www.youtube.com/watch?v=IeP_UNgaYbs";
    const { AIOV_API_KEY, AIOV_HOST } = process.env;

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
        url: 'https://aiov-download-youtube-videos.p.rapidapi.com/GetVideoDetails',
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