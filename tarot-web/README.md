# 🔮 พยากรณ์แห่งดวงดาว

> เว็บไซต์ดูดวงไพ่ทาโรต์ภาษาไทยแบบ standalone — ใช้ภาพจริงจาก Rider-Waite-Smith deck (1909, Public Domain)

## 🌐 Live Demo

**👉 [คลิกที่นี่เพื่อเปิดเว็บ](https://thanatvij.github.io/tarot-divination/)**

> _เปลี่ยน URL ให้ตรงกับ GitHub Pages ของคุณหลัง deploy_

---

## ✨ ฟีเจอร์

- 🃏 **ไพ่ทาโรต์ครบ 78 ใบ** Major Arcana 22 + Minor Arcana 56 (Wands/Cups/Swords/Pentacles)
- 🎴 **ภาพไพ่จริง** Rider-Waite-Smith Tarot โดย Pamela Colman Smith (1909)
- 🌓 **เรียงไพ่เป็นพัดครึ่งวงกลม** สวยขลัง ตามแบบหมอดูดั้งเดิม
- 🎯 **เลือกหมวดได้ 5 หมวด** — ความรัก / การเรียน / การทำงาน / การเงิน / ดวงชะตาภาพรวม
- 🔮 **อ่านไพ่ 3 ตำแหน่ง** — เจ้าชะตา → สถานการณ์ → บทสรุป
- ✨ **คำพยากรณ์รวม** วิเคราะห์ภาพรวมจากจำนวน Major Arcana และชุดไพ่ที่ปรากฏซ้ำ
- 🎨 **ดีไซน์ขลังลึกลับ** — โทนม่วง+ทอง พร้อม animation, ดาวระยิบระยับ, พระจันทร์เรืองแสง

---

## 🚀 วิธีใช้งาน

### เปิดในเครื่อง

```bash
# วิธีที่ 1: เปิดตรงๆ (ต้องต่อเน็ตเพื่อโหลดรูปไพ่จาก CDN)
open index.html

# วิธีที่ 2: รัน server (แนะนำ)
python3 -m http.server 8000
# จากนั้นเปิด http://localhost:8000
```

### ใช้งาน

1. กด **"เริ่มเปิดไพ่"**
2. เลือกหมวดที่ต้องการพยากรณ์
3. กรอกคำถามเพิ่มเติม (ถ้ามี)
4. **เลือกไพ่ 3 ใบจากพัดครึ่งวงกลม**
5. รับคำพยากรณ์จากจักรวาล ✨

---

## 🛠 เทคโนโลยี

- **HTML5** — โครงสร้างหน้าเว็บ
- **CSS3** — ดีไซน์ + animation 3D + พัดครึ่งวงกลม (CSS transforms)
- **Vanilla JavaScript** — ไม่ใช้ framework
- **Google Fonts** — Cinzel, Noto Serif Thai
- **jsDelivr CDN** — โหลดรูปไพ่ Rider-Waite (Public Domain) จาก npm package `tarot-card-img`

ไม่ใช้ external API · ไม่ใช้ localStorage · ทำงาน offline ได้เกือบหมด (ยกเว้นรูปไพ่ที่โหลดจาก CDN)

---

## 📂 โครงสร้างไฟล์

```
tarot-web/
├── index.html           # ไฟล์เว็บหลัก (HTML + CSS + JS + ข้อมูลไพ่ 78 ใบ)
├── tarot-all.json       # ข้อมูลไพ่รวม + URL รูปไพ่ (สำรอง)
├── README.md            # ไฟล์นี้
└── .gitignore           # กันไฟล์ที่ไม่ควรขึ้น GitHub
```

---

## 📚 แหล่งข้อมูลและเครดิต

### ภาพไพ่
**Rider-Waite-Smith Tarot Deck (1909)** by Pamela Colman Smith และ Arthur Edward Waite
- สถานะลิขสิทธิ์: **Public Domain** (US: หมดลิขสิทธิ์ตั้งแต่ปี 1966 / UK: หมดลิขสิทธิ์ตั้งแต่ปี 2022)
- โหลดผ่าน jsDelivr CDN จาก npm package `tarot-card-img`

### ความหมายไพ่
อ้างอิงจากตำราไพ่ทาโรต์ และ The Pictorial Key to the Tarot โดย A. E. Waite (1911, Public Domain)

---

## 👤 ผู้พัฒนา

**Thanat** · DTI (Digital Technology and Innovation), Thammasat University Lampang

📷 Instagram: [@thanxt.v](https://instagram.com/thanxt.v)

---

> _ติดต่อสำหรับการดูดวงเชิงลึกเพิ่มเติม_