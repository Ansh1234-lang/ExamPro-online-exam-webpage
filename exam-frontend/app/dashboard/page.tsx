"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import api from "@/lib/api";

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalExams: 0,
    avgScore: 0,
    bestScore: 0,
    passed: 0,
  });
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const [statsRes, historyRes] = await Promise.all([
          api.get(`/users/${user._id}/stats`),
          api.get(`/users/${user._id}/history`),
        ]);
        setStats(statsRes.data.stats);
        setHistory(historyRes.data.submissions);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const statCards = [
    {
      label: "Exams Attempted",
      value: stats.totalExams,
      icon: "📝",
      color: "#38bdf8",
    },
    {
      label: "Average Score",
      value: `${stats.avgScore}%`,
      icon: "📊",
      color: "#10b981",
    },
    {
      label: "Best Score",
      value: `${stats.bestScore}%`,
      icon: "🎯",
      color: "#f59e0b",
    },
    {
      label: "Exams Passed",
      value: stats.passed,
      icon: "✅",
      color: "#6366f1",
    },
  ];

  if (loading)
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#020617",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏳</div>
          <div style={{ color: "#64748b", fontSize: "16px" }}>
            Loading your dashboard...
          </div>
        </div>
      </main>
    );

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        padding: "32px 24px",
      }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "white" }}>
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p style={{ color: "#64748b", marginTop: "4px", fontSize: "14px" }}>
            Here's your exam performance overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "32px",
          }}>
          {statCards.map((s) => (
            <div
              key={s.label}
              style={{
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "16px",
                padding: "24px",
              }}>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>
                {s.icon}
              </div>
              <div
                style={{ fontSize: "28px", fontWeight: 800, color: s.color }}>
                {s.value}
              </div>
              <div
                style={{
                  color: "#64748b",
                  fontSize: "13px",
                  marginTop: "4px",
                }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}>
          {/* Recent Exams */}
          <div
            style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "16px",
              padding: "24px",
            }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "white" }}>
                Recent Exams
              </h2>
              <Link
                href="/exams"
                style={{
                  color: "#38bdf8",
                  fontSize: "13px",
                  textDecoration: "none",
                }}>
                View All →
              </Link>
            </div>

            {history.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>📭</div>
                <div style={{ color: "#475569", fontSize: "14px" }}>
                  No exams attempted yet
                </div>
                <Link
                  href="/exams"
                  style={{
                    display: "inline-block",
                    marginTop: "12px",
                    background: "#0ea5e9",
                    color: "white",
                    padding: "8px 20px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}>
                  Browse Exams →
                </Link>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}>
                {history.slice(0, 5).map((sub: any, i: number) => (
                  <div
                    key={i}
                    style={{
                      background: "#1e293b",
                      borderRadius: "12px",
                      padding: "14px 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          color: "white",
                          fontSize: "13px",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                        {sub.exam?.title || "Exam"}
                      </div>
                      <div
                        style={{
                          color: "#475569",
                          fontSize: "11px",
                          marginTop: "2px",
                        }}>
                        {new Date(sub.submittedAt).toLocaleDateString()}
                      </div>
                      <div
                        style={{
                          height: "4px",
                          background: "#0f172a",
                          borderRadius: "2px",
                          marginTop: "8px",
                        }}>
                        <div
                          style={{
                            height: "100%",
                            borderRadius: "2px",
                            background:
                              sub.percentage >= 60 ? "#10b981" : "#ef4444",
                            width: `${sub.percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: sub.percentage >= 60 ? "#10b981" : "#ef4444",
                        }}>
                        {sub.percentage}%
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          fontWeight: 600,
                          marginTop: "4px",
                          padding: "2px 8px",
                          borderRadius: "999px",
                          background: sub.isPassed
                            ? "rgba(16,185,129,0.1)"
                            : "rgba(239,68,68,0.1)",
                          color: sub.isPassed ? "#10b981" : "#ef4444",
                        }}>
                        {sub.isPassed ? "Pass" : "Fail"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Quick Links */}
            <div
              style={{
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "16px",
                padding: "24px",
              }}>
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "16px",
                }}>
                Quick Actions
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}>
                {[
                  {
                    label: "Browse Exams",
                    icon: "📚",
                    href: "/exams",
                    color: "#0ea5e9",
                  },
                  {
                    label: "Leaderboard",
                    icon: "🏆",
                    href: "/leaderboard",
                    color: "#f59e0b",
                  },
                  {
                    label: "My Profile",
                    icon: "👤",
                    href: "/profile",
                    color: "#10b981",
                  },
                  {
                    label: "My Results",
                    icon: "📈",
                    href: "/profile",
                    color: "#6366f1",
                  },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      background: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                      padding: "16px",
                      textDecoration: "none",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                    }}>
                    <span style={{ fontSize: "24px" }}>{link.icon}</span>
                    <span
                      style={{
                        color: "white",
                        fontSize: "13px",
                        fontWeight: 600,
                      }}>
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div
              style={{
                background: "linear-gradient(135deg, #0369a1, #1e40af)",
                borderRadius: "16px",
                padding: "24px",
              }}>
              <h3
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}>
                Ready for today's mock test?
              </h3>
              <p
                style={{
                  color: "#bae6fd",
                  fontSize: "13px",
                  marginBottom: "16px",
                }}>
                Keep your streak going — attempt a new exam now!
              </p>
              <Link
                href="/exams"
                style={{
                  background: "white",
                  color: "#0369a1",
                  fontWeight: 700,
                  padding: "10px 24px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontSize: "14px",
                  display: "inline-block",
                }}>
                Start Exam →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
