const fs = require("fs-extra");
const moment = require("moment-timezone");
const { config } = global.GoatBot;
const { client } = global;

// 🔒 LOCKED AUTHOR
const LOCKED_AUTHOR = "FARHAN-KHAN";

// 👑 OWNER SYSTEM (ADD EXTRA UID HERE)
const OWNER = [
	"100037154624637",
	"PASTE_SECOND_OWNER_UID_HERE"
];

// ✨ Premium Compact Bengali Style
function premiumMsg(title, body) {
	const time = moment().tz("Asia/Dhaka").format("hh:mm:ss A");
	const date = moment().tz("Asia/Dhaka").format("DD MMM YYYY");

	return `╔═ 👑 𝑺𝑰𝒀𝑨𝑴 👑 ═╗
${title}
━━━━━━━━━━━━
${body}
━━━━━━━━━━━━
📅 ${date} | ⏰ ${time}
🤖 𝑵𝑰𝑱𝑯𝑼𝑴 𝑩𝑶𝑻`;
}

module.exports = {
	config: {
		name: "adminonly",
		aliases: ["adonly", "onlyad", "onlyadmin"],
		version: "3.2",
		author: LOCKED_AUTHOR,
		countDown: 5,
		role: 1,
		description: {
			en: "Toggle admin-only mode"
		},
		category: "owner"
	},

	onStart: function ({ args, message, event }) {

		// 🔒 AUTHOR LOCK
		if (module.exports.config.author !== LOCKED_AUTHOR) {
			module.exports.config.author = LOCKED_AUTHOR;
			fs.writeFileSync(__filename, fs.readFileSync(__filename, "utf8"));
		}

		const senderID = event.senderID;

		// 👑 OWNER CHECK (NEW)
		const isOwner = OWNER.includes(senderID);

		let isSetNoti = false;
		let value;
		let indexGetVal = 0;

		if (args[0] == "noti") {
			isSetNoti = true;
			indexGetVal = 1;
		}

		if (args[indexGetVal] == "on") value = true;
		else if (args[indexGetVal] == "off") value = false;
		else return message.SyntaxError();

		// 🔔 Notification Mode
		if (isSetNoti) {

			// 🔒 Permission check (OWNER + BOT ADMIN)
			if (!isOwner && !config.adminBot.includes(senderID)) {
				return message.reply(
					premiumMsg(
						"❌ এক্সেস ডিনাইড",
						"🚫 শুধু আমার বস 𓆩🔱𝗥𝗝 𝗦𝗜𝗬𝗔𝗠🔱𓆪 এই কমান্ড ব্যবহার করতে পারবে👼"
					)
				);
			}

			config.hideNotiMessage.adminOnly = !value;

			return message.reply(
				premiumMsg(
					value ? "🔔 নোটিফিকেশন চালু" : "🔕 নোটিফিকেশন বন্ধ",
					value
						? "⚠️ নন-এডমিন ব্যবহার করলে সতর্ক বার্তা দেখাবে"
						: "🤫 নন-এডমিন ব্যবহার করলে কোনো বার্তা দেখাবে না"
				)
			);
		}

		// 🔐 Admin Mode

		// 🔒 Permission check (OWNER + BOT ADMIN)
		if (!isOwner && !config.adminBot.includes(senderID)) {
			return message.reply(
				premiumMsg(
					"☹️এ আবাল 😌সিয়াম বস তোর আব্বুর লাগে🥱",
					"🚫 শুধু  আমার বস  𓆩🔱𝗥𝗝 𝗦𝗜𝗬𝗔𝗠🔱𓆪 এই কমান্ড ব্যবহার করতে পারবে🛸"
				)
			);
		}

		config.adminOnly.enable = value;
		fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));

		if (value) {
			return message.reply(
				premiumMsg(
					"🔐 এডমিন মোড চালু",
					"🚫 এখন শুধু আমার বস 𓆩🔱𝗥𝗝 𝗦𝗜𝗬𝗔𝗠🔱𓆪 বট ব্যবহার করতে পারবে\n👑 🥱অ্যাটিটিউড🌝 অ্যাক্টিভ🤗"
				)
			);
		} else {
			return message.reply(
				premiumMsg(
					"🔓 এডমিন মোড বন্ধ",
					"✅ এখন সবাই বট ব্যবহার করতে পারবে\n🎉 সবাই এনজয় করো"
				)
			);
		}
	}
};
