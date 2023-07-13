const express = require("express");
const router = express.Router();
const Axios = require("axios");
const { TiktokDL } = require("@tobyg74/tiktok-api-dl");
const pornhub = require('@justalk/pornhub-api');
const fbvid = require('fbvideos');

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

// youtube converter
router.post("/youtube", requireAccessKey, async (req, res) => {
    const url = req.body.url;
    const { AIOV_API_KEY, AIOV_HOST, AIOV_URL } = process.env;

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
        console.log(response.data);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.send(error);
    }

});

// facebook converter
router.post("/facebook", requireAccessKey, async (req, res) => {
    const url = req.body.url;

    try {
        const response = await fbvid.high(url);
        console.log(response);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.send(error);
    }

    // POSSIBLE ERRORS
    // Either the video is deleted or it's not shared publicly!

});

// pornhub downloader
router.post("/pornhub", requireAccessKey, async (req, res) => {
    const url = req.body.url;

    try {
        const response = await pornhub.page(url, ['title', 'download_urls']);
        console.log(response.data);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.send(error);
    }

});

// tiktok converter
router.post("/tiktok", requireAccessKey, async (req, res) => {
    const url = req.body.url;

    try {
        const response = await TiktokDL(url);
        console.log(response.data);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.send(error);
    }

});

module.exports = router;


// FACEBOOK SAMPLE RESPONSE

// AUDIO =======
// {
//     abr: 49.244,
//     acodec: 'mp4a.40.5',
//     asr: 44100,
//     audio_ext: 'm4a',
//     container: 'm4a_dash',
//     dynamic_range: null,
//     ext: 'm4a',
//     filesize: null,
//     filesize_approx: 1910301,
//     format: '970874477462463a-1 - audio only (DASH audio)',
//     format_id: '970874477462463a-1',
//     format_note: 'DASH audio',
//     fps: null,
//     height: null,
//     http_headers: [Object],
//     language: null,
//     manifest_stream_number: 0,
//     manifest_url: null,
//     protocol: 'https',
//     resolution: 'audio only',
//     tbr: 49.244,
//     url: 'https://video-iad3-1.xx.fbcdn.net/v/t42.1790-2/357289082_798748431848054_5789857164165856230_n.mp4?_nc_cat=1&ccb=1-7&_nc_sid=9c5c06&efg=eyJ2ZW5jb2RlX3RhZyI6ImRhc2hfYXVkaW9fYWFjcF80OF9mcmFnXzJfYXVkaW8ifQ==&_nc_ohc=JRREowRFXVwAX_CYtTz&_nc_ht=video-iad3-1.xx&oh=00_AfABRuY0sRKBaTvbMkPjlLSJ224ly6SiuXphXquX2u2hJw&oe=64B323B2',
//     vcodec: 'none',
//     video_ext: 'none',
//     width: null
//   }

// VIDEO ======
// {
//     acodec: 'none',
//     asr: null,
//     audio_ext: 'none',
//     container: 'mp4_dash',
//     dynamic_range: 'SDR',
//     ext: 'mp4',
//     filesize: null,
//     filesize_approx: 31286600,
//     format: '7223226327704463v-1 - 1920x1080 (DASH video)',
//     format_id: '7223226327704463v-1',
//     format_note: 'DASH video',
//     fps: null,
//     height: 1080,
//     http_headers: [Object],
//     language: null,
//     manifest_stream_number: 0,
//     manifest_url: null,
//     protocol: 'https',
//     resolution: '1920x1080',
//     tbr: 806.51,
//     url: 'https://video-iad3-2.xx.fbcdn.net/v/t39.25447-2/358570513_622945259609285_2150662131099977890_n.mp4?_nc_cat=105&ccb=1-7&_nc_sid=9c5c06&efg=eyJ2ZW5jb2RlX3RhZyI6ImRhc2hfcjJfdnA5X2dlbjFhdmNfcTkwX2ZyYWdfMl92aWRlbyJ9&_nc_ohc=B-vcb2S2xZgAX9MCWXW&_nc_ht=video-iad3-2.xx&oh=00_AfDbMeEXyI5_At-y6DvTxu6a3kELwLSMVPAqgP8ArWbY8Q&oe=64B31864',
//     vbr: 806.51,
//     vcodec: 'vp09.00.40.08.01.02.02.02.00',
//     video_ext: 'mp4',
//     width: 1920
//   }
                             
