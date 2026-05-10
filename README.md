# 📚 Grade Calculator

ระบบคำนวณเกรดมหาวิทยาลัยพร้อมระบบบันทึกประวัติการเรียน

สร้างด้วย React + Node.js + SQLite

## ✨ ฟีเจอร์

- 🔐 **ระบบ Authentication**: สมัครสมาชิกและเข้าสู่ระบบด้วย JWT
- 📊 **คำนวณ GPA**: คำนวณเกรดเฉลี่ยแบบถูกต้อง รองรับเกรด A - F
- 💾 **บันทึกประวัติ**: เก็บประวัติการเรียนแต่ละเทอมไว้ดูได้
- 📈 **สถิติรวม**: ดูสถิติการเรียนรวมทั้งหมด
- 🎨 **UI สวยงาม**: ดีไซน์ทันสมัยด้วย Tailwind CSS
- 📱 **Responsive**: รองรับทั้งคอมพิวเตอร์และมือถือ

## 🚀 เริ่มต้นใช้งาน

### ข้อกำหนดเบื้องต้น (Prerequisites)

- Node.js (v18 ขึ้นไป)
- npm หรือ yarn

### ติดตั้ง Dependencies

```bash
# ติดตั้ง Backend
cd backend
npm install

# ติดตั้ง Frontend
cd ../frontend
npm install
```

### ตั้งค่า Environment Variables

สร้างไฟล์ `backend/.env`:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### รัน Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:3000`

## 🏗️ โครงสร้างโปรเจกต์

```
grade-calculator/
├── backend/                    # Node.js + Express Backend
│   ├── config/                # Database config
│   ├── controllers/           # Business logic
│   ├── middleware/            # Auth middleware
│   ├── models/                # Database models
│   ├── routes/                # API routes
│   ├── data/                  # SQLite database (auto-created)
│   └── server.js              # Entry point
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── context/           # Auth context
│   │   ├── services/          # API services
│   │   └── utils/             # Helper functions
│   └── package.json
│
└── README.md
```

## 📁 API Endpoints

### Authentication

- `POST /api/auth/register` - สมัครสมาชิก
- `POST /api/auth/login` - เข้าสู่ระบบ
- `GET /api/auth/profile` - ดูข้อมูลผู้ใช้

### Grades

- `POST /api/grades` - บันทึกประวัติเกรด
- `GET /api/grades/history` - ดูประวัติเกรดทั้งหมด
- `GET /api/grades/stats` - ดูสถิติรวม
- `DELETE /api/grades/:id` - ลบประวัติเกรด

## 🎨 สีโทนที่ใช้

- **พื้นหลัง**: ขาวอ่อน-ครีมเหลือง (`#FFFDE7`, `#FFF9E7`)
- **สีเหลือง**: ปุ่มและการตกแต่ง (`#F9A825`, `#F57C00`)
- **สีแดง**: หัวข้อและปุ่มลบ (`#D32F2F`, `#EF5350`)

## 🛠️ เทคโนโลยีที่ใช้

**Backend:**
- Node.js + Express
- SQLite (better-sqlite3)
- JWT Authentication
- bcrypt (hash รหัสผ่าน)
- CORS

**Frontend:**
- React + Vite
- Tailwind CSS
- React Router
- Axios
- Context API

## 📝 ใบอนุญาต

ISC

## 👨‍💻 ผู้พัฒนา

สร้างด้วย ❤️ โดย [Your Name]

---

สนุกกับการคำนวณเกรด! 🎓
