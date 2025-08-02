module.exports.config = {
  name: "restart",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "mirai",
  description: "Restart the Bot",
  commandCategory: "system",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function ({ api, args, Users, event }) {
  var mention = Object.keys(event.mentions)[0];
  let name = event.mentions[mention];
  var arraytag = [];
  arraytag.push({ id: mention });
  var a = function (a) { api.sendMessage(a, event.threadID); }
  a("✅ओके सुशील बॉस मैं रीस्टार्ट, हो रहा हूँ प्लीज थोड़ा सा बेट कर लो..");
  setTimeout(() => { a({ body: "3.." }) }, 5000);
  setTimeout(() => { a({ body: "2.." }) }, 10000);
  setTimeout(() => { a({ body: "1.." }) }, 15000);
  setTimeout(() => { api.sendMessage("⏳𝙋𝙡𝙚𝙖𝙨𝙚 𝙬𝙖𝙞𝙩 𝙛𝙤𝙧 𝙖 𝙢𝙞𝙣𝙪𝙩𝙚, 𝙍𝙚𝙗𝙤𝙤𝙩𝙞𝙣𝙜 𝙨𝙮𝙨𝙩𝙚𝙢..", event.threadID, () => process.exit(1)) }, 20000);
};
