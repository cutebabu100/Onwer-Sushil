const fs = require('fs');
const ytdl = require('ytdl-core');
const { resolve } = require('path');
const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
async function downloadMusicFromYoutube(link, path) {
  var timestart = Date.now();
  if(!link) return 'Thiếu link'
  var resolveFunc = function () { };
  var rejectFunc = function () { };
  var returnPromise = new Promise(function (resolve, reject) {
    resolveFunc = resolve;
    rejectFunc = reject;
  });
    ytdl(link, {
            filter: format =>
                format.quality == 'tiny' && format.audioBitrate == 128 && format.hasAudio == true
        }).pipe(fs.createWriteStream(path))
        .on("close", async () => {
            var data = await ytdl.getInfo(link)
            var result = {
                title: data.videoDetails.title,
                dur: Number(data.videoDetails.lengthSeconds),
                viewCount: data.videoDetails.viewCount,
                likes: data.videoDetails.likes,
                uploadDate: data.videoDetails.uploadDate,
                sub: data.videoDetails.author.subscriber_count,
                author: data.videoDetails.author.name,
                timestart: timestart
            }
            resolveFunc(result)
        })
  return returnPromise
}
module.exports.config = {
    name: "music",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
    commandCategory: "Tiện ích",
    usages: "[searchMusic]",
    cooldowns: 0
}

