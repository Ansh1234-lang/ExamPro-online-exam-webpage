'use client';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';

const questions = [
  { id: 1, text: 'Which Indian city is known as the "Silicon Valley of India"?', options: ['Hyderabad', 'Mumbai', 'Bengaluru', 'Pune'], correct: 2 },
  { id: 2, text: 'Who was the first Prime Minister of India?', options: ['Sardar Patel', 'Jawaharlal Nehru', 'Mahatma Gandhi', 'B.R. Ambedkar'], correct: 1 },
  { id: 3, text: 'What is the capital of India?', options: ['Mumbai', 'Kolkata', 'Chennai', 'New Delhi'], correct: 3 },
  { id: 4, text: 'Which planet is known as the Red Planet?', options: ['Venus', 'Jupiter', 'Mars', 'Saturn'], correct: 2 },
  { id: 5, text: 'What is the largest ocean on Earth?', options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], correct: 3 },
  { id: 6, text: 'Who wrote the national anthem of India?', options: ['Bankim Chandra', 'Rabindranath Tagore', 'Sarojini Naidu', 'Subhash Chandra Bose'], correct: 1 },
  { id: 7, text: 'How many states are there in India?', options: ['27', '28', '29', '30'], correct: 1 },
  { id: 8, text: 'What is the chemical symbol for Gold?', options: ['Go', 'Gd', 'Au', 'Ag'], correct: 2 },
  { id: 9, text: 'Which is the longest river in India?', options: ['Yamuna', 'Godavari', 'Ganga', 'Brahmaputra'], correct: 2 },
  { id: 10, text: 'In which year did India gain independence?', options: ['1945', '1946', '1947', '1948'], correct: 2 },
];

const optionLabels = ['A', 'B', 'C', 'D'];

