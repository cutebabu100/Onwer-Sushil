const fs = require("fs");
module.exports.config = {
	name: "Shri ram",
    version: "1.1.1",
	hasPermssion: 0,
	credits: "ABHISHEK", 
	description: "Just Respond",
	commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("Jay shri") ||
     react.includes("Ram") || react.includes("JAY SHRI RAM") || react.includes("jay mahakal") ||
react.includes("ram") ||
react.includes("जय")) {
		var msg = {
				body: `  जय श्री राम _🚩🚩🚩🙏`,
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🙏", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
