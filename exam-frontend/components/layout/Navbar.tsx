'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      background: '#0f172a', borderBottom: '1px solid #1e293b',
      position: 'sticky', top: 0, zIndex: 50
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px' }}>⚡</span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: 'white' }}>
              Exam<span style={{ color: '#38bdf8' }}>Pro</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <Link href="/exams" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Exams</Link>
            <Link href="/leaderboard" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Leaderboard</Link>
            {user && (
              <Link href="/dashboard" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Dashboard</Link>
            )}
            {user?.role === 'admin' && (
              <Link href="/admin" style={{ color: '#f59e0b', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>⚙️ Admin</Link>
            )}
          </div>

          {/* Auth Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {user ? (
              <>
                <Link href="/profile" style={{
                  display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none'
                }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '50%',
                    background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: '12px'
                  }}>
                    {user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>{user.name?.split(' ')[0]}</span>
                </Link>
                <button onClick={logout} style={{
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                  color: '#ef4444', padding: '7px 14px', borderRadius: '8px',
                  cursor: 'pointer', fontSize: '13px', fontWeight: 600
                }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" style={{
                  color: '#94a3b8', textDecoration: 'none',
                  fontSize: '14px', fontWeight: 500, padding: '8px 14px',
                  borderRadius: '8px'
                }}>
                  Login
                </Link>
                <Link href="/register" style={{
                  background: '#0ea5e9', color: 'white',
                  textDecoration: 'none', fontSize: '14px', fontWeight: 700,
                  padding: '8px 18px', borderRadius: '8px'
                }}>
                  Get Started
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}