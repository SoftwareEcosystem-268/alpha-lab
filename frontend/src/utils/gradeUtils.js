export const calculateGPA = (courses) => {
  if (!courses || courses.length === 0) {
    return { gpa: 0, totalCredits: 0, totalPoints: 0 };
  }

  // Convert credits to number and filter out invalid courses
  const validCourses = courses.filter(course => {
    const credits = Number(course.credits);
    return course.name && course.name.trim() !== '' &&
           !isNaN(credits) && credits > 0 &&
           !isNaN(course.grade);
  });

  if (validCourses.length === 0) {
    return { gpa: 0, totalCredits: 0, totalPoints: 0 };
  }

  const totalCredits = validCourses.reduce((sum, course) => {
    const credits = Number(course.credits) || 0;
    return sum + credits;
  }, 0);

  const totalPoints = validCourses.reduce((sum, course) => {
    const credits = Number(course.credits) || 0;
    const grade = Number(course.grade) || 0;
    return sum + (credits * grade);
  }, 0);

  return {
    gpa: totalCredits > 0 ? totalPoints / totalCredits : 0,
    totalCredits,
    totalPoints
  };
};

export const getGradeClassification = (gpa) => {
  if (gpa >= 3.50) return { text: 'อย่างยอดเยี่ยม', color: 'text-primary-red' };
  if (gpa >= 3.00) return { text: 'ดีมาก', color: 'text-primary-yellow-dark' };
  if (gpa >= 2.50) return { text: 'ดี', color: 'text-primary-yellow' };
  if (gpa >= 2.00) return { text: 'พอใช้', color: 'text-yellow-500' };
  if (gpa >= 1.50) return { text: 'อ่อน', color: 'text-yellow-400' };
  return { text: 'อ่อนมาก', color: 'text-orange-400' };
};

export const gradeOptions = [
  { value: 4.0, label: 'A', description: '4.0' },
  { value: 3.5, label: 'B+', description: '3.5' },
  { value: 3.0, label: 'B', description: '3.0' },
  { value: 2.5, label: 'C+', description: '2.5' },
  { value: 2.0, label: 'C', description: '2.0' },
  { value: 1.5, label: 'D+', description: '1.5' },
  { value: 1.0, label: 'D', description: '1.0' },
  { value: 0.0, label: 'F', description: '0.0' }
];

export const semesterOptions = [
  { value: '1', label: 'ภาคการศึกษาที่ 1' },
  { value: '2', label: 'ภาคการศึกษาที่ 2' },
  { value: 'summer', label: 'ภาคฤดูร้อน' }
];
