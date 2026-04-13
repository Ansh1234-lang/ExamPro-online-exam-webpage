const router = require('express').Router();
const {
  getQuestionsByExam, createQuestion,
  updateQuestion, deleteQuestion, bulkCreateQuestions
} = require('../controllers/questionController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/exam/:examId', protect, getQuestionsByExam);
router.post('/', protect, adminOnly, createQuestion);
router.post('/bulk', protect, adminOnly, bulkCreateQuestions);
router.route('/:id')
  .put(protect, adminOnly, updateQuestion)
  .delete(protect, adminOnly, deleteQuestion);

module.exports = router;