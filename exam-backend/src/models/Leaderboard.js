const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
  score: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  type: { type: String, enum: ['global', 'exam', 'weekly', 'monthly'], default: 'global' },
}, { timestamps: true });

module.exports = mongoose.model('Leaderboard', leaderboardSchema);