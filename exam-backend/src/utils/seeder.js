const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Category = require('../models/Category');
const Exam = require('../models/Exam');
const Question = require('../models/Question');
const User = require('../models/User');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await Category.deleteMany({});
  await Exam.deleteMany({});
  await Question.deleteMany({});

  // Create Categories
  const categories = await Category.insertMany([
    { name: 'SSC', icon: '💼', description: 'Staff Selection Commission' },
    { name: 'UPSC', icon: '🏛️', description: 'Union Public Service Commission' },
    { name: 'JEE', icon: '📐', description: 'Joint Entrance Examination' },
    { name: 'NEET', icon: '🏥', description: 'National Eligibility cum Entrance Test' },
    { name: 'Banking', icon: '🏦', description: 'Bank PO and Clerk Exams' },
    { name: 'Railway', icon: '🚂', description: 'Railway Recruitment Board' },
  ]);

  console.log('✅ Categories created');

  // Create Admin User
  const existingAdmin = await User.findOne({ email: 'admin@exampro.com' });
  if (!existingAdmin) {
    await User.create({
      name: 'Admin User',
      email: 'admin@exampro.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('✅ Admin user created — email: admin@exampro.com | password: admin123');
  }

  // Create Exams
  const sscCat = categories.find(c => c.name === 'SSC');
  const upscCat = categories.find(c => c.name === 'UPSC');
  const jeeCat = categories.find(c => c.name === 'JEE');
  const neetCat = categories.find(c => c.name === 'NEET');
  const bankCat = categories.find(c => c.name === 'Banking');
  const railCat = categories.find(c => c.name === 'Railway');

  const exams = await Exam.insertMany([
    {
      title: 'SSC CGL Mock Test 2024',
      description: 'Full mock test for SSC CGL covering all 4 sections.',
      category: sscCat._id, duration: 60, totalMarks: 200,
      passingMarks: 140, negativeMarking: 0.5, difficulty: 'Medium',
      topics: ['General Intelligence', 'General Awareness', 'Quantitative Aptitude', 'English'],
      instructions: ['100 questions, 200 marks', '0.5 negative marking', '60 minutes duration'],
      isPublished: true,
    },
    {
      title: 'UPSC Prelims GS Paper 1',
      description: 'Full length UPSC Civil Services Preliminary GS Paper 1.',
      category: upscCat._id, duration: 120, totalMarks: 200,
      passingMarks: 110, negativeMarking: 0.66, difficulty: 'Hard',
      topics: ['History', 'Geography', 'Polity', 'Economy', 'Environment', 'Current Affairs'],
      instructions: ['100 questions, 200 marks', '0.66 negative marking', '120 minutes duration'],
      isPublished: true,
    },
    {
      title: 'JEE Mains Physics Mock',
      description: 'Physics section mock test for JEE Mains.',
      category: jeeCat._id, duration: 60, totalMarks: 100,
      passingMarks: 60, negativeMarking: 1, difficulty: 'Hard',
      topics: ['Mechanics', 'Electrostatics', 'Thermodynamics', 'Optics'],
      instructions: ['25 questions', '4 marks each', '1 negative marking', '60 minutes'],
      isPublished: true,
    },
    {
      title: 'NEET Biology Full Test',
      description: 'Complete Biology section for NEET preparation.',
      category: neetCat._id, duration: 60, totalMarks: 180,
      passingMarks: 120, negativeMarking: 1, difficulty: 'Medium',
      topics: ['Cell Biology', 'Genetics', 'Ecology', 'Human Physiology', 'Plant Physiology'],
      instructions: ['90 questions', '4 marks each', '1 negative marking', '60 minutes'],
      isPublished: true,
    },
    {
      title: 'SBI PO Prelims Mock',
      description: 'State Bank of India PO Preliminary exam mock test.',
      category: bankCat._id, duration: 60, totalMarks: 100,
      passingMarks: 60, negativeMarking: 0.25, difficulty: 'Medium',
      topics: ['English Language', 'Quantitative Aptitude', 'Reasoning Ability'],
      instructions: ['100 questions', '1 mark each', '0.25 negative marking', '60 minutes'],
      isPublished: true,
    },
    {
      title: 'RRB NTPC General Awareness',
      description: 'General Awareness section for RRB NTPC exam.',
      category: railCat._id, duration: 45, totalMarks: 100,
      passingMarks: 60, negativeMarking: 0.33, difficulty: 'Easy',
      topics: ['Indian Railways', 'Current Affairs', 'Science', 'History', 'Geography'],
      instructions: ['50 questions', '2 marks each', '0.33 negative marking', '45 minutes'],
      isPublished: true,
    },
  ]);

  console.log('✅ Exams created');

  // Create Questions for SSC CGL
  const sscQuestions = [
    { text: 'Which Indian city is known as the "Silicon Valley of India"?', options: ['Hyderabad', 'Mumbai', 'Bengaluru', 'Pune'], correctOption: 2, difficulty: 'Easy', marks: 2 },
    { text: 'Who was the first Prime Minister of India?', options: ['Sardar Patel', 'Jawaharlal Nehru', 'Mahatma Gandhi', 'B.R. Ambedkar'], correctOption: 1, difficulty: 'Easy', marks: 2 },
    { text: 'What is the capital of India?', options: ['Mumbai', 'Kolkata', 'Chennai', 'New Delhi'], correctOption: 3, difficulty: 'Easy', marks: 2 },
    { text: 'Which planet is known as the Red Planet?', options: ['Venus', 'Jupiter', 'Mars', 'Saturn'], correctOption: 2, difficulty: 'Easy', marks: 2 },
    { text: 'What is the largest ocean on Earth?', options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], correctOption: 3, difficulty: 'Easy', marks: 2 },
    { text: 'Who wrote the national anthem of India?', options: ['Bankim Chandra', 'Rabindranath Tagore', 'Sarojini Naidu', 'Subhash Chandra Bose'], correctOption: 1, difficulty: 'Easy', marks: 2 },
    { text: 'How many states are there in India?', options: ['27', '28', '29', '30'], correctOption: 1, difficulty: 'Medium', marks: 2 },
    { text: 'What is the chemical symbol for Gold?', options: ['Go', 'Gd', 'Au', 'Ag'], correctOption: 2, difficulty: 'Medium', marks: 2 },
    { text: 'Which is the longest river in India?', options: ['Yamuna', 'Godavari', 'Ganga', 'Brahmaputra'], correctOption: 2, difficulty: 'Medium', marks: 2 },
    { text: 'In which year did India gain independence?', options: ['1945', '1946', '1947', '1948'], correctOption: 2, difficulty: 'Easy', marks: 2 },
  ];

  await Question.insertMany(sscQuestions.map(q => ({ ...q, exam: exams[0]._id })));
  console.log('✅ Questions created for SSC CGL');

  console.log('\n🎉 Database seeded successfully!');
  console.log('👤 Admin login: admin@exampro.com | admin123');
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});