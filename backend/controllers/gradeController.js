const GradeHistory = require('../models/GradeHistory');

const saveGradeHistory = async (req, res) => {
  try {
    const { semester, year, courses, gpa, totalCredits } = req.body;

    if (!semester || !year || !courses || !Array.isArray(courses) || courses.length === 0) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    if (isNaN(gpa) || isNaN(totalCredits)) {
      return res.status(400).json({ error: 'Invalid GPA or total credits' });
    }

    const result = GradeHistory.create({
      userId: req.user.id,
      semester,
      year,
      courses,
      gpa,
      totalCredits
    });

    res.status(201).json({
      message: 'Grade history saved successfully',
      id: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Save grade history error:', error);
    res.status(500).json({ error: 'Server error while saving grade history' });
  }
};

const getGradeHistory = async (req, res) => {
  try {
    const history = GradeHistory.findByUserId(req.user.id);
    res.json({ history });
  } catch (error) {
    console.error('Get grade history error:', error);
    res.status(500).json({ error: 'Server error while fetching grade history' });
  }
};

const getGradeStats = async (req, res) => {
  try {
    const stats = GradeHistory.getUserStats(req.user.id);
    res.json({
      totalSemesters: stats.total_semesters || 0,
      totalCredits: stats.total_credits || 0,
      cumulativeGpa: stats.cumulative_gpa ? parseFloat(stats.cumulative_gpa.toFixed(2)) : 0
    });
  } catch (error) {
    console.error('Get grade stats error:', error);
    res.status(500).json({ error: 'Server error while fetching grade stats' });
  }
};

const deleteGradeHistory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'History ID is required' });
    }

    const result = GradeHistory.delete(id, req.user.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Grade history not found' });
    }

    res.json({ message: 'Grade history deleted successfully' });
  } catch (error) {
    console.error('Delete grade history error:', error);
    res.status(500).json({ error: 'Server error while deleting grade history' });
  }
};

module.exports = {
  saveGradeHistory,
  getGradeHistory,
  getGradeStats,
  deleteGradeHistory
};
