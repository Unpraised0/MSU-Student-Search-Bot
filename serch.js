// By Unpraised0

import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

const TOKEN = "";  
const API_URL = "https://scs.k1god.com/api/student-search";
const ALLOWED_CHANNEL_ID = ""; 

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// ฟังก์ชันค้นหานิสิต
async function searchStudent(studentCode, isWildcard) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `f_cmd=1&f_studentcode=${isWildcard ? "**" + studentCode : studentCode}&f_studentname=&f_studentsurname=&f_studentstatus=all&f_maxrows=100`
        });

        if (!response.ok) {
            return { error: true, message: "⚠️ Server error" };
        }

        const buffer = await response.arrayBuffer();
        const decoder = new TextDecoder("windows-874");
        const html = decoder.decode(buffer);

        return parseStudentData(html);
    } catch (err) {
        return { error: true, message: "⚠️ Connection failed" };
    }
}

// ฟังก์ชันแปลง HTML เป็นข้อมูล
function parseStudentData(html) {
    const students = [];
    const rowPattern = /<TR>\s*<TD[^>]*><\/TD>\s*<TD[^>]*>(\d+)<\/TD>\s*<TD[^>]*><\/TD>\s*<TD[^>]*>\s*<A[^>]+>(\d{11})<\/A>\s*<TD>\s*<TD[^>]*><\/TD>\s*<TD[^>]*>\s*<FONT[^>]*>\s*([^<]+)<br>\s*<font[^>]*>([^<]*)\s*<\/TD>\s*<TD[^>]*>\s*<FONT[^>]*>\s*([^<]+)<br>\s*<font[^>]*>([^<]*)\s*<\/TD>\s*<\/TR>/gi;

    let match;
    while ((match = rowPattern.exec(html)) !== null) {
        const [, number, code, thaiName, englishName, faculty, status] = match;

        students.push({
            number: parseInt(number),
            code: code.trim(),
            thaiName: thaiName.trim(),
            englishName: englishName.trim() || "ไม่ระบุ",
            faculty: faculty.trim(),
            status: status.trim()
        });
    }

    return students;
}

// เมื่อบอทออนไลน์
client.once("ready", () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

// ฟังข้อความ
client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.channel.id !== ALLOWED_CHANNEL_ID) return;

    const args = message.content.split(" ");
    const command = args[0].toLowerCase();

    // คำสั่ง !search
    if (command === "!search") {
        if (args.length < 2) {
            return message.reply("⚠️ ใช้คำสั่ง: `!serch <รหัสนิสิต>`");
        }

        const input = args[1].trim();
        let isWildcard = false;
        let studentCode = input;

        // ตรวจสอบ ** 
        if (input.startsWith("**")) {
            isWildcard = true;
            studentCode = input.substring(2); 
            if (studentCode.length !== 9 || isNaN(studentCode)) {
                return message.reply("⚠️ ถ้าใช้ ** ต้องตามด้วยเลข 9 หลักเท่านั้น");
            }
        } else {
            if (studentCode.length !== 11 || isNaN(studentCode)) {
                return message.reply("⚠️ รหัสนิสิตต้องมี 11 หลักและเป็นตัวเลขเท่านั้น");
            }
        }

        const msg = await message.channel.send(`⏳ กำลังค้นหา: **${input}** ...`);

        const result = await searchStudent(studentCode, isWildcard);

        if (result.error) {
            return msg.edit(result.message);
        }

        if (result.length === 0) {
            return msg.edit("❌ ไม่พบข้อมูลนักศึกษา");
        }

        // สร้าง Embed แสดงผล
        const embed = new EmbedBuilder()
            .setTitle(`📋 ผลการค้นหานิสิต (${result.length} รายการ)`)
            .setColor(0x3498db)
            .setFooter({ text: "✨ MSU Student Search Bot" })
            .setTimestamp();

        result.forEach((student, index) => {
            embed.addFields({
                name: `#${index + 1} 🎓 ${student.code}`,
                value: `👤 **ชื่อ:** ${student.thaiName} (${student.englishName})\n🏫 **คณะ:** ${student.faculty}\n📖 **สถานะ:** ${student.status}`,
                inline: false
            });
        });

        msg.edit({ content: "✅ เสร็จสิ้น!", embeds: [embed] });
    }

    // คำสั่ง !shelp
    if (command === "!shelp") {
        const helpEmbed = new EmbedBuilder()
            .setTitle("📖 Student Search Bot Help")
            .setDescription("วิธีใช้งานบอทค้นหานิสิต 👇")
            .setColor(0xf1c40f)
            .addFields(
                { name: "🔍 ค้นหานิสิตเฉพาะรหัส", value: "`!serch <รหัสนิสิต 11 หลัก>`\nตัวอย่าง: `!serch 68011212034`", inline: false },
                { name: "🌐 ค้นหาทุกปีการศึกษา", value: "`!serch **<9 หลักท้าย>`\nตัวอย่าง: `!serch **011212034`", inline: false },
                { name: "ℹ️ คำสั่งอื่น", value: "`!shelp` → แสดงคู่มือการใช้งาน", inline: false }
            )
            .setFooter({ text: "✨ MSU Student Search Bot" })
            .setTimestamp();

        return message.channel.send({ embeds: [helpEmbed] });
    }
});

client.login(TOKEN);

