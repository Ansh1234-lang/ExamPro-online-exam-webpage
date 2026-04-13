import Link from 'next/link';

const categories = [
  { icon: '🏛️', name: 'UPSC', count: '120+ Tests' },
  { icon: '📐', name: 'JEE', count: '95+ Tests' },
  { icon: '🏥', name: 'NEET', count: '80+ Tests' },
  { icon: '💼', name: 'SSC', count: '110+ Tests' },
  { icon: '🏦', name: 'Banking', count: '75+ Tests' },
  { icon: '🚂', name: 'Railway', count: '60+ Tests' },
  { icon: '🪖', name: 'Defence', count: '45+ Tests' },
  { icon: '💻', name: 'GATE', count: '55+ Tests' },
];

const stats = [
  { value: '2.4M+', label: 'Students' },
  { value: '850+', label: 'Exams' },
  { value: '10K+', label: 'Questions' },
  { value: '98%', label: 'Satisfaction' },
];

const features = [
  { icon: '⏱️', title: 'Real-time Timer', desc: 'Exam-like countdown timer with auto-submit when time expires.' },
  { icon: '📊', title: 'Instant Results', desc: 'Get your score, rank, and detailed analysis immediately after submission.' },
  { icon: '🏆', title: 'Live Leaderboard', desc: 'Compete with students nationwide and track your rank in real time.' },
  { icon: '📱', title: 'Mobile Friendly', desc: 'Take exams on any device — phone, tablet or desktop.' },
  { icon: '🔍', title: 'Detailed Solutions', desc: 'Every question comes with a full explanation to help you learn.' },
  { icon: '📈', title: 'Progress Tracking', desc: 'Track your improvement over time with visual analytics.' },
];

export default function Home() {
  return (
    <main style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>

      {/* Hero Section */}
      <section style={{ padding: '80px 24px', textAlign: 'center', background: 'linear-gradient(to bottom, rgba(14,165,233,0.08), transparent)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{
            display: 'inline-block', background: 'rgba(14,165,233,0.1)',
            border: '1px solid rgba(14,165,233,0.3)', color: '#38bdf8',
            fontSize: '14px', fontWeight: 500, padding: '6px 16px',
            borderRadius: '999px', marginBottom: '24px'
          }}>
            🚀 India's #1 Competitive Exam Platform
          </span>

          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '24px' }}>
            Master Your{' '}
            <span style={{ color: '#38bdf8' }}>Competitive</span>
            <br />Exams Online
          </h1>

          <p style={{ color: '#94a3b8', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Practice with 10,000+ questions, compete in live mock tests, and track your progress with real-time rankings.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" style={{
              background: '#0ea5e9', color: 'white', fontWeight: 700,
              padding: '14px 32px', borderRadius: '12px', fontSize: '16px',
              textDecoration: 'none', display: 'inline-block'
            }}>
              Start Free Today →
            </Link>
            <Link href="/exams" style={{
              border: '1px solid #475569', color: '#cbd5e1', fontWeight: 600,
              padding: '14px 32px', borderRadius: '12px', fontSize: '16px',
              textDecoration: 'none', display: 'inline-block'
            }}>
              Browse Exams
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '48px 24px', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '32px', textAlign: 'center' }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8' }}>{s.value}</div>
              <div style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, textAlign: 'center', marginBottom: '12px' }}>Exam Categories</h2>
          <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '48px' }}>Choose your target exam and start practicing today</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {categories.map((cat) => (
              <Link href="/exams" key={cat.name} style={{
                background: '#0f172a', border: '1px solid #1e293b',
                borderRadius: '16px', padding: '24px', textAlign: 'center',
                textDecoration: 'none', display: 'block', transition: 'border-color 0.2s'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{cat.icon}</div>
                <div style={{ fontWeight: 700, color: 'white', fontSize: '16px' }}>{cat.name}</div>
                <div style={{ color: '#475569', fontSize: '12px', marginTop: '4px' }}>{cat.count}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', background: 'rgba(15,23,42,0.5)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, textAlign: 'center', marginBottom: '12px' }}>Why Choose ExamPro?</h2>
          <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '48px' }}>Everything you need to crack your exam</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {features.map((f) => (
              <div key={f.title} style={{
                background: '#0f172a', border: '1px solid #1e293b',
                borderRadius: '16px', padding: '24px'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: '16px' }}>Ready to Start Preparing?</h2>
          <p style={{ color: '#64748b', fontSize: '18px', marginBottom: '32px' }}>Join 2.4 million students already using ExamPro</p>
          <Link href="/register" style={{
            background: '#0ea5e9', color: 'white', fontWeight: 700,
            padding: '16px 40px', borderRadius: '12px', fontSize: '18px',
            textDecoration: 'none', display: 'inline-block'
          }}>
            Create Free Account →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1e293b', padding: '32px 24px', textAlign: 'center', color: '#475569', fontSize: '14px' }}>
        © 2024 ExamPro. Built for competitive exam aspirants across India.
      </footer>

    </main>
  );
}