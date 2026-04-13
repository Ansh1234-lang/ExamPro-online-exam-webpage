'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const categories = ['All', 'UPSC', 'SSC', 'JEE', 'NEET', 'Banking', 'Railway', 'Defence', 'GATE'];

const difficultyColor: Record<string, string> = {
  Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444',
};
const difficultyBg: Record<string, string> = {
  Easy: 'rgba(16,185,129,0.1)', Medium: 'rgba(245,158,11,0.1)', Hard: 'rgba(239,68,68,0.1)',
};

export default function ExamsPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/exams');
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('✅ Exams fetched:', data);
      setExams(data.exams || []);
    } catch (err: any) {
      console.error('❌ Fetch failed:', err);
      setError(err.message || 'Failed to load exams');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort locally
  const filtered = exams
    .filter((e) => activeCategory === 'All' || e.category?.name === activeCategory)
    .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'popular') return (b.attempts || 0) - (a.attempts || 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  return (
    <main style={{ minHeight: '100vh', background: '#020617', padding: '32px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'white' }}>Browse Exams</h1>
          <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>
            {loading ? 'Loading...' : `${filtered.length} exams available — choose your target and start practicing`}
          </p>
        </div>

        {/* Search + Sort */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input
            type="text" placeholder="🔍  Search exams..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1, minWidth: '200px', background: '#0f172a',
              border: '1px solid #1e293b', borderRadius: '10px',
              padding: '12px 16px', color: 'white', fontSize: '14px',
              outline: 'none', boxSizing: 'border-box'
            }}
          />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: '#0f172a', border: '1px solid #1e293b',
              borderRadius: '10px', padding: '12px 16px',
              color: 'white', fontSize: '14px', outline: 'none', cursor: 'pointer'
            }}>
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '8px 18px', borderRadius: '999px', fontSize: '13px',
              fontWeight: 600, cursor: 'pointer',
              background: activeCategory === cat ? '#0ea5e9' : '#0f172a',
              color: activeCategory === cat ? 'white' : '#64748b',
              border: activeCategory === cat ? 'none' : '1px solid #1e293b',
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
            <div style={{ color: '#64748b', fontSize: '16px' }}>Loading exams...</div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '12px', padding: '24px', textAlign: 'center', marginBottom: '20px'
          }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>⚠️</div>
            <div style={{ color: '#f87171', fontWeight: 600, marginBottom: '8px' }}>Failed to load exams</div>
            <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '16px' }}>{error}</div>
            <button onClick={fetchExams} style={{
              background: '#0ea5e9', color: 'white', fontWeight: 700,
              padding: '10px 24px', borderRadius: '10px', border: 'none', cursor: 'pointer'
            }}>
              🔄 Try Again
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#475569' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>No exams found</div>
            <div style={{ fontSize: '14px', marginTop: '8px' }}>Try a different search or category</div>
            <button onClick={() => { setSearch(''); setActiveCategory('All'); }} style={{
              marginTop: '16px', background: '#0ea5e9', color: 'white',
              fontWeight: 700, padding: '10px 24px', borderRadius: '10px',
              border: 'none', cursor: 'pointer', fontSize: '14px'
            }}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Exam Cards Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {filtered.map((exam: any) => (
              <div key={exam._id} style={{
                background: '#0f172a', border: '1px solid #1e293b',
                borderRadius: '16px', padding: '24px',
                display: 'flex', flexDirection: 'column', gap: '16px'
              }}>
                {/* Top badges */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    background: 'rgba(14,165,233,0.1)', color: '#38bdf8',
                    fontSize: '11px', fontWeight: 600, padding: '4px 10px',
                    borderRadius: '999px', border: '1px solid rgba(14,165,233,0.2)'
                  }}>
                    {exam.category?.name || 'General'}
                  </span>
                  <span style={{
                    background: difficultyBg[exam.difficulty] || difficultyBg['Medium'],
                    color: difficultyColor[exam.difficulty] || difficultyColor['Medium'],
                    fontSize: '11px', fontWeight: 600,
                    padding: '4px 10px', borderRadius: '999px'
                  }}>
                    {exam.difficulty || 'Medium'}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ color: 'white', fontSize: '15px', fontWeight: 700, lineHeight: 1.4 }}>
                  {exam.title}
                </h3>

                {/* Description */}
                {exam.description && (
                  <p style={{
                    color: '#475569', fontSize: '12px', lineHeight: 1.5,
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden'
                  }}>
                    {exam.description}
                  </p>
                )}

                {/* Meta */}
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <span style={{ color: '#94a3b8', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ⏱️ {exam.duration} mins
                  </span>
                  <span style={{ color: '#94a3b8', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    🎯 {exam.totalMarks} marks
                  </span>
                  <span style={{ color: '#94a3b8', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    👥 {(exam.attempts || 0).toLocaleString()} attempts
                  </span>
                </div>

                {/* Topics */}
                {exam.topics?.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {exam.topics.slice(0, 3).map((topic: string) => (
                      <span key={topic} style={{
                        background: '#1e293b', color: '#64748b',
                        fontSize: '10px', padding: '3px 8px', borderRadius: '4px'
                      }}>
                        {topic}
                      </span>
                    ))}
                    {exam.topics.length > 3 && (
                      <span style={{ color: '#475569', fontSize: '10px', padding: '3px' }}>
                        +{exam.topics.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Divider */}
                <div style={{ height: '1px', background: '#1e293b' }} />

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link href={`/exams/${exam._id}`} style={{
                    flex: 1, background: '#0ea5e9', color: 'white',
                    fontWeight: 700, fontSize: '14px', padding: '11px',
                    borderRadius: '10px', textDecoration: 'none',
                    textAlign: 'center', display: 'block'
                  }}>
                    Start Exam
                  </Link>
                  <Link href={`/exams/${exam._id}`} style={{
                    background: '#1e293b', color: '#94a3b8',
                    fontWeight: 600, fontSize: '14px', padding: '11px 16px',
                    borderRadius: '10px', textDecoration: 'none',
                    textAlign: 'center', display: 'block',
                    border: '1px solid #334155'
                  }}>
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}