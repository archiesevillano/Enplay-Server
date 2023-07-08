const express = require("express");
const router = express.Router();
const Axios = require("axios");

router.get("/converter/url:", async (req, res) => {
    const url = req.params.url;
    const { AIOV_API_KEY, AIOV_HOST } = process.env;

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
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }

})