export default function TakeExamPage() {
  const { id } = useParams();
  const router = useRouter();
  const DURATION = 60 * 10; // 10 minutes for demo

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [submitted, setSubmitted] = useState(false);
  const [flagged, setFlagged] = useState<number[]>([]);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    router.push(`/exams/${id}/result`);
  }, [id, router]);

  // Timer
  useEffect(() => {
    if (submitted) return;
    if (timeLeft <= 0) { handleSubmit(); return; }
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, submitted, handleSubmit]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const selectAnswer = (optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [current]: optIdx }));
  };

  const toggleFlag = () => {
    setFlagged((prev) =>
      prev.includes(current) ? prev.filter((f) => f !== current) : [...prev, current]
    );
  };

  const getQuestionStatus = (idx: number) => {
    if (idx === current) return 'current';
    if (flagged.includes(idx)) return 'flagged';
    if (answers[idx] !== undefined) return 'answered';
    return 'unanswered';
  };

  const statusColors: Record<string, string> = {
    current: '#0ea5e9',
    answered: '#10b981',
    flagged: '#f59e0b',
    unanswered: '#1e293b',
  };

  const answered = Object.keys(answers).length;
  const timerDanger = timeLeft < 120;

  return (
    <main style={{ minHeight: '100vh', background: '#020617', display: 'flex', flexDirection: 'column' }}>

      {/* Top Bar */}
      <div style={{
        background: '#0f172a', borderBottom: '1px solid #1e293b',
        padding: '14px 24px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '12px', position: 'sticky', top: 0, zIndex: 10
      }}>
        <div>
          <div style={{ color: '#64748b', fontSize: '11px', marginBottom: '2px' }}>SSC CGL Mock Test 2024</div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>
            Question {current + 1} of {questions.length}
          </div>
        </div>

        {/* Timer */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'monospace', fontSize: '28px', fontWeight: 800,
            color: timerDanger ? '#ef4444' : '#f59e0b',
            animation: timerDanger ? 'pulse 1s infinite' : 'none'
          }}>
            {formatTime(timeLeft)}
          </div>
          <div style={{ height: '4px', background: '#1e293b', borderRadius: '2px', marginTop: '4px', width: '120px' }}>
            <div style={{
              height: '100%', borderRadius: '2px',
              background: timerDanger ? '#ef4444' : '#0ea5e9',
              width: `${(timeLeft / DURATION) * 100}%`,
              transition: 'width 1s linear'
            }} />
          </div>
        </div>

        {/* Submit Button */}
        <button onClick={handleSubmit} style={{
          background: '#10b981', color: 'white', fontWeight: 700,
          padding: '10px 24px', borderRadius: '10px', border: 'none',
          cursor: 'pointer', fontSize: '14px'
        }}>
          Submit Exam ✓
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap' }}>

        {/* Question Area */}
        <div style={{ flex: 1, minWidth: '280px', padding: '32px 24px' }}>

          {/* Progress Bar */}
          <div style={{ height: '4px', background: '#1e293b', borderRadius: '2px', marginBottom: '28px' }}>
            <div style={{
              height: '100%', background: '#0ea5e9', borderRadius: '2px',
              width: `${((current + 1) / questions.length) * 100}%`,
              transition: 'width 0.3s'
            }} />
          </div>

          {/* Question */}
          <div style={{
            background: '#0f172a', border: '1px solid #1e293b',
            borderRadius: '16px', padding: '28px', marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{
                background: '#1e293b', color: '#64748b',
                fontSize: '12px', fontWeight: 600,
                padding: '4px 12px', borderRadius: '999px'
              }}>
                Q.{current + 1}
              </span>
              <button onClick={toggleFlag} style={{
                background: flagged.includes(current) ? 'rgba(245,158,11,0.1)' : '#1e293b',
                border: flagged.includes(current) ? '1px solid #f59e0b' : '1px solid #334155',
                color: flagged.includes(current) ? '#f59e0b' : '#64748b',
                padding: '6px 12px', borderRadius: '8px',
                cursor: 'pointer', fontSize: '12px', fontWeight: 600
              }}>
                {flagged.includes(current) ? '🚩 Flagged' : '🏳️ Flag'}
              </button>
            </div>

            <p style={{ color: 'white', fontSize: '16px', lineHeight: 1.7, fontWeight: 500 }}>
              {questions[current].text}
            </p>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
            {questions[current].options.map((opt, idx) => {
              const isSelected = answers[current] === idx;
              return (
                <button key={idx} onClick={() => selectAnswer(idx)} style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  background: isSelected ? 'rgba(14,165,233,0.1)' : '#0f172a',
                  border: isSelected ? '1.5px solid #0ea5e9' : '1px solid #1e293b',
                  borderRadius: '12px', padding: '14px 18px',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s'
                }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                    background: isSelected ? '#0ea5e9' : '#1e293b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', fontWeight: 700,
                    color: isSelected ? 'white' : '#64748b'
                  }}>
                    {optionLabels[idx]}
                  </div>
                  <span style={{
                    color: isSelected ? 'white' : '#94a3b8',
                    fontSize: '15px', fontWeight: isSelected ? 600 : 400
                  }}>
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              style={{
                background: '#0f172a', border: '1px solid #1e293b',
                color: current === 0 ? '#334155' : '#94a3b8',
                padding: '10px 24px', borderRadius: '10px',
                cursor: current === 0 ? 'not-allowed' : 'pointer',
                fontWeight: 600, fontSize: '14px'
              }}>
              ← Previous
            </button>

            <span style={{ color: '#475569', fontSize: '13px' }}>
              {answered}/{questions.length} answered
            </span>

            <button onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
              disabled={current === questions.length - 1}
              style={{
                background: current === questions.length - 1 ? '#1e293b' : '#0ea5e9',
                border: 'none', color: 'white',
                padding: '10px 24px', borderRadius: '10px',
                cursor: current === questions.length - 1 ? 'not-allowed' : 'pointer',
                fontWeight: 700, fontSize: '14px'
              }}>
              Next →
            </button>
          </div>
        </div>

        {/* Question Palette Sidebar */}
        <div style={{
          width: '220px', minWidth: '220px', background: '#0f172a',
          borderLeft: '1px solid #1e293b', padding: '24px'
        }}>
          <div style={{ color: 'white', fontWeight: 700, fontSize: '14px', marginBottom: '16px' }}>
            Question Palette
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
            {[
              { color: '#10b981', label: 'Answered' },
              { color: '#f59e0b', label: 'Flagged' },
              { color: '#0ea5e9', label: 'Current' },
              { color: '#1e293b', label: 'Not visited' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: item.color, flexShrink: 0 }} />
                <span style={{ color: '#64748b', fontSize: '11px' }}>{item.label}</span>
              </div>
            ))}
          </div>

          <div style={{ height: '1px', background: '#1e293b', marginBottom: '16px' }} />

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
            {questions.map((_, idx) => (
              <button key={idx} onClick={() => setCurrent(idx)} style={{
                width: '36px', height: '36px', borderRadius: '8px',
                background: statusColors[getQuestionStatus(idx)],
                border: 'none', cursor: 'pointer',
                color: 'white', fontSize: '12px', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div style={{
            marginTop: '20px', background: '#1e293b',
            borderRadius: '10px', padding: '12px',
            display: 'flex', flexDirection: 'column', gap: '6px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b', fontSize: '12px' }}>Answered</span>
              <span style={{ color: '#10b981', fontWeight: 700, fontSize: '12px' }}>{answered}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b', fontSize: '12px' }}>Flagged</span>
              <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: '12px' }}>{flagged.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b', fontSize: '12px' }}>Remaining</span>
              <span style={{ color: '#94a3b8', fontWeight: 700, fontSize: '12px' }}>{questions.length - answered}</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}