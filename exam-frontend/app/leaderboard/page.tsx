'use client';
import { useState } from 'react';

const tabs = ['Global', 'Weekly', 'Monthly'];

const topThree = [
  { rank: 1, name: 'Priya Kumari', score: 98.5, exams: 42, avatar: 'PK', color: '#f59e0b' },
  { rank: 2, name: 'Arjun Sharma', score: 96.2, exams: 38, avatar: 'AS', color: '#6366f1' },
  { rank: 3, name: 'Nisha Gupta', score: 94.8, exams: 35, avatar: 'NG', color: '#0ea5e9' },
];

const others = [
  { rank: 4, name: 'Rohit Verma', score: 93.1, exams: 31, avatar: 'RV', color: '#10b981' },
  { rank: 5, name: 'Sneha Patel', score: 91.7, exams: 29, avatar: 'SP', color: '#ef4444' },
  { rank: 6, name: 'Amit Singh', score: 90.4, exams: 27, avatar: 'AS', color: '#8b5cf6' },
  { rank: 7, name: 'Kavya Reddy', score: 89.2, exams: 25, avatar: 'KR', color: '#f97316' },
  { rank: 8, name: 'Vikram Nair', score: 88.0, exams: 24, avatar: 'VN', color: '#06b6d4' },
  { rank: 9, name: 'Ananya Das', score: 86.5, exams: 22, avatar: 'AD', color: '#ec4899' },
  { rank: 10, name: 'Suresh Kumar', score: 85.3, exams: 21, avatar: 'SK', color: '#84cc16' },
  // You
  { rank: 142, name: 'You (Rahul V.)', score: 78.0, exams: 24, avatar: 'RV', color: '#38bdf8', isYou: true },
];

const medalColors: Record<number, string> = {
  1: '#f59e0b',
  2: '#94a3b8',
  3: '#cd7c2f',
};

