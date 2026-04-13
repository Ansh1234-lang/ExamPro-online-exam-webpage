const Submission = require('../models/Submission');

exports.getUserSubmissions = async (req, res, next) => {
  try {
    const submissions = await Submission.find({ user: req.user._id })
      .populate('exam', 'title category duration')
      .sort({ submittedAt: -1 });
    res.json({ success: true, count: submissions.length, submissions });
  } catch (error) {
    next(error);
  }
};

exports.getSubmissionById = async (req, res, next) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('exam', 'title totalMarks passingMarks negativeMarking');
    if (!submission) return res.status(404).json({ success: false, message: 'Submission not found' });
    if (submission.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    res.json({ success: true, submission });
  } catch (error) {
    next(error);
  }
};