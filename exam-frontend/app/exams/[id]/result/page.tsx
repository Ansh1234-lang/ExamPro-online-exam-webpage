'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ResultPage() {
  const { id } = useParams();

  const result = {
    score: 16, total: 20, correct: 8,
    wrong: 2, skipped: 0, timeTaken: '7:32',
    rank: 142, totalStudents: 24500,
    percentage: 80,
  };

  const isPassed = result.percentage >= 60;

  return (
    <main style={{ minHeight: '100vh', background: '#020617', padding: '32px 24px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* Result Header */}
        <div style={{
          background: isPassed
            ? 'linear-gradient(135deg, #064e3b, #0f172a)'
            : 'linear-gradient(135deg, #450a0a, #0f172a)',
          border: `1px solid ${isPassed ? '#10b981' : '#ef4444'}44`,
          borderRadius: '20px', padding: '36px',
          textAlign: 'center', marginBottom: '24px'
        }}>
          <div style={{ fontSize: '56px', marginBottom: '12px' }}>
            {isPassed ? '🎉' : '😔'}
          </div>
          <h1 style={{ color: 'white', fontSize: '26px', fontWeight: 800, marginBottom: '8px' }}>
            {isPassed ? 'Congratulations! You Passed!' : 'Keep Practicing!'}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
            SSC CGL Mock Test 2024
          </p>

          {/* Big Score */}
          <div style={{
            display: 'inline-block',
            background: 'rgba(0,0,0,0.3)', borderRadius: '16px',
            padding: '20px 40px', marginBottom: '24px'
          }}>
            <div style={{
              fontSize: '56px', fontWeight: 900,
              color: isPassed ? '#10b981' : '#ef4444'
            }}>
              {result.percentage}%
            </div>
            <div style={{ color: '#64748b', fontSize: '14px' }}>
              {result.score} / {result.total} marks
            </div>
          </div>

          {/* Score Breakdown */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '12px'
          }}>
            {[
              { label: 'Correct', value: result.correct, color: '#10b981', icon: '✅' },
              { label: 'Wrong', value: result.wrong, color: '#ef4444', icon: '❌' },
              { label: 'Skipped', value: result.skipped, color: '#f59e0b', icon: '⏭️' },
              { label: 'Time Taken', value: result.timeTaken, color: '#38bdf8', icon: '⏱️' },
            ].map((item) => (
              <div key={item.label} style={{
                background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '14px'
              }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{item.icon}</div>
                <div style={{ color: item.color, fontWeight: 700, fontSize: '20px' }}>{item.value}</div>
                <div style={{ color: '#475569', fontSize: '11px', marginTop: '2px' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rank Card */}
        <div style={{
          background: '#0f172a', border: '1px solid #1e293b',
          borderRadius: '16px', padding: '24px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: '24px',
          flexWrap: 'wrap', gap: '16px'
        }}>
          <div>
            <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '4px' }}>Your Rank</div>
            <div style={{ color: '#f59e0b', fontSize: '36px', fontWeight: 900 }}>#{result.rank}</div>
            <div style={{ color: '#475569', fontSize: '12px' }}>out of {result.totalStudents.toLocaleString()} students</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '4px' }}>Percentile</div>
            <div style={{ color: '#38bdf8', fontSize: '36px', fontWeight: 900 }}>
              {((1 - result.rank / result.totalStudents) * 100).toFixed(1)}
            </div>
            <div style={{ color: '#475569', fontSize: '12px' }}>better than others</div>
          </div>
        </div>

        {/* Performance Bar */}
        <div style={{
          background: '#0f172a', border: '1px solid #1e293b',
          borderRadius: '16px', padding: '24px', marginBottom: '24px'
        }}>
          <h2 style={{ color: 'white', fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>
            Performance Breakdown
          </h2>
          {[
            { label: 'Accuracy', value: Math.round((result.correct / (result.correct + result.wrong)) * 100), color: '#10b981' },
            { label: 'Completion', value: Math.round(((result.correct + result.wrong) / result.total) * 100), color: '#0ea5e9' },
            { label: 'Score vs Passing', value: result.percentage, color: isPassed ? '#10b981' : '#ef4444' },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>{item.label}</span>
                <span style={{ color: item.color, fontSize: '13px', fontWeight: 700 }}>{item.value}%</span>
              </div>
              <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px' }}>
                <div style={{
                  height: '100%', borderRadius: '4px',
                  background: item.color, width: `${item.value}%`,
                  transition: 'width 1s ease'
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Link href={`/exams/${id}/take`} style={{
            background: '#0ea5e9', color: 'white', fontWeight: 700,
            padding: '14px', borderRadius: '12px', textDecoration: 'none',
            textAlign: 'center', fontSize: '15px', display: 'block'
          }}>
            🔄 Retake Exam
          </Link>
          <Link href="/exams" style={{
            background: '#0f172a', color: '#94a3b8', fontWeight: 700,
            padding: '14px', borderRadius: '12px', textDecoration: 'none',
            textAlign: 'center', fontSize: '15px', display: 'block',
            border: '1px solid #1e293b'
          }}>
            📚 More Exams
          </Link>
          <Link href="/leaderboard" style={{
            background: '#0f172a', color: '#94a3b8', fontWeight: 700,
            padding: '14px', borderRadius: '12px', textDecoration: 'none',
            textAlign: 'center', fontSize: '15px', display: 'block',
            border: '1px solid #1e293b'
          }}>
            🏆 Leaderboard
          </Link>
          <Link href="/dashboard" style={{
            background: '#0f172a', color: '#94a3b8', fontWeight: 700,
            padding: '14px', borderRadius: '12px', textDecoration: 'none',
            textAlign: 'center', fontSize: '15px', display: 'block',
            border: '1px solid #1e293b'
          }}>
            📊 Dashboard
          </Link>
        </div>

      </div>
    </main>
  );
}