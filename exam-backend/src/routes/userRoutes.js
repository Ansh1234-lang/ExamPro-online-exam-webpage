const router = require('express').Router();
const {
  getUserProfile, updateUserProfile,
  getUserStats, getUserHistory
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/:id', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/:id/stats', protect, getUserStats);
router.get('/:id/history', protect, getUserHistory);

module.exports = router;