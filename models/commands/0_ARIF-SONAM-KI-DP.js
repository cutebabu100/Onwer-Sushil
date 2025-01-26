const fs = require("fs");
module.exports.config = {
  name: "arif",
    version: "1.1.1",
  hasPermssion: 0,
  credits: "ARIF BABU", 
  description: "Just Respond",
  usePrefix: true,
  commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  let react = event.body.toLowerCase();
  if(react.includes("Sm") ||
     react.includes("sm singh") || react.includes("sm") || react.includes("@𓏵𓋠𒅓𓏪𓉚𝐏𝐑𝐈𝐍𝐂𝐄𒀭𝐁𝐀𝐁𝐔𓉛𓏪𒅓𓋠𓏵 𒆜𒋟❮𝐑𝐀𝐉𝐀𝐒𝐓𝐀𝐍𝐈𒀭𝗞𝗔𒀭𝗕𝗔𝗗𝗦𝗛𝗔𝗛❯𒋟𒆜 𒀭𒀮𓁫𓂔𓏵𓏜𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞𓏜𓏵𓂔𓁬𒀮𒀭 𓃉𓃊𓃑𓄋𝐈𝐓𝐒𓇻︎𓇻𝐁𝐑𝐀𝐍𝐃𓄋𓃑𓃊𓃉 𓆈 y -  【‿】") ||
react.includes("@S M Singh") ||
react.includes("sm")) {
    var msg = {
        body: `𝐃𝐄𝐊𝐇𝐎 𝐌𝐄𝐑𝐈 𝐁𝐎𝐒𝐒 𝐒 𝐌 𝐒𝐈𝐍𝐆𝐇 𝐀𝐀 𝐆𝐀𝐘 🙈 😎 𓆩♡𓆪`,attachment: fs.createReadStream(__dirname + `/ARIF-BABU/sonam.mp4`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😘", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
