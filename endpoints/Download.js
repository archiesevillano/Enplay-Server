const express = require("express");
const app = express();
const downloader = require("js-file-downloader");

const requireAccessKey = (req, res, next) => {
    try {
        if (!req.body.accessKey === process.env.ACCESS_KEY) {
            next(new Error("Permission denied"));
            return;
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
}

router.post("/download", requireAccessKey, async (req, res) => {
    const fileUrl = req.body.url;

    console.log("Download Starting...");

    try {
        await new JsFileDownloader({
            url: fileUrl
        });

        console.log("Downloaded Successfully");
        res.send("Downloaded Successfully");
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }

});

module.exports = router;