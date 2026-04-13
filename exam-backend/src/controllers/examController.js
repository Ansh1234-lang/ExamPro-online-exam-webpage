const Exam = require('../models/Exam');
const Question = require('../models/Question');
const Submission = require('../models/Submission');
const Category = require('../models/Category');
// @desc Get all exams
exports.getAllExams = async (req, res, next) => {
  try {
    const { category, difficulty, search, page = 1, limit = 12 } = req.query;
    const query = { isPublished: true };

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) query.title = { $regex: search, $options: 'i' };

    const total = await Exam.countDocuments(query);
    const exams = await Exam.find(query)
      .populate('category', 'name icon')
      .sort({ attempts: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      count: exams.length,
      total,
      pages: Math.ceil(total / limit),
      exams
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get single exam
exports.getExamById = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id).populate('category', 'name icon');
    if (!exam) return res.status(404).json({ success: false, message: 'Exam not found' });

    res.json({ success: true, exam });
  } catch (error) {
    next(error);
  }
};

// @desc Get all exams
exports.getAllExams = async (req, res, next) => {
  try {
    const { difficulty, search, page = 1, limit = 12 } = req.query;
    const query = { isPublished: true };

    if (difficulty) query.difficulty = difficulty;
    if (search) query.title = { $regex: search, $options: 'i' };

    const total = await Exam.countDocuments(query);
    const exams = await Exam.find(query)
      .populate('category', 'name icon')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: exams.length,
      total,
      pages: Math.ceil(total / limit),
      exams
    });
  } catch (error) {
    console.error('getAllExams error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// @desc Create exam (admin)
exports.createExam = async (req, res, next) => {
  try {
    const exam = await Exam.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, exam });
  } catch (error) {
    next(error);
  }
};

// @desc Update exam (admin)
exports.updateExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!exam) return res.status(404).json({ success: false, message: 'Exam not found' });
    res.json({ success: true, exam });
  } catch (error) {
    next(error);
  }
};

// @desc Delete exam (admin)
exports.deleteExam = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ success: false, message: 'Exam not found' });
    await exam.deleteOne();
    await Question.deleteMany({ exam: req.params.id });
    res.json({ success: true, message: 'Exam deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc Submit exam
exports.submitExam = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ success: false, message: 'Exam not found' });

    const questions = await Question.find({ exam: req.params.id });
    const { answers, timeTaken } = req.body;

    let correct = 0, wrong = 0, skipped = 0, score = 0;

    questions.forEach((q) => {
      const userAnswer = answers[q._id.toString()];
      if (userAnswer === undefined || userAnswer === null) {
        skipped++;
      } else if (Number(userAnswer) === q.correctOption) {
        correct++;
        score += q.marks;
      } else {
        wrong++;
        score -= exam.negativeMarking;
      }
    });

    score = Math.max(0, score);
    const percentage = Math.round((score / exam.totalMarks) * 100);
    const isPassed = score >= exam.passingMarks;

    const submission = await Submission.create({
      user: req.user._id,
      exam: exam._id,
      answers,
      score,
      totalMarks: exam.totalMarks,
      correct,
      wrong,
      skipped,
      percentage,
      isPassed,
      timeTaken: timeTaken || 0,
    });

    // Update exam attempt count
    await Exam.findByIdAndUpdate(req.params.id, { $inc: { attempts: 1 } });

    // Update user stats
    const User = require('../models/User');
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { totalExams: 1, totalScore: score }
    });

    res.status(201).json({
      success: true,
      submission: {
        _id: submission._id,
        score,
        totalMarks: exam.totalMarks,
        correct,
        wrong,
        skipped,
        percentage,
        isPassed,
        timeTaken,
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get exam result
exports.getResult = async (req, res, next) => {
  try {
    const submission = await Submission.findOne({
      exam: req.params.id,
      user: req.params.userId
    }).populate('exam', 'title totalMarks passingMarks');

    if (!submission) return res.status(404).json({ success: false, message: 'Result not found' });

    res.json({ success: true, submission });
  } catch (error) {
    next(error);
  }
};