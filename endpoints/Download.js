const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/download", async (req, res) => {
    const url = req.body.url;

    try {

        const response = await axios({
            url: url,
            method: 'GET',
            responseType: 'blob'
        });

        console.log(response.data);

        res.send(response.data);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;