'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: '100vh', background: '#020617',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '24px'
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '28px' }}>⚡</span>
            <span style={{ fontSize: '24px', fontWeight: 800, color: 'white', marginLeft: '8px' }}>
              Exam<span style={{ color: '#38bdf8' }}>Pro</span>
            </span>
          </Link>
          <p style={{ color: '#64748b', marginTop: '8px', fontSize: '14px' }}>
            Welcome back! Login to continue.
          </p>
        </div>

        <div style={{
          background: '#0f172a', border: '1px solid #1e293b',
          borderRadius: '20px', padding: '36px'
        }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '24px' }}>
            Login to your account
          </h1>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              color: '#f87171', borderRadius: '10px', padding: '12px 16px',
              fontSize: '14px', marginBottom: '20px'
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                Email Address
              </label>
              <input
                type="email" name="email"
                placeholder="you@example.com"
                value={form.email} onChange={handleChange}
                style={{
                  width: '100%', background: '#1e293b', border: '1px solid #334155',
                  borderRadius: '10px', padding: '12px 16px', color: 'white',
                  fontSize: '15px', outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password} onChange={handleChange}
                  style={{
                    width: '100%', background: '#1e293b', border: '1px solid #334155',
                    borderRadius: '10px', padding: '12px 48px 12px 16px', color: 'white',
                    fontSize: '15px', outline: 'none', boxSizing: 'border-box'
                  }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '14px', top: '50%',
                    transform: 'translateY(-50%)', background: 'none',
                    border: 'none', cursor: 'pointer', fontSize: '18px'
                  }}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'right', marginBottom: '24px' }}>
              <Link href="/forgot-password" style={{ color: '#38bdf8', fontSize: '13px', textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', background: loading ? '#0369a1' : '#0ea5e9',
              color: 'white', fontWeight: 700, fontSize: '16px',
              padding: '14px', borderRadius: '12px', border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}>
              {loading ? '⏳ Logging in...' : 'Login →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px', marginTop: '24px' }}>
          Don't have an account?{' '}
          <Link href="/register" style={{ color: '#38bdf8', fontWeight: 600, textDecoration: 'none' }}>
            Create one free →
          </Link>
        </p>

      </div>
    </main>
  );
}