module.exports.config = {
    name: "adc",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "ARIF BABU",
    description: "MADE BY ARIF BABU",
    commandCategory: "Admin",
    usages: "[reply or text]",
    cooldowns: 0,
    dependencies: {
        "pastebin-api": "",
        "cheerio": "",
        "request": ""
    }
};
module.exports.run = async function ({ api, event, args }) {
    const axios = require('axios');
    const fs = require('fs');
    const request = require('request');
    const cheerio = require('cheerio');
    const { join, resolve } = require("path");
    const { senderID, threadID, messageID, messageReply, type } = event;
    var name = args[0];
    if (type == "message_reply") {
        var text = messageReply.body;
    }
    if(!text && !name) return api.sendMessage('जी बाबू सुशील क्या हुआ?', threadID, messageID);
    if(!text && name) {
        var data = fs.readFile(
          `${__dirname}/${args[0]}.js`,
          "utf-8",
          async (err, data) => {
            if (err) return api.sendMessage(`सुशील बाबू ये ${args[0]} कमांड आपके बोट में नही है.`, threadID, messageID);
            const { PasteClient } = require('pastebin-api')
            const client = new PasteClient("R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb");
            async function pastepin(name) {
              const url = await client.createPaste({
                code: data,
                expireDate: 'N',
                format: "javascript",
                name: name,
                publicity: 1
              });
              var id = url.split('/')[3]
              return 'https://pastebin.com/raw/' + id
            }
            var link = await pastepin(args[1] || 'noname')
            return api.sendMessage(link, threadID, messageID);
          }
        );
        return
    }
    var urlR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    var url = text.match(urlR);
    if (url[0].indexOf('pastebin') !== -1) {
        axios.get(url[0]).then(i => {
            var data = i.data
            fs.writeFile(
                `${__dirname}/${args[0]}.js`,
                data,
                "utf-8",
                function (err) {
                    if (err) return api.sendMessage(`सुशील बाबू मैं कोड अप्लाई नही कर पाया 😔 ${args[0]}.js`, threadID, messageID);
                    api.sendMessage(`सुशील बाबू आपका कोड अप्लाई हो गया है ${args[0]}.js, अब कमांड लोड यूज़ करो अपनी फ़ाइल को लोड करने के लिए`, threadID, messageID);
                }
            );
        })
    }

    if (url[0].indexOf('buildtool') !== -1 || url[0].indexOf('tinyurl.com') !== -1) {
        const options = {
            method: 'GET',
            url: messageReply.body
        };
        request(options, function (error, response, body) {
            if (error) return api.sendMessage('सुशील बाबू किसी लिंक से अप्लाई करो ना जो स्क्रिप्ट आप अपने बोट में ऐड करना चाहते है 🙂', threadID, messageID);
            const load = cheerio.load(body);
            load('.language-js').each((index, el) => {
                if (index !== 0) return;
                var code = el.children[0].data
                fs.writeFile(`${__dirname}/${args[0]}.js`, code, "utf-8",
                    function (err) {
                        if (err) return api.sendMessage(`सुशील बाबू एन एरर ओकोरेड व्हील अप्लाइंग दा न्यू कोड टू "${args[0]}.js".`, threadID, messageID);
                        return api.sendMessage(`सुशील बाबू आपका कोड अप्लाई हो गया है "${args[0]}.js", अब कमांड लोड यूज़ करो अपनी फ़ाइल को लोड करने के लिए 👀`, threadID, messageID);
                    }
                );
            });
        });
        return
    }
    if (url[0].indexOf('drive.google') !== -1) {
      var id = url[0].match(/[-\w]{25,}/)
      const path = resolve(__dirname, `${args[0]}.js`);
      try {
        await utils.downloadFile(`https://drive.google.com/u/0/uc?id=${id}&export=download`, path);
        return api.sendMessage(`Added this code "${args[0]}.js" If there is an error, change the drive file to txt!`, threadID, messageID);
      }
      catch(e) {
        return api.sendMessage(`सुशील बाबू मैं न्यू कोड अप्लाई नही कर सकता "${args[0]}.js".`, threadID, messageID);
      }
    }
}