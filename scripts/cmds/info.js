const moment = require("moment-timezone");

let videoIndex = 0; // ✅ Video rotation system

module.exports = {
config: {
name: "info",
version: "4.1.2",
author: "Siyam",
role: 0,
countDown: 20,
shortDescription: {
en: "Owner & bot info"
},
longDescription: {
en: "Show full stylish info"
},
category: "owner",
guide: {
en: "{pn}"
}
},

onStart: async function ({ message, event, api }) {

const totalCommands = global.GoatBot?.commands?.size || 0;  

const now = moment().tz("Asia/Dhaka");  
const date = now.format("MMMM Do YYYY");  
const time = now.format("h:mm:ss A");  

const uptime = process.uptime();  
const days = Math.floor(uptime / 86400);  
const hours = Math.floor((uptime % 86400) / 3600);  
const minutes = Math.floor((uptime % 3600) / 60);  
const seconds = Math.floor(uptime % 60);  

const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;  

const prefix = global.utils.getPrefix(event.threadID);  
const groupName = event.threadName || "Unknown Group";  

// ✅ AUTO BOT NAME SYSTEM  
let botName = "Unknown Bot";  
try {  
  const botID = api.getCurrentUserID();  
  const botInfo = await api.getUserInfo(botID);  
  botName = botInfo[botID]?.name || "Bot";  
} catch (e) {}  

// ✅ VIDEO LIST
const videos = [
  "https://files.catbox.moe/8f2fc5.mp4",
  "https://files.catbox.moe/3aikdw.mp4"
];

// ✅ AUTO CHANGE VIDEO
const videoLink = videos[videoIndex];
videoIndex = (videoIndex + 1) % videos.length;

return message.reply({  
  body: `
╔══════════════════════════════╗
        👑 BOT PROFILE 👑
╚══════════════════════════════╝

👤 OWNER      : RAYHAN
🤖 BOT NAME   : ${botName}

🎂 AGE        : 19+
🚻 GENDER     : MALE
☪ RELIGION    : ISLAM

🌐 FACEBOOK   : https://facebook.com/61560326905548
💬 MESSENGER  : https://facebook.com/61560326905548
📞 WHATSAPP   : +8801789138157

👥 GROUP      : ${groupName}

⚙️ PREFIX     : ${prefix}
💡 HELP       : ${prefix}help2

📦 COMMANDS   : ${totalCommands}
⏳ UPTIME     : ${uptimeString}

🕒 TIME       : ${time}
📅 DATE       : ${date}

📍 ADDRESS    : TANGAIL, BANGLADESH
🏫 EDUCATION  : STUDYING (NON-SERIOUS)

💔 STATUS     : SINGLE
🛠 WORK       : NOT WORKING

╚══════════════════════════════╝
`,
attachment: await global.utils.getStreamFromURL(videoLink)
});
}
};
