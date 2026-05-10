const express = require('express');
const router = express.Router();
const {
  saveGradeHistory,
  getGradeHistory,
  getGradeStats,
  deleteGradeHistory
} = require('../controllers/gradeController');
const auth = require('../middleware/auth');

router.post('/', auth, saveGradeHistory);
router.get('/history', auth, getGradeHistory);
router.get('/stats', auth, getGradeStats);
router.delete('/:id', auth, deleteGradeHistory);

module.exports = router;
