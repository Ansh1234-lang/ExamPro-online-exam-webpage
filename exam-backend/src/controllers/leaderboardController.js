const Submission = require('../models/Submission');
const User = require('../models/User');

exports.getGlobalLeaderboard = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('name avatar totalScore totalExams')
      .sort({ totalScore: -1 })
      .limit(100);

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      user: { _id: user._id, name: user.name, avatar: user.avatar },
      totalScore: user.totalScore,
      totalExams: user.totalExams,
    }));

    res.json({ success: true, leaderboard });
  } catch (error) {
    next(error);
  }
};

exports.getExamLeaderboard = async (req, res, next) => {
  try {
    const submissions = await Submission.find({ exam: req.params.examId })
      .populate('user', 'name avatar')
      .sort({ score: -1, timeTaken: 1 })
      .limit(100);

    const leaderboard = submissions.map((sub, index) => ({
      rank: index + 1,
      user: sub.user,
      score: sub.score,
      percentage: sub.percentage,
      timeTaken: sub.timeTaken,
    }));

    res.json({ success: true, leaderboard });
  } catch (error) {
    next(error);
  }
};