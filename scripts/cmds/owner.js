const moment = require("moment-timezone");
const fs = require("fs");
const path = require("path");
const { getStreamFromURL } = global.utils;

// ================== 🔒 STRONG AUTHOR LOCK ==================
const AUTHOR = "FARHAN-KHAN";
const FILE = __filename;

(function lockFile() {
  try {
    const data = fs.readFileSync(FILE, "utf8");

    // ❌ যদি author change হয় → stop bot
    if (!data.includes(`author: "${AUTHOR}"`)) {
      console.log("🚫 AUTHOR TAMPER DETECTED!");
      process.exit(1);
    }

    // ❌ যদি design remove করা হয়
    if (!data.includes("𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢") || !data.includes("😽")) {
      console.log("🚫 FILE MODIFIED!");
      process.exit(1);
    }

  } catch (e) {
    console.log("Lock Error:", e);
  }
})();
// ===========================================================

// ✅ SAFE STREAM
async function safeStream(url) {
  try {
    return await getStreamFromURL(url);
  } catch (e) {
    console.log("Stream failed:", e.message);
    return null;
  }
}

// ================== 🎥 VIDEO ROTATION SYSTEM ==================
const videoLinks = [
  "https://files.catbox.moe/mbt328.mp4",
  "https://files.catbox.moe/96m226.mp4"
];

const countFile = path.join(__dirname, "owner_video_count.json");

function getNextVideo() {
  let index = 0;

  try {
    if (fs.existsSync(countFile)) {
      const data = JSON.parse(fs.readFileSync(countFile, "utf8"));
      index = data.index || 0;
    }
  } catch (e) {
    console.log("Count file error:", e.message);
  }

  const video = videoLinks[index];

  // next index
  const nextIndex = (index + 1) % videoLinks.length;

  try {
    fs.writeFileSync(countFile, JSON.stringify({ index: nextIndex }));
  } catch (e) {
    console.log("Write count error:", e.message);
  }

  return video;
}
// ===========================================================

module.exports = {
  config: {
    name: "owner",
    version: "4.0.0",
    author: "FARHAN-KHAN",
    role: 2,
    countDown: 10,
    shortDescription: { en: "Owner info" },
    category: "owner"
  },

  onStart: async function ({ message }) {

    const ownerFB1 = "https://www.facebook.com/share/14k1GZFVH2T/";
    const ownerFB2 = "https://www.facebook.com/share/14k1GZFVH2T/";

    // 🎥 Auto video change system
    const video = getNextVideo();

    const attachment = await safeStream(video);

    const time = moment().tz("Asia/Dhaka").format("hh:mm:ss A");
    const date = moment().tz("Asia/Dhaka").format("DD MMMM YYYY");

    const msg = {
      body: `╔❖𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢❖╗

👤 OWNER      : RAYHAN
🤖 BOT NAME   : ${botName}

🎂 AGE        : 19+
🚻 GENDER     : MALE
☪ RELIGION    : ISLAM

🌐 FACEBOOK   : https://facebook.com/61560326905548
💬 MESSENGER  : https://facebook.com/61560326905548
📞 WHATSAPP   : +8801789138157

📍 ADDRESS    : TANGAIL, BANGLADESH
🏫 EDUCATION  : STUDYING (NON-SERIOUS)

💔 STATUS     : SINGLE
🛠 WORK       : NOT WORKING

╚══════════════════════════════╝
📅 Date: ${date}
⏰ Time: ${time}

⋆✦⋆══🅲🅾🅽🆃🅰🅲🆃══⋆✦⋆

╚❖👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍👑❖╝`
    };

    if (attachment) {
      msg.attachment = attachment;
    }

    return message.reply(msg);
  }
};
