import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="text-center max-w-4xl">
        <div className="text-6xl mb-6">📚</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-yellow to-primary-red bg-clip-text text-transparent">
          คำนวณเกรดมหาวิทยาลัย
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          ระบบคำนวณเกรดเฉลี่ย (GPA) และบันทึกประวัติการเรียน
          <br />
          ง่าย รวดเร็ว แม่นยำ
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="btn-primary text-lg px-8 py-4">
            เริ่มต้นใช้งานฟรี
          </Link>
          <Link to="/login" className="btn-secondary text-lg px-8 py-4">
            เข้าสู่ระบบ
          </Link>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2 text-primary-red">คำนวณ GPA</h3>
            <p className="text-gray-600">คำนวณเกรดเฉลี่ยแบบถูกต้อง รองรับเกรด A - F</p>
          </div>
          <div className="card">
            <div className="text-4xl mb-4">💾</div>
            <h3 className="text-xl font-bold mb-2 text-primary-red">บันทึกประวัติ</h3>
            <p className="text-gray-600">เก็บประวัติการเรียนแต่ละเทอมไว้ดูได้ตลอด</p>
          </div>
          <div className="card">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-2 text-primary-red">สถิติรวม</h3>
            <p className="text-gray-600">ดูสถิติการเรียนรวมทั้งหมดได้ที่หน้าเดียว</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
