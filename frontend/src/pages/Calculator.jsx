import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateGPA, getGradeClassification, gradeOptions, semesterOptions } from '../utils/gradeUtils';
import { gradeService } from '../services/gradeService';

const Calculator = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([
    { id: 1, name: '', credits: 0, grade: 4.0 }
  ]);
  const [semesterInfo, setSemesterInfo] = useState({
    semester: '1',
    year: new Date().getFullYear()
  });
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [cumulativeStats, setCumulativeStats] = useState({
    totalSemesters: 0,
    totalCredits: 0,
    cumulativeGpa: 0
  });

  // Load cumulative stats on mount
  useEffect(() => {
    loadCumulativeStats();
  }, []);

  const loadCumulativeStats = async () => {
    try {
      const stats = await gradeService.getGradeStats();
      setCumulativeStats(stats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now(), name: '', credits: 0, grade: 4.0 }
    ]);
  };

  const removeCourse = (id) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
      setResult(null);
    }
  };

  const updateCourse = (id, field, value) => {
    setCourses(courses.map(course => {
      if (course.id === id) {
        // Convert credits to number
        const newValue = field === 'credits' ? Number(value) : value;
        return { ...course, [field]: newValue };
      }
      return course;
    }));
    setResult(null);
  };

  const handleCalculate = () => {
    // Filter valid courses: must have name and credits > 0
    const validCourses = courses.filter(c =>
      c.name && c.name.trim() !== '' && Number(c.credits) > 0
    );

    if (validCourses.length === 0) {
      alert('กรุณากรอกข้อมูลวิชาอย่างน้อย 1 วิชา\nพร้อมทั้งระบุชื่อวิชาและหน่วยกิต');
      return;
    }

    const { gpa, totalCredits, totalPoints } = calculateGPA(validCourses);
    setResult({ gpa, totalCredits, totalPoints, courses: validCourses });
  };

  const handleReset = () => {
    setCourses([{ id: 1, name: '', credits: 0, grade: 4.0 }]);
    setResult(null);
    setSemesterInfo({ semester: '1', year: new Date().getFullYear() });
    setSavedMessage('');
  };

  const handleSave = async () => {
    if (!result) {
      alert('กรุณาคำนวณเกรดก่อนบันทึก');
      return;
    }

    setSaving(true);
    try {
      await gradeService.saveGradeHistory({
        semester: semesterInfo.semester,
        year: semesterInfo.year,
        courses: result.courses,
        gpa: result.gpa,
        totalCredits: result.totalCredits
      });
      setSavedMessage('บันทึกเรียบร้อย!');
      setTimeout(() => setSavedMessage(''), 3000);

      // Reload cumulative stats after saving
      await loadCumulativeStats();
    } catch (error) {
      alert('ไม่สามารถบันทึกได้ กรุณาลองใหม่');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-red mb-2">คำนวณเกรด</h1>
          <p className="text-gray-600">เพิ่มวิชาและคำนวณเกรดเฉลี่ย (GPA)</p>
        </div>

        {/* Cumulative GPA Banner */}
        {cumulativeStats.totalSemesters > 0 && (
          <div className="card mb-6 bg-gradient-to-r from-primary-cream to-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">
                  📊 GPA รวมสะสม (Cumulative GPA)
                </h3>
                <p className="text-sm text-gray-500">
                  จากทุกเทอมที่เรียนมา ({cumulativeStats.totalSemesters} เทอม, {cumulativeStats.totalCredits} หน่วยกิต)
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-primary-yellow-dark">
                  {cumulativeStats.cumulativeGpa.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">
                  {getGradeClassification(cumulativeStats.cumulativeGpa).text}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <h2 className="section-title">ข้อมูลภาคการศึกษา</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ภาคการศึกษา
                  </label>
                  <select
                    value={semesterInfo.semester}
                    onChange={(e) => setSemesterInfo({ ...semesterInfo, semester: e.target.value })}
                    className="input-field"
                  >
                    {semesterOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ปีการศึกษา
                  </label>
                  <input
                    type="number"
                    value={semesterInfo.year}
                    onChange={(e) => setSemesterInfo({ ...semesterInfo, year: parseInt(e.target.value) })}
                    className="input-field"
                    min="2000"
                    max="2100"
                  />
                </div>
              </div>
            </div>

            <div className="card mb-6">
              <h2 className="section-title">รายวิชา</h2>
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div
                    key={course.id}
                    className="p-4 bg-primary-cream rounded-xl border-2 border-primary-cream-light"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ชื่อวิชา
                        </label>
                        <input
                          type="text"
                          value={course.name}
                          onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                          placeholder="เช่น คณิตศาสตร์ 101"
                          className="input-field"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          หน่วยกิต
                        </label>
                        <input
                          type="number"
                          value={course.credits}
                          onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                          placeholder="3"
                          min="1"
                          max="10"
                          className="input-field"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          เกรด
                        </label>
                        <select
                          value={course.grade}
                          onChange={(e) => updateCourse(course.id, 'grade', parseFloat(e.target.value))}
                          className="input-field"
                        >
                          {gradeOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label} ({option.description})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <button
                          onClick={() => removeCourse(course.id)}
                          disabled={courses.length === 1}
                          className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-primary-red-light to-primary-red text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary-red/30 hover:-translate-y-0.5 transition-all"
                        >
                          ลบ
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addCourse}
                className="w-full mt-4 px-6 py-3 rounded-xl border-2 border-dashed border-primary-yellow text-primary-yellow-dark font-semibold hover:bg-primary-yellow hover:text-white transition-all"
              >
                + เพิ่มวิชา
              </button>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={handleCalculate} className="btn-primary text-lg px-8">
                📊 คำนวณเกรด
              </button>
              {result && (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-secondary text-lg px-8 disabled:opacity-50"
                  >
                    {saving ? 'กำลังบันทึก...' : '💾 บันทึกประวัติ'}
                  </button>
                  <button onClick={handleReset} className="px-6 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all">
                    🔄 รีเซ็ต
                  </button>
                </>
              )}
            </div>

            {savedMessage && (
              <div className="mt-4 text-center text-green-600 font-semibold">
                {savedMessage}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            {result ? (
              <div className="card sticky top-24">
                <h2 className="section-title">ผลการคำนวณ</h2>

                {/* Term GPA */}
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-br from-primary-yellow to-primary-yellow-dark rounded-2xl p-6 mb-4">
                    <div className="text-sm text-white/90 mb-1">เทอมนี้</div>
                    <div className="text-4xl font-bold text-white mb-1">
                      {result.gpa.toFixed(2)}
                    </div>
                    <div className="text-white/90 text-sm">GPA เทอมนี้</div>
                  </div>

                  {/* Projected Cumulative GPA */}
                  {cumulativeStats.totalSemesters > 0 && (
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6">
                      <div className="text-sm text-white/90 mb-1">หลังบันทึกเทอมนี้</div>
                      <div className="text-4xl font-bold text-white mb-1">
                        {(
                          (cumulativeStats.totalPoints + result.totalPoints) /
                          (cumulativeStats.totalCredits + result.totalCredits)
                        ).toFixed(2)}
                      </div>
                      <div className="text-white/90 text-sm">Cumulative GPA โดยประมาณ</div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-primary-cream rounded-xl">
                    <span className="text-gray-600 text-sm">วิชาที่คำนวณ</span>
                    <span className="font-bold text-primary-yellow-dark">{result.courses.length} วิชา</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary-cream rounded-xl">
                    <span className="text-gray-600 text-sm">หน่วยกิตเทอมนี้</span>
                    <span className="font-bold text-primary-yellow-dark">{result.totalCredits} หน่วยกิต</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary-cream rounded-xl">
                    <span className="text-gray-600 text-sm">คะแนนเทอมนี้</span>
                    <span className="font-bold text-primary-yellow-dark">{result.totalPoints.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary-cream rounded-xl">
                    <span className="text-gray-600 text-sm">ระดับ</span>
                    <span className={`font-bold text-sm ${getGradeClassification(result.gpa).color}`}>
                      {getGradeClassification(result.gpa).text}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/history')}
                  className="w-full mt-6 px-6 py-3 rounded-xl border-2 border-primary-yellow text-primary-yellow-dark font-semibold hover:bg-primary-yellow hover:text-white transition-all"
                >
                  ดูประวัติทั้งหมด →
                </button>
              </div>
            ) : (
              <div className="card sticky top-24">
                <h2 className="section-title">ผลการคำนวณ</h2>
                <div className="text-center py-12 text-gray-400">
                  <div className="text-5xl mb-4">📊</div>
                  <p>คลิกปุ่ม "คำนวณเกรด" เพื่อดูผลลัพธ์</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
