const fs = require("fs");
module.exports.config = {
  name: "OWNER",
    version: "1.0.1",
  hasPermssion: 0,
  credits: "Candy", 
  description: "no prefix",
  commandCategory: "No command marks needed",
  usages: "...",
    cooldowns: 1, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  let react = event.body.toLowerCase();
  if(react.includes("owner") ||
     react.includes("Owner") || 
react.includes("OWNER")) {
    var msg = {
  body: "┏━━━━━┓\n     ✦❥⋆⃝𝗣𝗥𝗜𝗡𝗖𝗘 𝗠𝗘𝗚𝗛𝗪𝗔𝗡𝗦𝗜 ✦             ✧═•❁𝗪𝗘𝗟𝗖𝗢𝗠𝗘❁•═✧\n┗━━━━━┛\n\n\n ✦ 𝐎𝐖𝐍𝐄𝐑 ✦❥⋆⃝𝗣𝗥𝗜𝗡𝗖𝗘 𝗠𝗘𝗚𝗛𝗪𝗔𝗡𝗦𝗜 ✦",
        attachment: fs.createReadStream(__dirname + `/ARIF-BABU/PRINCE.mp4`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("📷", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

    }
