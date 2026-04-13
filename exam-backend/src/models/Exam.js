const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  description: { type: String, default: '' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  duration: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  passingMarks: { type: Number, required: true },
  negativeMarking: { type: Number, default: 0 },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  topics: [{ type: String }],
  instructions: [{ type: String }],
  isPublished: { type: Boolean, default: false },
  attempts: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);