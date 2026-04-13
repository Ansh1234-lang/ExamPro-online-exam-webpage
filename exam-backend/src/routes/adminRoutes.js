const router = require('express').Router();
const { getDashboardStats, getAllUsers, banUser } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/users', protect, adminOnly, getAllUsers);
router.put('/users/:id/ban', protect, adminOnly, banUser);

module.exports = router;