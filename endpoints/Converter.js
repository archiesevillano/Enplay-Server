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
        console.log(response);
        res.send(response);
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
        console.log(response);
        res.send(response);
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


// TIKTOK SAMPLE RESPONSE
// {
//     status: 'success',
//     result: {
//       type: 'video',
//       id: '7236658356193152261',
//       createTime: 1684915827,
//       description: 'dito ka lang😠🥺' ,
//       author: {
//         username: 'carie.nieva',
//         nickname: '✿ carie ✿',
//         signature: 'lifestyle, beauty and Jam 🤪🩷' ,
//         birthday: '1900-01-01',
//         region: 'PH'
//       },
//       statistics: {
//         playCount: 486070,
//         downloadCount: 970,
//         shareCount: 6570,
//         commentCount: 491,
//         likeCount: 26734,
//         favoriteCount: 1513
//       },
//       video: [
//         'https://v16.tiktokcdn.com/e6061cdd5bc2f4020eae796ff651fa7b/64b049cf/video/tos/useast2a/tos-useast2a-ve-0068c001/o8tY98wCIUBAnknNM9IHX0zyNytfhgwuAoKMxN/?a=1180&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=1418&bt=709&cs=0&ds=6&ft=zGg3IP-J2nzjVWatBcq3usBvFraySYZUzMCCThbL&mime_type=video_mp4&qs=0&rc=NmQ2aDNmNGg4ZTY0OTk4NEBpandrb2Y6ZnJ2azMzNzczM0AyYDUtMmFgX2AxNDQ2XzA0YSNqZXItcjQwYGpgLS1kMTZzcw%3D%3D&l=202307131300242F4EB507996B9C011173&btag=e00080000&cc=2',
//         'https://v9-rp.tiktokcdn.com/8e263633da2ffe8c749f268708f056cc/64b049cf/video/tos/useast2a/tos-useast2a-ve-0068c001/o8tY98wCIUBAnknNM9IHX0zyNytfhgwuAoKMxN/?a=1180&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=1418&bt=709&cs=0&ds=6&ft=zGg3IP-J2nzjVWatBcq3usBvFraySYZUzMCCThbL&mime_type=video_mp4&qs=0&rc=NmQ2aDNmNGg4ZTY0OTk4NEBpandrb2Y6ZnJ2azMzNzczM0AyYDUtMmFgX2AxNDQ2XzA0YSNqZXItcjQwYGpgLS1kMTZzcw%3D%3D&l=202307131300242F4EB507996B9C011173&btag=e00080000&cc=1b',
//         'https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/play/?video_id=v09044g40000chmsco3c77uc0luhhtmg&line=0&is_play_url=1&source=PackSourceEnum_FEED&file_id=7135b69671734bc5bec1dc500e83ca53&item_id=7236658356193152261&signv3=video_id;file_id;item_id.32b4dbf2272616172100105e030353ac'
//       ],
//       cover: [
//         'https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/o4cBfxgbBtrkeBAYIZnaRx7nQDPEJNBvCobrQN~noop.image?x-expires=1689339600&x-signature=YnegjGG36fFwJ%2BI4H6aFG6PE7bU%3D&s=FEED&se=false&sh=&sc=cover&l=202307131300242F4EB507996B9C011173',
//         'https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/o4cBfxgbBtrkeBAYIZnaRx7nQDPEJNBvCobrQN~noop.jpeg?x-expires=1689339600&x-signature=sMpox5q5%2FsyIw0oV6G1dFKySssM%3D&s=FEED&se=false&sh=&sc=cover&l=202307131300242F4EB507996B9C011173'
//       ],
//       dynamic_cover: [
//         'https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/4b91941ea94f4404b079bb66b0077419_1684915834?x-expires=1689339600&x-signature=SfcpdtRj2tdjMCaCpMbF3xXi7wk%3D&s=FEED&se=false&sh=&sc=dynamic_cover&l=202307131300242F4EB507996B9C011173'
//       ],
//       music: [
//         'https://sf16-ies-music-va.tiktokcdn.com/obj/ies-music-ttp-dup-us/7226440226598652718.mp3'
//       ]
//     }
//   }




