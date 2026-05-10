import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gradeService } from '../services/gradeService';
import { getGradeClassification } from '../utils/gradeUtils';

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [historyRes, statsRes] = await Promise.all([
        gradeService.getGradeHistory(),
        gradeService.getGradeStats()
      ]);
      setHistory(historyRes.history);
      setStats(statsRes);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('คุณต้องการลบประวัติเกรดนี้ใช่หรือไม่?')) {
      return;
    }

    setDeleting(id);
    try {
      await gradeService.deleteGradeHistory(id);
      await fetchData();
    } catch (error) {
      alert('ไม่สามารถลบได้ กรุณาลองใหม่');
    } finally {
      setDeleting(null);
    }
  };

  const getSemesterLabel = (semester) => {
    const labels = {
      '1': 'ภาคการศึกษาที่ 1',
      '2': 'ภาคการศึกษาที่ 2',
      'summer': 'ภาคฤดูร้อน'
    };
    return labels[semester] || semester;
  };

  // Calculate Cumulative GPA up to each semester
  const calculateCumulativeUpTo = (currentIndex) => {
    if (currentIndex < 0 || currentIndex >= history.length) return 0;

    let totalCredits = 0;
    let totalPoints = 0;

    // History is sorted by year DESC, semester DESC
    // We need to calculate from the oldest to current
    for (let i = history.length - 1; i >= currentIndex; i--) {
      const record = history[i];
      totalCredits += record.total_credits;
      totalPoints += record.gpa * record.total_credits;
    }

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-yellow"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-red mb-2">ประวัติการเรียน</h1>
          <p className="text-gray-600">ดูประวัติเกรดและสถิติการเรียนทั้งหมดของคุณ</p>
        </div>

        {stats && stats.totalSemesters > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card text-center bg-gradient-to-br from-primary-yellow to-primary-yellow-dark text-white">
              <div className="text-sm text-white/90 mb-2">GPA รวมสะสม (Cumulative)</div>
              <div className="text-5xl font-bold mb-1">
                {stats.cumulativeGpa.toFixed(2)}
              </div>
              <div className="text-sm text-white/90">
                {getGradeClassification(stats.cumulativeGpa).text}
              </div>
            </div>
            <div className="card text-center">
              <div className="text-4xl font-bold text-primary-yellow-dark mb-2">
                {stats.totalCredits}
              </div>
              <div className="text-gray-600">หน่วยกิตรวมทั้งหมด</div>
            </div>
            <div className="card text-center">
              <div className="text-4xl font-bold text-primary-yellow-dark mb-2">
                {stats.totalSemesters}
              </div>
              <div className="text-gray-600">ภาคการศึกษาทั้งหมด</div>
            </div>
          </div>
        )}

        {history.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">ยังไม่มีประวัติการเรียน</h3>
            <p className="text-gray-500 mb-6">เริ่มคำนวณเกรดและบันทึกประวัติการเรียนของคุณ</p>
            <button
              onClick={() => navigate('/calculator')}
              className="btn-primary"
            >
              ไปคำนวณเกรด
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((record, index) => {
              const cumulativeGpa = calculateCumulativeUpTo(index);
              const prevCumulativeGpa = calculateCumulativeUpTo(index + 1);
              const gpaChange = cumulativeGpa - prevCumulativeGpa;

              return (
                <div key={record.id} className="card">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-primary-red mb-1">
                        {getSemesterLabel(record.semester)} - ปีการศึกษา {record.year}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        บันทึกเมื่อ {new Date(record.created_at).toLocaleDateString('th-TH')}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary-yellow-dark">
                          {record.gpa.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">GPA เทอม</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {cumulativeGpa.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">Cumulative GPA</div>
                        {index < history.length - 1 && (
                          <div className={`text-xs font-semibold ${gpaChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {gpaChange >= 0 ? '↑' : '↓'} {Math.abs(gpaChange).toFixed(2)}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleDelete(record.id)}
                        disabled={deleting === record.id}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-red-light to-primary-red text-white font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-primary-red/30 hover:-translate-y-0.5 transition-all"
                      >
                        {deleting === record.id ? 'กำลังลบ...' : 'ลบ'}
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-primary-cream">
                          <th className="text-left py-3 px-4 text-gray-600 font-semibold">วิชา</th>
                          <th className="text-center py-3 px-4 text-gray-600 font-semibold">หน่วยกิต</th>
                          <th className="text-center py-3 px-4 text-gray-600 font-semibold">เกรด</th>
                          <th className="text-center py-3 px-4 text-gray-600 font-semibold">คะแนน</th>
                        </tr>
                      </thead>
                      <tbody>
                        {record.courses.map((course, courseIndex) => (
                          <tr key={courseIndex} className="border-b border-gray-100 hover:bg-primary-cream/50 transition-colors">
                            <td className="py-3 px-4">{course.name}</td>
                            <td className="py-3 px-4 text-center">{course.credits}</td>
                            <td className="py-3 px-4 text-center">
                              <span className={`inline-block px-3 py-1 rounded-lg font-semibold ${
                                course.grade >= 3.5 ? 'bg-green-100 text-green-700' :
                                course.grade >= 3.0 ? 'bg-blue-100 text-blue-700' :
                                course.grade >= 2.0 ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {gradeOptions.find(g => g.value === course.grade)?.label || '-'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              {(course.credits * course.grade).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-primary-cream font-semibold">
                          <td className="py-3 px-4">รวมทั้งหมด</td>
                          <td className="py-3 px-4 text-center">{record.total_credits}</td>
                          <td className="py-3 px-4 text-center">-</td>
                          <td className="py-3 px-4 text-center">
                            {(record.gpa * record.total_credits).toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="mt-6 flex items-center justify-between flex-wrap gap-2">
                    <div className="text-sm text-gray-600">
                      จำนวนวิชา: <span className="font-bold text-primary-yellow-dark">{record.courses.length} วิชา</span>
                    </div>
                    <div className={`text-sm font-bold ${getGradeClassification(record.gpa).color}`}>
                      ระดับเทอม: {getGradeClassification(record.gpa).text}
                    </div>
                    <div className={`text-sm font-bold ${getGradeClassification(cumulativeGpa).color}`}>
                      ระดับรวม: {getGradeClassification(cumulativeGpa).text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const gradeOptions = [
  { value: 4.0, label: 'A' },
  { value: 3.5, label: 'B+' },
  { value: 3.0, label: 'B' },
  { value: 2.5, label: 'C+' },
  { value: 2.0, label: 'C' },
  { value: 1.5, label: 'D+' },
  { value: 1.0, label: 'D' },
  { value: 0.0, label: 'F' }
];

export default History;
