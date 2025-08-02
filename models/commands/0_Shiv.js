const fs = require("fs");
module.exports.config = {
  name: "Shivji",
    version: "1.0.1",
  hasPermssion: 0,
  credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩", 
  description: "hihihihi",
  commandCategory: "no prefix",
  usages: "mahakal",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("Jai shree mahadev")==0 || event.body.indexOf("har har mahadev")==0 || event.body.indexOf("jai mahakal")==0 || event.body.indexOf("jay bholenath")==0) {
    var msg = {
        body: "जय श्री महादेव _🚩🚩🚩🙏",
        attachment: 
fs.createReadStream(__dirname + `/noprefix/rankup/shiv.mp4`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🚩", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
