const fs = require("fs");
module.exports.config = {
	name: "burger",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "burger",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("BURGER")==0 || event.body.indexOf("Burger")==0 || event.body.indexOf("burger")==0 || event.body.indexOf("Barger")==0) {
		var msg = {
				body: "💝 ये लो बेबी बर्गर खाओ 🍔\n\n(-𝐌𝐚𝐝𝐞 𝐁𝐲 𝗠𝗿..𝐒𝐮𝐬𝐡𝐢𝐥❤️-)",
				attachment: 
fs.createReadStream(__dirname + `/ARIF-BABU/BURGER.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🍔", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
