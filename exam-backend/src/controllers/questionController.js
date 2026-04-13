const Question = require('../models/Question');

exports.getQuestionsByExam = async (req, res, next) => {
  try {
    const questions = await Question.find({ exam: req.params.examId })
      .select('-correctOption -explanation');
    res.json({ success: true, count: questions.length, questions });
  } catch (error) {
    next(error);
  }
};

exports.createQuestion = async (req, res, next) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({ success: true, question });
  } catch (error) {
    next(error);
  }
};

exports.updateQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) return res.status(404).json({ success: false, message: 'Question not found' });
    res.json({ success: true, question });
  } catch (error) {
    next(error);
  }
};

exports.deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ success: false, message: 'Question not found' });
    await question.deleteOne();
    res.json({ success: true, message: 'Question deleted' });
  } catch (error) {
    next(error);
  }
};

exports.bulkCreateQuestions = async (req, res, next) => {
  try {
    const questions = await Question.insertMany(req.body.questions);
    res.status(201).json({ success: true, count: questions.length, questions });
  } catch (error) {
    next(error);
  }
};