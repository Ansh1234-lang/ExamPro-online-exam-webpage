const router = require('express').Router();
const { getUserSubmissions, getSubmissionById } = require('../controllers/submissionController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getUserSubmissions);
router.get('/:id', protect, getSubmissionById);

module.exports = router;