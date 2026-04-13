const User = require('../models/User');
const Exam = require('../models/Exam');
const Submission = require('../models/Submission');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalExams = await Exam.countDocuments();
    const totalSubmissions = await Submission.countDocuments();
    const publishedExams = await Exam.countDocuments({ isPublished: true });

    res.json({
      success: true,
      stats: { totalUsers, totalExams, totalSubmissions, publishedExams }
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    next(error);
  }
};

exports.banUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id, { isBanned: true }, { new: true }
    );
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'User banned successfully' });
  } catch (error) {
    next(error);
  }
};