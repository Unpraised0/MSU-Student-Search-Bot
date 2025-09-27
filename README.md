# 🎓 MSU Student Search Bot

บอท Discord สำหรับ **ค้นหาข้อมูลนิสิต มหาวิทยาลัยมหาสารคาม (MSU)**  
สามารถค้นหาด้วย **รหัสนิสิต 11 หลัก** หรือค้นหาด้วย **9 หลักท้าย (Wildcard)** เพื่อค้นหาข้ามปีการศึกษาได้อย่างสะดวก  

---

## 🚀 ฟีเจอร์ (Features)
- 🔍 ค้นหาด้วยรหัสนิสิต 11 หลัก  
- 🌐 ค้นหาแบบ Wildcard (`**<9 หลักท้าย>`)  
- 🎨 แสดงผลในรูปแบบ Discord Embed ที่อ่านง่าย  
- ⏳ ตอบกลับรวดเร็วในห้องแชท  
- 🛡️ จำกัดการใช้งานเฉพาะช่องที่กำหนด  

---

## 📦 การติดตั้ง (Installation)

1. Clone โปรเจกต์  
   ```bash
   git clone https://github.com/your-username/msu-student-search-bot.git
   cd msu-student-search-bot
ติดตั้ง dependencies

npm install


สร้างไฟล์ .env และใส่ token ของบอท

TOKEN=YOUR_DISCORD_BOT_TOKEN
ALLOWED_CHANNEL_ID=YOUR_CHANNEL_ID


รันบอท

node index.js

🛠️ วิธีใช้งาน (Usage)

ใน Discord ใช้คำสั่งเหล่านี้ได้ในช่องที่กำหนดไว้:

คำสั่ง (Command)	คำอธิบาย (Description)	ตัวอย่าง (Example)
!search <11-digit code>	ค้นหานิสิตด้วยรหัส 11 หลัก	!search 68011212034
!search **<9-digit code>	ค้นหาทุกปีการศึกษา (Wildcard)	!search **011212034
!shelp	แสดงคู่มือการใช้งาน	!shelp
⚠️ หมายเหตุ (Notes)

บอทจะทำงานเฉพาะในช่องที่กำหนด (ALLOWED_CHANNEL_ID)

หาก token เคยรั่วไหล ให้รีเซ็ตใหม่ทันที

Discord Embed แสดงได้สูงสุด 25 รายการต่อหนึ่งข้อความ

📜 License

โปรเจกต์นี้เป็น โอเพ่นซอร์ส สามารถนำไปใช้งานหรือปรับปรุงต่อได้ ✨

🎓 MSU Student Search Bot (English)

A Discord bot for Mahasarakham University (MSU) student lookup.
Supports searching by full 11-digit student ID or 9-digit wildcard for cross-year queries.

🚀 Features

🔍 Search by full 11-digit student ID

🌐 Wildcard search (**<9 digits>)

🎨 Clean Discord embed results

⏳ Fast responses directly in chat

🛡️ Works only in a specific channel

📦 Installation

Clone this repository

git clone https://github.com/your-username/msu-student-search-bot.git
cd msu-student-search-bot


Install dependencies

npm install


Create a .env file with your bot token:

TOKEN=YOUR_DISCORD_BOT_TOKEN
ALLOWED_CHANNEL_ID=YOUR_CHANNEL_ID


Run the bot

node index.js

🛠️ Usage

In Discord, type the following commands in the allowed channel:

Command	Description	Example
!search <11-digit code>	Search a specific student	!search 68011212034
!search **<9-digit code>	Wildcard search (all years)	!search **011212034
!shelp	Show help menu	!shelp
⚠️ Notes

The bot only works in the specified channel (ALLOWED_CHANNEL_ID).

Reset your bot token if it has ever been exposed publicly.

Maximum of 25 results will be shown per search (Discord embed limitation).
