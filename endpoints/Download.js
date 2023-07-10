const express = require("express");
const app = express();
const fileDownload = require("js-file-download");
const router = express.Router();

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
    const title = req.body.title;
    const ext = req.body.ext;

    const fs = require('fs');
    const download = require('download');

    try {
        download(fileUrl).pipe(fs.createWriteStream(`Downloads/${title}.${ext}`));
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }

});

module.exports = router;