// YOUTUBE VIDEO SAMPLE RESPONSE
// {
//     abr: 0,
//     acodec: 'mp4a.40.2',
//     asr: 44100,
//     audio_channels: 2,
//     audio_ext: 'none',
//     dynamic_range: 'SDR',
//     ext: 'mp4',
//     filesize: 4621608,
//     format: '18 - 640x360 (360p)',
//     format_id: '18',
//     format_note: '360p',
//     fps: 30,
//     has_drm: false,
//     height: 360,
//     http_headers: [Object],
//     language: '',
//     language_preference: -1,
//     preference: null,
//     protocol: 'https',
//     quality: 6,
//     resolution: '640x360',
//     source_preference: -1,
//     tbr: 186.56,
//     url: 'https://rr1---sn-p5qlsn7s.googlevideo.com/videoplayback?expire=1689276417&ei=ofuvZNaZDeeS_9EPzMK0uAE&ip=3.87.153.214&id=o-AB1ob-UWpOAGgMO6j7qesZa9EfbjAMgk-HojMx7zgn_n&itag=18&source=youtube&requiressl=yes&mh=sB&mm=31%2C29&mn=sn-p5qlsn7s%2Csn-p5qs7nsk&ms=au%2Crdu&mv=m&mvi=1&pl=17&initcwndbps=811250&spc=Ul2Sq_wugPTlbOnfBiJAjotHvllZksM&vprv=1&svpuc=1&mime=video%2Fmp4&gir=yes&clen=4621608&ratebypass=yes&dur=198.182&lmt=1685874861544686&mt=1689254479&fvip=4&fexp=24007246%2C51000022&beids=24350017&c=ANDROID&txp=5538434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAKS7-Vn_F0ah9gTPAtUglwD4CKHcmA3auP-QxDjGPY4WAiEAlun_3oVJkF25UMAkRnFveXxm70_BpvwbzCFnbhX1PRM%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhALi8xt4_ug2_PA38ERUAA5JpBEfBAnXqWlipwN0ohfv7AiEAux4fq2zMNVod24mEd5zIaWmqzYqhm3NL_grUTmrO_t8%3D',
//     vbr: 186.56,
//     vcodec: 'avc1.42001E',
//     video_ext: 'mp4',
//     width: 640
//   },

// {
//     abr: 0,
//     acodec: 'mp4a.40.2',
//     asr: 44100,
//     audio_channels: 2,
//     audio_ext: 'none',
//     dynamic_range: 'SDR',
//     ext: 'mp4',
//     filesize: null,
//     filesize_approx: 5091761,
//     format: '22 - 1280x720 (720p)',
//     format_id: '22',
//     format_note: '720p',
//     fps: 30,
//     has_drm: false,
//     height: 720,
//     http_headers: [Object],
//     language: '',
//     language_preference: -1,
//     preference: null,
//     protocol: 'https',
//     quality: 8,
//     resolution: '1280x720',
//     source_preference: -5,
//     tbr: 200.906,
//     url: 'https://rr1---sn-p5qlsn7s.googlevideo.com/videoplayback?expire=1689276417&ei=ofuvZNaZDeeS_9EPzMK0uAE&ip=3.87.153.214&id=o-AB1ob-UWpOAGgMO6j7qesZa9EfbjAMgk-HojMx7zgn_n&itag=22&source=youtube&requiressl=yes&mh=sB&mm=31%2C29&mn=sn-p5qlsn7s%2Csn-p5qs7nsk&ms=au%2Crdu&mv=m&mvi=1&pl=17&initcwndbps=811250&spc=Ul2Sq_wugPTlbOnfBiJAjotHvllZksM&vprv=1&svpuc=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=198.182&lmt=1685875089002888&mt=1689254479&fvip=4&fexp=24007246%2C51000022&beids=24350017&c=ANDROID&txp=5532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIgcVJwsd3bU_xxMhzY-VG9AqD1mQKSJ8yCHkbNp58Uz5gCIQDR9MyOeccY3uxwJfF0oF79qRDHToH_NbaJHbnb3osqYA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhALi8xt4_ug2_PA38ERUAA5JpBEfBAnXqWlipwN0ohfv7AiEAux4fq2zMNVod24mEd5zIaWmqzYqhm3NL_grUTmrO_t8%3D',
//     vbr: 200.906,
//     vcodec: 'avc1.64001F',
//     video_ext: 'mp4',
//     width: 1280
//   },



//https://ev-h.phncdn.com/hls/videos/202211/21/419990461/1080P_4000K_419990461.mp4/master.m3u8?validfrom=1689262186&validto=1689269386&ipa=112.206.75.193&hdl=-1&hash=boJmMW3IpZjhF3b8BOimOtHyEb0%3D