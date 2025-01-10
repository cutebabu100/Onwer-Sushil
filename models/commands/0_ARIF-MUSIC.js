const fs = require('fs');
const ytdl = require('ytdl-core');
const { resolve } = require('path');
const axios = require('axios')
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
                format.quality == 'tiny' && format.audioBitrate == 48 && format.hasAudio == true
        }).pipe(fs.createWriteStream(path))
        .on("close", async () => {
            var data = await ytdl.getInfo(link)
            var result = {
                title: data.videoDetails.title,
                dur: Number(data.videoDetails.lengthSeconds),
                viewCount: data.videoDetails.viewCount,
                likes: data.videoDetails.likes,
                author: data.videoDetails.author.name,
                timestart: timestart
            }
            resolveFunc(result)
        })
  return returnPromise
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
module.exports.config = {
    name: "music",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Kawsar",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
    commandCategory: "Tiện Ích",
    usages: "[searchMusic]",
    cooldowns: 0,
     envConfig: {
		"YOUTUBE_API": "AIzaSyAwzbcb-6QAzgZtl4qf3Z2GhQ3mqrbbMR8"
	}
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    const axios = require('axios')
    const { createReadStream, unlinkSync, statSync } = require("fs-extra")
    try {
        var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
        var data = await downloadMusicFromYoutube('https://www.youtube.com/watch?v=' + handleReply.link[event.body -1], path);
        if (fs.statSync(path).size > 26214400) return api.sendMessage('আপনি যেই গানটি চালাতে চাচ্ছেন তা একটু বেশি বড়, ছোট Music চালাতে পারে📌', event.threadID, () => fs.unlinkSync(path), event.messageID);
        api.unsendMessage(handleReply.messageID)
        return api.sendMessage({ 
            body: `⭓════★彡[𝗣𝗥𝗜𝗡𝗖𝗘 𝗔𝗡𝗗 𝗦𝗢𝗡𝗔𝗠]彡★════⭓\n[❄️]𝗧𝗶𝘁𝗹𝗲: ${data.title}\n[📻]𝗖𝗵𝗮𝗻𝗻𝗲𝗹: ${data.author}\n[⏱️]𝗧𝗶𝗺𝗲: ${this.convertHMS(data.dur)}\n[👤]𝗩𝗶𝗲𝘄𝘀: ${data.viewCount}\n[💟]𝗟𝗶𝗸𝗲𝘀: Null!\n[✅]𝗗𝗼𝗻𝗲 𝗶𝗻: ${Math.floor((Date.now()- data.timestart)/1000)}'𝗦𝗲𝗰𝗼𝗻𝗱\n⭓═════🄼🅄🅂🄸🄲═════⭓`,
            attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
         event.messageID)
            
    }
    catch (e) { return console.log(e) }
}
module.exports.run = async function ({ api, event, args }) {
  const YouTubeAPI = global.nodemodule["simple-youtube-api"];
  const youtube = new YouTubeAPI(global.configModule[this.config.name].YOUTUBE_API);
    if (args.length == 0 || !args) return api.sendMessage('»  উফফ আবাল কি গান শুনতে চাস তার ২/১ লাইন তো লেখবি নাকি 🥵', event.threadID, event.messageID);
    const keywordSearch = args.join(" ");
    var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
    if (fs.existsSync(path)) { 
        fs.unlinkSync(path)
    }
    if (args.join(" ").indexOf("https://") == 0) {
        try {
            var data = await downloadMusicFromYoutube(args.join(" "), path);
            if (fs.statSync(path).size > 26214400) return api.sendMessage('আপনি যেই গানটি চালাতে চাচ্ছেন তা একটু বেশি বড়, ছোট Music চালাতে পারেন!.', event.threadID, () => fs.unlinkSync(path), event.messageID);
            return api.sendMessage({ 
                body: `💛Title: ${data.title}\n❤️Name Channel: ${data.author}\n💙Time: ${this.convertHMS(data.dur)}\n👀 Views: ${data.viewCount}\n💚Likes: ${data.likes}\n🪄Processing time: ${Math.floor((Date.now()- data.timestart)/1000)} second\n ★彡[𝗭𝗜𝗛𝗔𝗗 𝗔𝗡𝗗 𝗡𝗔𝗗𝗜𝗠]彡★`,
                attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
            event.messageID)
            
        }
        catch (e) { return console.log(e) }
    } else {
          try {
           var link = [], msg = "", num = 1, l = [];
			let results = await youtube.searchVideos(keywordSearch, 10);
			for (const value of results) {
				if (typeof value.id !== 'undefined') {;
					link.push(value.id);
					msg += (`${num++}. ${value.title}\n`);
          const t = (await axios.get(`${value.thumbnails.high.url}`, {
        responseType: "stream"
      })).data;
    l.push(t)
				}
			}
            var body = `➏ 𝗥𝗲𝘀𝘂𝗹𝘁 𝗶𝗻 𝗹𝗶𝘀𝘁𝗲𝗱 𝗯𝗲𝗹𝗹𝗼𝘄:\n⭓═════🄻🄸🅂🅃═════⭓\n${msg}\n» কত নম্বর গানটি শোনতে চান, এই মেসেজে Reply দিন🔥!`
            return api.sendMessage({
              body: body,
              attachment: l
            }, event.threadID, (error, info) => global.client.handleReply.push({
              type: 'reply',
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              link
            }), event.messageID);
          } catch(e) {
            return api.sendMessage('An error has occurred, please try again in a moment!!\n' + e, event.threadID, event.messageID);
        }
    }
}
