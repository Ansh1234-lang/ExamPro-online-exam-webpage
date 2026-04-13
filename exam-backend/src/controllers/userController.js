const User = require('../models/User');
const Submission = require('../models/Submission');

exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const { name, phone, city, targetExam } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, city, targetExam },
      { new: true, runValidators: true }
    ).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

exports.getUserStats = async (req, res, next) => {
  try {
    const submissions = await Submission.find({ user: req.params.id })
      .populate('exam', 'title category');

    const totalExams = submissions.length;
    const avgScore = totalExams > 0
      ? Math.round(submissions.reduce((a, b) => a + b.percentage, 0) / totalExams)
      : 0;
    const bestScore = totalExams > 0
      ? Math.max(...submissions.map(s => s.percentage))
      : 0;
    const passed = submissions.filter(s => s.isPassed).length;

    res.json({
      success: true,
      stats: { totalExams, avgScore, bestScore, passed, failed: totalExams - passed }
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserHistory = async (req, res, next) => {
  try {
    const submissions = await Submission.find({ user: req.params.id })
      .populate('exam', 'title category duration')
      .sort({ submittedAt: -1 })
      .limit(20);
    res.json({ success: true, submissions });
  } catch (error) {
    next(error);
  }
};