const medals: Record<number, string> = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
};

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('Global');
  const [search, setSearch] = useState('');

  const filteredOthers = others.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main style={{ minHeight: '100vh', background: '#020617', padding: '32px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'white' }}>
            🏆 Leaderboard
          </h1>
          <p style={{ color: '#64748b', marginTop: '8px', fontSize: '14px' }}>
            Top performers across all competitive exams
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: '8px', justifyContent: 'center',
          marginBottom: '36px'
        }}>
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '10px 28px', borderRadius: '999px',
              fontWeight: 600, fontSize: '14px', cursor: 'pointer',
              border: 'none', transition: 'all 0.2s',
              background: activeTab === tab ? '#0ea5e9' : '#0f172a',
              color: activeTab === tab ? 'white' : '#64748b',
              outline: activeTab !== tab ? '1px solid #1e293b' : 'none'
            }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '12px', marginBottom: '32px', alignItems: 'flex-end'
        }}>
          {/* 2nd Place */}
          <div style={{
            background: '#0f172a', border: '1px solid #1e293b',
            borderRadius: '16px', padding: '20px 16px',
            textAlign: 'center', paddingTop: '24px'
          }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: topThree[1].color, margin: '0 auto 10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', fontWeight: 700, color: 'white'
            }}>
              {topThree[1].avatar}
            </div>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>🥈</div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>{topThree[1].name}</div>
            <div style={{ color: '#94a3b8', fontSize: '20px', fontWeight: 800, marginTop: '6px' }}>
              {topThree[1].score}%
            </div>
            <div style={{ color: '#475569', fontSize: '11px', marginTop: '2px' }}>{topThree[1].exams} exams</div>
          </div>

          {/* 1st Place — Taller */}
          <div style={{
            background: 'linear-gradient(135deg, #1c1207, #0f172a)',
            border: '1px solid #f59e0b44',
            borderRadius: '16px', padding: '20px 16px',
            textAlign: 'center', paddingTop: '32px'
          }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>👑</div>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: topThree[0].color, margin: '0 auto 10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px', fontWeight: 700, color: 'white',
              border: '3px solid #f59e0b'
            }}>
              {topThree[0].avatar}
            </div>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>🥇</div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>{topThree[0].name}</div>
            <div style={{ color: '#f59e0b', fontSize: '22px', fontWeight: 800, marginTop: '6px' }}>
              {topThree[0].score}%
            </div>
            <div style={{ color: '#475569', fontSize: '11px', marginTop: '2px' }}>{topThree[0].exams} exams</div>
          </div>

          {/* 3rd Place */}
          <div style={{
            background: '#0f172a', border: '1px solid #1e293b',
            borderRadius: '16px', padding: '20px 16px',
            textAlign: 'center', paddingTop: '24px'
          }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: topThree[2].color, margin: '0 auto 10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', fontWeight: 700, color: 'white'
            }}>
              {topThree[2].avatar}
            </div>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>🥉</div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>{topThree[2].name}</div>
            <div style={{ color: '#94a3b8', fontSize: '20px', fontWeight: 800, marginTop: '6px' }}>
              {topThree[2].score}%
            </div>
            <div style={{ color: '#475569', fontSize: '11px', marginTop: '2px' }}>{topThree[2].exams} exams</div>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍  Search a student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', background: '#0f172a', border: '1px solid #1e293b',
            borderRadius: '10px', padding: '12px 16px', color: 'white',
            fontSize: '14px', outline: 'none', boxSizing: 'border-box',
            marginBottom: '16px'
          }}
        />

        {/* Rankings Table */}
        <div style={{
          background: '#0f172a', border: '1px solid #1e293b',
          borderRadius: '16px', overflow: 'hidden'
        }}>

          {/* Table Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '48px 1fr 80px 80px',
            padding: '12px 20px', borderBottom: '1px solid #1e293b',
            background: '#0a0f1a'
          }}>
            <span style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Rank</span>
            <span style={{ color: '#475569', fontSize: '12px', fontWeight: 600 }}>Student</span>
            <span style={{ color: '#475569', fontSize: '12px', fontWeight: 600, textAlign: 'center' }}>Score</span>
            <span style={{ color: '#475569', fontSize: '12px', fontWeight: 600, textAlign: 'center' }}>Exams</span>
          </div>

          {/* Rows */}
          {filteredOthers.map((user, index) => (
            <div key={user.rank}>
              {/* Separator before "You" row */}
              {(user as any).isYou && (
                <div style={{
                  padding: '6px 20px', background: '#0a0f1a',
                  borderTop: '1px dashed #1e293b', borderBottom: '1px dashed #1e293b'
                }}>
                  <span style={{ color: '#475569', fontSize: '11px' }}>· · · your position · · ·</span>
                </div>
              )}
              <div style={{
                display: 'grid', gridTemplateColumns: '48px 1fr 80px 80px',
                padding: '14px 20px', alignItems: 'center',
                borderBottom: index < filteredOthers.length - 1 ? '1px solid #1e293b' : 'none',
                background: (user as any).isYou ? 'rgba(14,165,233,0.06)' : 'transparent'
              }}>

                {/* Rank */}
                <div style={{
                  fontSize: '13px', fontWeight: 700,
                  color: medalColors[user.rank] || '#475569'
                }}>
                  {medals[user.rank] || `#${user.rank}`}
                </div>

                {/* Name + Avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '50%',
                    background: user.color, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 700, color: 'white',
                    border: (user as any).isYou ? '2px solid #0ea5e9' : 'none'
                  }}>
                    {user.avatar}
                  </div>
                  <span style={{
                    color: (user as any).isYou ? '#38bdf8' : 'white',
                    fontSize: '14px', fontWeight: (user as any).isYou ? 700 : 500
                  }}>
                    {user.name}
                  </span>
                  {(user as any).isYou && (
                    <span style={{
                      background: 'rgba(14,165,233,0.15)', color: '#38bdf8',
                      fontSize: '10px', fontWeight: 700, padding: '2px 8px',
                      borderRadius: '999px', border: '1px solid rgba(14,165,233,0.3)'
                    }}>
                      YOU
                    </span>
                  )}
                </div>

                {/* Score */}
                <div style={{ textAlign: 'center' }}>
                  <span style={{
                    color: user.score >= 90 ? '#10b981' : user.score >= 75 ? '#f59e0b' : '#94a3b8',
                    fontSize: '14px', fontWeight: 700
                  }}>
                    {user.score}%
                  </span>
                </div>

                {/* Exams */}
                <div style={{
                  textAlign: 'center', color: '#64748b',
                  fontSize: '13px', fontWeight: 500
                }}>
                  {user.exams}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Your Rank CTA */}
        <div style={{
          marginTop: '24px', background: '#0f172a',
          border: '1px solid #1e293b', borderRadius: '16px',
          padding: '20px 24px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px'
        }}>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>
              Your current rank is <span style={{ color: '#38bdf8' }}>#142</span>
            </div>
            <div style={{ color: '#475569', fontSize: '13px', marginTop: '2px' }}>
              Attempt more exams to climb up the leaderboard!
            </div>
          </div>
          <a href="/exams" style={{
            background: '#0ea5e9', color: 'white', fontWeight: 700,
            padding: '10px 24px', borderRadius: '10px',
            textDecoration: 'none', fontSize: '14px'
          }}>
            Improve Rank →
          </a>
        </div>

      </div>
    </main>
  );
}