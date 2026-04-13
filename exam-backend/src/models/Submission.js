const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  answers: { type: Map, of: Number },
  score: { type: Number, default: 0 },
  totalMarks: { type: Number, default: 0 },
  correct: { type: Number, default: 0 },
  wrong: { type: Number, default: 0 },
  skipped: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  isPassed: { type: Boolean, default: false },
  timeTaken: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);