// VIDEO AND AUDIO
// {
//     audio_ext: 'none',
//     dynamic_range: 'SDR',
//     ext: 'mp4',
//     format: 'hd - unknown',
//     format_id: 'hd',
//     http_headers: [Object],
//     protocol: 'https',
//     quality: 1,
//     resolution: null,
//     url: 'https://video-iad3-2.xx.fbcdn.net/v/t39.25447-2/347557621_299774135805095_362893702857934045_n.mp4?_nc_cat=100&vs=ea0577484a57c42&_nc_vs=HBksFQAYJEdQVk90eFNucE9DYXBCQUJBTjNFRW1ybVFRa0ZibWRqQUFBRhUAAsgBABUAGCRHUHliVFJVcTctUGZWelFGQU13dDN3eFNzdk10YnJGcUFBQUYVAgLIAQBLB4gScHJvZ3Jlc3NpdmVfcmVjaXBlATENc3Vic2FtcGxlX2ZwcwAQdm1hZl9lbmFibGVfbnN1YgAgbWVhc3VyZV9vcmlnaW5hbF9yZXNvbHV0aW9uX3NzaW0AKGNvbXB1dGVfc3NpbV9vbmx5X2F0X29yaWdpbmFsX3Jlc29sdXRpb24AHXVzZV9sYW5jem9zX2Zvcl92cW1fdXBzY2FsaW5nABFkaXNhYmxlX3Bvc3RfcHZxcwAVACUAHIwXQAAAAAAAAAAREQAAACbm2PCJpqjyAhUCKAJDMxgLdnRzX3ByZXZpZXccF0By8AAAAAAAGClkYXNoX2k0bGl0ZWJhc2ljXzVzZWNnb3BfaHEyX2ZyYWdfMl92aWRlbxIAGBh2aWRlb3MudnRzLmNhbGxiYWNrLnByb2Q4ElZJREVPX1ZJRVdfUkVRVUVTVBsKiBVvZW1fdGFyZ2V0X2VuY29kZV90YWcGb2VwX2hkE29lbV9yZXF1ZXN0X3RpbWVfbXMBMAxvZW1fY2ZnX3J1bGUHdW5tdXRlZBNvZW1fcm9pX3JlYWNoX2NvdW50BjY0MDkxMBFvZW1faXNfZXhwZXJpbWVudAAMb2VtX3ZpZGVvX2lkEDMwNjA4OTI3Njc1MzkyMzESb2VtX3ZpZGVvX2Fzc2V0X2lkDzY2MDY1MTgxOTI0NDc1MhVvZW1fdmlkZW9fcmVzb3VyY2VfaWQPODE0MzMwOTA5OTU1NjM1HG9lbV9zb3VyY2VfdmlkZW9fZW5jb2RpbmdfaWQQMTIzNjYxMTEzMzcwNTcyNQ52dHNfcmVxdWVzdF9pZAAlAhwAJb4BGweIAXMENjIyMQJjZAoyMDIzLTA3LTA1A3JjYgY2NDA5MDADYXBwFkNyZWF0b3IgU3R1ZGlvIGZvciBpT1MCY3QZQ09OVEFJTkVEX1BPU1RfQVRUQUNITUVOVBNvcmlnaW5hbF9kdXJhdGlvbl9zBzMwMy4wNjcCdHMVcHJvZ3Jlc3NpdmVfZW5jb2RpbmdzAA%3D%3D&ccb=1-7&_nc_sid=189a0e&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ohc=klqNYbqwMJ0AX9WGUVG&_nc_ht=video-iad3-2.xx&oh=00_AfD44ntg8DfeMfs70LPrKAIG-JhpOXzLIabWUXHkCiV0qg&oe=64B30A1D&_nc_rid=969596957461603',
//     video_ext: 'mp4'
//   }