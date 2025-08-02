module.exports.config = {
	name: "groupemoji",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "ARIF BABU",
	description: "THIS BOT WAS MADE BY MR ARIF BABU",
	commandCategory: "CHANGE GROUP EMOJI", 
	usages: "PREFIX", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args }) {
	var emoji = args.join(" ")
	if (!emoji) api.sendMessage("सुशील बॉस साथ में एक इमोजी डालो जो लगाना है 😐✌️", event.threadID, event.messageID)
	else api.changeThreadEmoji(emoji, event.threadID, () => api.sendMessage(`BOSS MAINE GROUP KA EMOJI BADAL DIYA 👉 ${emoji}\n━━━━━━━━━━━━━━━━━━━━━━━\nOWNER  𒁍 MR सुशील बाबू 🌺`, event.threadID, event.messageID));
}
