const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  text: { type: String, required: [true, 'Question text is required'] },
  options: {
    type: [String],
    validate: { validator: (v) => v.length === 4, message: 'Exactly 4 options required' }
  },
  correctOption: { type: Number, required: true, min: 0, max: 3 },
  explanation: { type: String, default: '' },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  tags: [{ type: String }],
  marks: { type: Number, default: 2 },
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);