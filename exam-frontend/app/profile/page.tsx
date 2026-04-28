"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import api from "@/lib/api";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    targetExam: "",
    city: "",
  });

  useEffect(() => {
    if (!user) return;
    setForm({
      name: user.name || "",
      email: user.email || "",
      phone: "",
      targetExam: "",
      city: "",
    });
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [statsRes, historyRes] = await Promise.all([
        api.get(`/users/${user?._id}/stats`),
        api.get(`/users/${user?._id}/history`),
      ]);
      setStats(statsRes.data.stats);
      setHistory(historyRes.data.submissions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/users/profile", {
        name: form.name,
        phone: form.phone,
        city: form.city,
        targetExam: form.targetExam,
      });
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const tabs = ["Overview", "History", "Badges"];

  const badges = [
    {
      icon: "🔥",
      label: "Week Streak",
      desc: "7 days in a row",
      earned: (stats?.totalExams || 0) >= 7,
    },
    {
      icon: "⚡",
      label: "Speed Runner",
      desc: "Finished in half the time",
      earned: false,
    },
    {
      icon: "🎯",
      label: "Sharpshooter",
      desc: "100% accuracy in a test",
      earned: (stats?.bestScore || 0) === 100,
    },
    {
      icon: "🏆",
      label: "Top 100",
      desc: "Reached global top 100",
      earned: false,
    },
    {
      icon: "📚",
      label: "Scholar",
      desc: "Completed 50 exams",
      earned: (stats?.totalExams || 0) >= 50,
    },
    {
      icon: "💎",
      label: "Diamond",
      desc: "Score 95%+ five times",
      earned: false,
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
          <div style={{ color: "#64748b" }}>Loading profile...</div>
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
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Saved Toast */}
        {saved && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              zIndex: 100,
              background: "#10b981",
              color: "white",
              padding: "12px 20px",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "14px",
            }}>
            ✅ Profile saved successfully!
          </div>
        )}

        {/* Profile Header */}
        <div
          style={{
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "20px",
            padding: "32px",
            marginBottom: "24px",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
            }}>
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                fontWeight: 800,
                color: "white",
                flexShrink: 0,
              }}>
              {user?.name
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}>
                <h1
                  style={{ fontSize: "22px", fontWeight: 800, color: "white" }}>
                  {user?.name}
                </h1>
                <span
                  style={{
                    background: "rgba(14,165,233,0.1)",
                    color: "#38bdf8",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: "999px",
                    border: "1px solid rgba(14,165,233,0.2)",
                  }}>
                  {user?.role === "admin" ? "⚙️ Admin" : "🎓 Member"}
                </span>
              </div>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "14px",
                  marginTop: "4px",
                }}>
                {user?.email}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  marginTop: "8px",
                  flexWrap: "wrap",
                }}>
                <span style={{ color: "#475569", fontSize: "13px" }}>
                  📝 {stats?.totalExams || 0} Exams
                </span>
                <span style={{ color: "#475569", fontSize: "13px" }}>
                  ✅ {stats?.passed || 0} Passed
                </span>
                <span style={{ color: "#475569", fontSize: "13px" }}>
                  🎯 Best: {stats?.bestScore || 0}%
                </span>
              </div>
            </div>
            <button
              onClick={() => (editing ? handleSave() : setEditing(true))}
              style={{
                background: editing ? "#10b981" : "#1e293b",
                border: "1px solid #334155",
                color: "white",
                padding: "10px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "14px",
              }}>
              {saving
                ? "⏳ Saving..."
                : editing
                  ? "✅ Save Profile"
                  : "✏️ Edit Profile"}
            </button>
          </div>

          {/* Edit Form */}
          {editing && (
            <div
              style={{
                marginTop: "24px",
                paddingTop: "24px",
                borderTop: "1px solid #1e293b",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
              }}>
              {[
                { label: "Full Name", name: "name", type: "text" },
                { label: "Phone", name: "phone", type: "text" },
                { label: "Target Exam", name: "targetExam", type: "text" },
                { label: "City", name: "city", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    style={{
                      display: "block",
                      color: "#64748b",
                      fontSize: "12px",
                      marginBottom: "6px",
                    }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={form[field.name as keyof typeof form]}
                    onChange={(e) =>
                      setForm({ ...form, [field.name]: e.target.value })
                    }
                    style={{
                      width: "100%",
                      background: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      color: "white",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "14px",
            marginBottom: "24px",
          }}>
          {[
            {
              label: "Exams Taken",
              value: stats?.totalExams || 0,
              icon: "📝",
              color: "#38bdf8",
            },
            {
              label: "Best Score",
              value: `${stats?.bestScore || 0}%`,
              icon: "🎯",
              color: "#10b981",
            },
            {
              label: "Avg Score",
              value: `${stats?.avgScore || 0}%`,
              icon: "📊",
              color: "#f59e0b",
            },
            {
              label: "Passed",
              value: stats?.passed || 0,
              icon: "✅",
              color: "#6366f1",
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "14px",
                padding: "20px",
                textAlign: "center",
              }}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>
                {s.icon}
              </div>
              <div
                style={{ fontSize: "24px", fontWeight: 800, color: s.color }}>
                {s.value}
              </div>
              <div
                style={{
                  color: "#475569",
                  fontSize: "12px",
                  marginTop: "4px",
                }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "9px 22px",
                borderRadius: "999px",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
                border: "none",
                background: activeTab === tab ? "#0ea5e9" : "#0f172a",
                color: activeTab === tab ? "white" : "#64748b",
                outline: activeTab !== tab ? "1px solid #1e293b" : "none",
              }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "Overview" && (
          <div
            style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "16px",
              padding: "24px",
            }}>
            <h2
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "15px",
                marginBottom: "18px",
              }}>
              📈 Performance Summary
            </h2>
            {[
              {
                label: "Pass Rate",
                value:
                  stats?.totalExams > 0
                    ? Math.round((stats.passed / stats.totalExams) * 100)
                    : 0,
                color: "#10b981",
              },
              {
                label: "Average Score",
                value: stats?.avgScore || 0,
                color: "#38bdf8",
              },
              {
                label: "Best Score",
                value: stats?.bestScore || 0,
                color: "#f59e0b",
              },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}>
                  <span style={{ color: "#94a3b8", fontSize: "13px" }}>
                    {item.label}
                  </span>
                  <span
                    style={{
                      color: item.color,
                      fontSize: "13px",
                      fontWeight: 700,
                    }}>
                    {item.value}%
                  </span>
                </div>
                <div
                  style={{
                    height: "8px",
                    background: "#1e293b",
                    borderRadius: "4px",
                  }}>
                  <div
                    style={{
                      height: "100%",
                      borderRadius: "4px",
                      background: item.color,
                      width: `${item.value}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* History Tab */}
        {activeTab === "History" && (
          <div
            style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "16px",
              overflow: "hidden",
            }}>
            {history.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "48px",
                  color: "#475569",
                }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>📭</div>
                <div>No exam history yet</div>
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 80px 100px 70px",
                    padding: "12px 20px",
                    background: "#0a0f1a",
                    borderBottom: "1px solid #1e293b",
                  }}>
                  {["Exam Name", "Score", "Date", "Status"].map((h) => (
                    <span
                      key={h}
                      style={{
                        color: "#475569",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}>
                      {h}
                    </span>
                  ))}
                </div>
                {history.map((sub: any, i: number) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 80px 100px 70px",
                      padding: "14px 20px",
                      alignItems: "center",
                      borderBottom:
                        i < history.length - 1 ? "1px solid #1e293b" : "none",
                    }}>
                    <span
                      style={{
                        color: "white",
                        fontSize: "13px",
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                      {sub.exam?.title || "Exam"}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: sub.percentage >= 60 ? "#10b981" : "#ef4444",
                      }}>
                      {sub.percentage}%
                    </span>
                    <span style={{ color: "#475569", fontSize: "12px" }}>
                      {new Date(sub.submittedAt).toLocaleDateString()}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "999px",
                        display: "inline-block",
                        textAlign: "center",
                        background: sub.isPassed
                          ? "rgba(16,185,129,0.1)"
                          : "rgba(239,68,68,0.1)",
                        color: sub.isPassed ? "#10b981" : "#ef4444",
                      }}>
                      {sub.isPassed ? "Pass" : "Fail"}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === "Badges" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "16px",
            }}>
            {badges.map((badge) => (
              <div
                key={badge.label}
                style={{
                  background: "#0f172a",
                  border: `1px solid ${badge.earned ? "#f59e0b44" : "#1e293b"}`,
                  borderRadius: "14px",
                  padding: "20px",
                  textAlign: "center",
                  opacity: badge.earned ? 1 : 0.45,
                }}>
                <div style={{ fontSize: "36px", marginBottom: "10px" }}>
                  {badge.earned ? badge.icon : "🔒"}
                </div>
                <div
                  style={{
                    color: badge.earned ? "#f59e0b" : "#475569",
                    fontWeight: 700,
                    fontSize: "14px",
                    marginBottom: "4px",
                  }}>
                  {badge.label}
                </div>
                <div style={{ color: "#475569", fontSize: "12px" }}>
                  {badge.desc}
                </div>
                {badge.earned && (
                  <div
                    style={{
                      marginTop: "10px",
                      background: "rgba(245,158,11,0.1)",
                      color: "#f59e0b",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: "999px",
                      display: "inline-block",
                    }}>
                    ✓ Earned
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Account Settings */}
        <div
          style={{
            marginTop: "28px",
            background: "#0f172a",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "16px",
            padding: "24px",
          }}>
          <h2
            style={{
              color: "#ef4444",
              fontWeight: 700,
              fontSize: "15px",
              marginBottom: "16px",
            }}>
            ⚠️ Account Settings
          </h2>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={logout}
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#ef4444",
                padding: "10px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "13px",
              }}>
              🚪 Logout
            </button>
            <button
              style={{
                background: "#1e293b",
                border: "1px solid #334155",
                color: "#94a3b8",
                padding: "10px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "13px",
              }}>
              🔑 Change Password
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
