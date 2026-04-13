const router = require('express').Router();
const {
  getAllExams, getExamById, createExam,
  updateExam, deleteExam, submitExam, getResult
} = require('../controllers/examController');
const { protect, adminOnly } = require('../middleware/auth');

// ✅ Public routes — no login needed
router.get('/', getAllExams);
router.get('/:id', getExamById);

// 🔒 Protected routes — login needed
router.post('/', protect, adminOnly, createExam);
router.put('/:id', protect, adminOnly, updateExam);
router.delete('/:id', protect, adminOnly, deleteExam);
router.post('/:id/submit', protect, submitExam);
router.get('/:id/result/:userId', protect, getResult);

module.exports = router;