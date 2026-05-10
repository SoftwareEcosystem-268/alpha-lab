const { getQuery, getOne, insert } = require('../config/database');

class GradeHistory {
  static create({ userId, semester, year, courses, gpa, totalCredits }) {
    const historyId = insert(
      `INSERT INTO grade_history (user_id, semester, year, courses, gpa, total_credits)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, semester, year, JSON.stringify(courses), gpa, totalCredits]
    );
    return { id: historyId };
  }

  static findByUserId(userId) {
    const history = getQuery(
      `SELECT * FROM grade_history WHERE user_id = ? ORDER BY year DESC, semester DESC`,
      [userId]
    );
    return history.map(record => ({
      ...record,
      courses: JSON.parse(record.courses)
    }));
  }

  static findById(id) {
    const record = getOne('SELECT * FROM grade_history WHERE id = ?', [id]);
    if (record) {
      record.courses = JSON.parse(record.courses);
    }
    return record;
  }

  static delete(id, userId) {
    const result = getQuery(
      'DELETE FROM grade_history WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return { changes: result.length };
  }

  static getUserStats(userId) {
    const stats = getOne(
      `SELECT
        COUNT(*) as total_semesters,
        SUM(total_credits) as total_credits,
        SUM(gpa * total_credits) as total_points
       FROM grade_history
       WHERE user_id = ?`,
      [userId]
    );

    if (!stats || !stats.total_credits || stats.total_credits === 0) {
      return { total_semesters: 0, total_credits: 0, cumulative_gpa: 0 };
    }

    // Cumulative GPA = Total Points / Total Credits
    const cumulativeGpa = stats.total_points / stats.total_credits;

    return {
      total_semesters: stats.total_semesters || 0,
      total_credits: stats.total_credits || 0,
      cumulative_gpa: cumulativeGpa || 0
    };
  }
}

module.exports = GradeHistory;
