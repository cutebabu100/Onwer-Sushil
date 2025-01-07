const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const contentDisposition = require("content-disposition");

module.exports = {
  config: {
    name: "music",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "Download youtube song from keyword search and link",
    commandCategory: "Media",
    usages: "[songName] [type]",
    cooldowns: 5,
    dependencies: {
      "node-fetch": "",
      "content-disposition": "",
    },
  },

  run: async function ({ api, event, args }) {
    let songName, type;

    if (
      args.length > 1 &&
      (args[args.length - 1] === "audio" || args[args.length - 1] === "video")
    ) {
      type = args.pop();
      songName = args.join(" ");
    } else {
      songName = args.join(" ");
      type = "audio";
    }

    const apiUrl = `https://priyanshu-ytapi.onrender.com/yt?song=${encodeURIComponent(songName)}&type=${encodeURIComponent(type)}&apikey=priyansh-here`;

    const processingMessage = await api.sendMessage(
      "✅ Processing your request. Please wait...",
      event.threadID,
      null,
      event.messageID,
    );

    try {
      api.setMessageReaction("⌛", event.messageID, () => {}, true);
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch song. Status code: ${response.status}`,
        );
      }

      // Extract filename from the Content-Disposition header
      const disposition = response.headers.get("content-disposition");
      const filename = disposition
        ? contentDisposition.parse(disposition).parameters.filename
        : `${songName}.mp3`;
      const downloadPath = path.join(__dirname, filename);

      const songBuffer = await response.buffer();

      // Save the song file locally
      fs.writeFileSync(downloadPath, songBuffer);

      api.setMessageReaction("✅", event.messageID, () => {}, true);

      await api.sendMessage(
        {
          attachment: fs.createReadStream(downloadPath),
          body: `Here's the song: ${filename}`,
        },
        event.threadID,
        () => {
          fs.unlinkSync(downloadPath);
          api.unsendMessage(processingMessage.messageID);
        },
        event.messageID,
      );
    } catch (error) {
      console.error(`Failed to download and send song: ${error.message}`);
      api.sendMessage(
        `Failed to download song: ${error.message}`,
        event.threadID,
        event.messageID,
      );
    }
  },
};