module.exports.handleReply = async function ({ api, event, handleReply }) {
    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    const axios = require('axios')
    const { createReadStream, unlinkSync, statSync } = require("fs-extra")
    try {
        var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
        var data = await downloadMusicFromYoutube('https://www.youtube.com/watch?v=' + handleReply.link[event.body -1], path);
        if (fs.statSync(path).size > 26214400) return api.sendMessage('Baby 20Mb se jyada hai isme ,koi aur try kro!', event.threadID, () => fs.unlinkSync(path), event.messageID);
        api.unsendMessage(handleReply.messageID)
        return api.sendMessage({ 
            body: `🎶=====「 𝐌𝐔𝐒𝐈𝐂 」=====️🎶\n━━━━━━━━━━━━━━\n📌 → 𝗧𝗶𝘁𝗹𝗲: ${data.title} ( ${this.convertHMS(data.dur)} )\n📆 → 𝗟𝗮𝘂𝗻𝗰𝗵 𝗗𝗮𝘁𝗲 ✔️: ${data.uploadDate}\n📻 → 𝗖𝗵𝗮𝗻𝗻𝗲𝗹: ${data.author} ( ${data.sub} )\n👀 → 𝗩𝗶𝗲𝘄𝘀 𝗥𝗲𝗮𝗹𝘁𝗶𝗺𝗲: ${data.viewCount} 𝘃𝗶𝗲𝘄\n❤️ → 𝗟𝗶𝗸𝗲𝘀 𝗥𝗲𝗮𝗹𝘁𝗶𝗺𝗲: ${data.likes}\n🔗 →  𝗟𝗶𝗻𝗸 𝗬𝗧: https://www.y2meta.com/vi/youtube/${handleReply.link[event.body - 1]}\n⏳ → 𝗛𝗲𝗿𝗲 𝗶𝘀 𝗬𝗼𝘂𝗿 𝗠𝘂𝘀𝗶𝗰 🥰: ${Math.floor((Date.now()- data.timestart)/1000)} 𝗘𝗻𝗷𝗼𝘆 𝗧𝗵𝗲 𝗠𝘂𝘀𝗶𝗰 🥰\n======= [ ${time} ] =======`,
            attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
         event.messageID)
            
    }
    catch (e) { return console.log(e) }
}
module.exports.convertHMS = function(value) {
    const sec = parseInt(value, 10); 
    let hours   = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60); 
    let seconds = sec - (hours * 3600) - (minutes * 60); 
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return (hours != '00' ? hours +':': '') + minutes+':'+seconds;
}
module.exports.run = async function ({ api, event, args }) {
  let axios = require('axios');
    if (args.length == 0 || !args) return api.sendMessage('» Tootiya ho ka be song ka nam likh le', event.threadID, event.messageID);
    const keywordSearch = args.join(" ");
    var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
    if (fs.existsSync(path)) { 
        fs.unlinkSync(path)
    }
    if (args.join(" ").indexOf("https://") == 0) {
        try {
            var data = await downloadMusicFromYoutube(args.join(" "), path);
            if (fs.statSync(path).size > 2621440000) return api.sendMessage('𝗞𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗴𝘂̛̉𝗶 𝗳𝗶𝗹𝗲 𝗰𝗼́ 𝘁𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝘁𝘂̛̀ 01:10:10 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗼̣𝗻 𝗳𝗶𝗹𝗲 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗮̂𝗺 𝘁𝗵𝗮𝗻𝗵.', event.threadID, () => fs.unlinkSync(path), event.messageID);
            return api.sendMessage({ 
                body: `🎶=====「 𝐌𝐔𝐒𝐈𝐂 」=====️🎶\n━━━━━━━━━━━━━━\n📌 → 𝗧𝗶𝘁𝗹𝗲: ${data.title} ( ${this.convertHMS(data.dur)} )\n📆 → 𝗡𝗴𝗮̀𝘆 𝘁𝗮̉𝗶 𝗹𝗲̂𝗻: ${data.uploadDate}\n📻 → 𝗖𝗵𝗮𝗻𝗻𝗲𝗹: ${data.author} ( ${data.sub} )\n👀 → 𝗟𝘂̛𝗼̛̣𝘁 𝘅𝗲𝗺: ${data.viewCount} 𝘃𝗶𝗲𝘄\n❤️ → 𝗟𝘂̛𝗼̛̣𝘁 𝘁𝗵𝗶́𝗰𝗵: ${data.likes}\n⏳ → 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝘅𝘂̛̉ 𝗹𝘆́: ${Math.floor((Date.now()- data.timestart)/1000)} 𝗴𝗶𝗮̂𝘆\n🔗 →  𝗟𝗶𝗻𝗸 𝘁𝗮̉𝗶: https://www.y2meta.com/vi/youtube/${handleReply.link[event.body - 1]}\n======= [ ${time} ] =======`,
                attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
            event.messageID)
            
        }
        catch (e) { return console.log(e) }
    } else {
          try {
            var link = [],
                msg = "",
                num = 0,
                numb = 0;
            var imgthumnail = []
            const Youtube = require('youtube-search-api');
            var data = (await Youtube.GetListByKeyword(keywordSearch, false,6)).items;
            for (let value of data) {
              link.push(value.id);
              let folderthumnail = __dirname + `/cache/${numb+=1}.png`;
                let linkthumnail = `https://img.youtube.com/vi/${value.id}/hqdefault.jpg`;
                let getthumnail = (await axios.get(`${linkthumnail}`, {
                    responseType: 'arraybuffer'
                })).data;
                  let datac = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${value.id}&key=AIzaSyANZ2iLlzjDztWXgbCgL8Oeimn3i3qd0bE`)).data;
                     fs.writeFileSync(folderthumnail, Buffer.from(getthumnail, 'utf-8'));
              imgthumnail.push(fs.createReadStream(__dirname + `/cache/${numb}.png`));
              let channel = datac.items[0].snippet.channelTitle;
              num = num+=1
  if (num == 1) var num1 = "𝟙. "
  if (num == 2) var num1 = "𝟚. "
  if (num == 3) var num1 = "𝟛. "
  if (num == 4) var num1 = "𝟜. "
  if (num == 5) var num1 = "𝟝. "
  if (num == 6) var num1 = "𝟞. "

              msg += (`${num1} - ${value.title} ( ${value.length.simpleText} )\n📻 → 𝗖𝗵𝗮𝗻𝗻𝗲𝗹: ${channel}\n━━━━━━━━━━━━━━\n`);
            }
            var body = `»🔎  𝐇𝐢 ${link.length} 𝐈𝐭𝐧𝐞 𝐒𝐨𝐧𝐠 𝐘𝐨𝐮𝐭𝐮𝐛𝐞 𝐒𝐞 𝐌𝐮𝐣𝐡𝐞 𝐌𝐢𝐥𝐞\n━━━━━━━━━━━━━━\n${msg}» 𝐈𝐧𝐦𝐞 𝐬𝐞 𝐊𝐨𝐢 𝐛𝐡𝐢 𝐄𝐤 𝐌𝐮𝐬𝐢𝐜 𝐂𝐡𝐮𝐧 𝐥𝐞 𝐀𝐠𝐚𝐫 𝐖𝐨 25𝐦𝐛 𝐒𝐞 𝐊𝐚𝐦 𝐊𝐚 𝐇𝐮𝐚 𝐓𝐨𝐡 𝐚𝐩𝐤𝐨 𝐌𝐢𝐥 𝐉𝐚𝐲𝐞𝐠𝐚`
            return api.sendMessage({
              attachment: imgthumnail,
              body: body
            }, event.threadID, (error, info) => global.client.handleReply.push({
              type: 'reply',
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              link
            }), event.messageID);
          } catch(e) {
            return api.sendMessage('Đã xảy ra lỗi, vui lòng thử lại trong giây lát!!\n' + e, event.threadID, event.messageID);
        }
    }
    }
