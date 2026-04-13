'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStrength = (p: string) => {
    if (p.length === 0) return { label: '', color: '', width: '0%' };
    if (p.length < 4) return { label: 'Weak', color: '#ef4444', width: '25%' };
    if (p.length < 6) return { label: 'Fair', color: '#f59e0b', width: '50%' };
    if (p.length < 10) return { label: 'Good', color: '#38bdf8', width: '75%' };
    return { label: 'Strong', color: '#10b981', width: '100%' };
  };
  const strength = getStrength(form.password);

  const inputStyle = {
    width: '100%', background: '#1e293b', border: '1px solid #334155',
    borderRadius: '10px', padding: '12px 16px', color: 'white',
    fontSize: '15px', outline: 'none', boxSizing: 'border-box' as const
  };

  return (
    <main style={{
      minHeight: '100vh', background: '#020617',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '24px'
    }}>
      <div style={{ width: '100%', maxWidth: '460px' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '28px' }}>⚡</span>
            <span style={{ fontSize: '24px', fontWeight: 800, color: 'white', marginLeft: '8px' }}>
              Exam<span style={{ color: '#38bdf8' }}>Pro</span>
            </span>
          </Link>
          <p style={{ color: '#64748b', marginTop: '8px', fontSize: '14px' }}>
            Create your free account and start preparing!
          </p>
        </div>

        <div style={{
          background: '#0f172a', border: '1px solid #1e293b',
          borderRadius: '20px', padding: '36px'
        }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '24px' }}>
            Create your account
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
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Full Name</label>
              <input type="text" name="name" placeholder="Rahul Sharma"
                value={form.name} onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Email Address</label>
              <input type="email" name="email" placeholder="you@example.com"
                value={form.email} onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password" placeholder="Min. 6 characters"
                  value={form.password} onChange={handleChange}
                  style={{ ...inputStyle, paddingRight: '48px' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {form.password.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ height: '4px', background: '#1e293b', borderRadius: '2px', marginBottom: '4px' }}>
                  <div style={{ height: '100%', borderRadius: '2px', background: strength.color, width: strength.width, transition: 'width 0.3s' }} />
                </div>
                <span style={{ fontSize: '12px', color: strength.color }}>{strength.label} password</span>
              </div>
            )}

            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Confirm Password</label>
              <input type="password" name="confirm" placeholder="Re-enter your password"
                value={form.confirm} onChange={handleChange}
                style={{ ...inputStyle, borderColor: form.confirm && form.confirm !== form.password ? '#ef4444' : '#334155' }}
              />
              {form.confirm && form.confirm !== form.password && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>Passwords do not match</p>
              )}
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', background: loading ? '#0369a1' : '#0ea5e9',
              color: 'white', fontWeight: 700, fontSize: '16px',
              padding: '14px', borderRadius: '12px', border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}>
              {loading ? '⏳ Creating account...' : 'Create Free Account →'}
            </button>

            <p style={{ color: '#475569', fontSize: '12px', textAlign: 'center', marginTop: '16px' }}>
              By registering, you agree to our{' '}
              <Link href="/terms" style={{ color: '#38bdf8', textDecoration: 'none' }}>Terms</Link>
              {' '}&{' '}
              <Link href="/privacy" style={{ color: '#38bdf8', textDecoration: 'none' }}>Privacy Policy</Link>
            </p>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px', marginTop: '24px' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#38bdf8', fontWeight: 600, textDecoration: 'none' }}>
            Login here →
          </Link>
        </p>

      </div>
    </main>
  );
}