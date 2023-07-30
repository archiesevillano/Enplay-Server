const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { MAIL_ACC, TO_EMAIL, MAIL_PSWD } = process.env;

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

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MAIL_ACC,
        pass: MAIL_PSWD
    },
    tls: {
        rejectUnauthorized: false
    }
});

const send = async (message, name, email) => {
    const result = await transporter.sendMail({
        from: name,
        to: TO_EMAIL,
        subject: `${email} sent a message`,
        html: message
    });

    const info = await JSON.stringify(result, null, 4);
    console.log(info);
    return info;
}

router.post("/", requireAccessKey, async (req, res) => {
    try {
        //data to send
        const { message, name, email } = req.body;

        //start sending email
        const data = await send(message, name, email);
        res.send("Sent");
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
});

module.exports = router;