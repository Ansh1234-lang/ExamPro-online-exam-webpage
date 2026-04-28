"use client";
import { useState } from "react";
import Link from "next/link";

const stats = [
  {
    label: "Total Users",
    value: "24,521",
    icon: "👥",
    color: "#38bdf8",
    change: "+12%",
  },
  {
    label: "Total Exams",
    value: "856",
    icon: "📝",
    color: "#10b981",
    change: "+5%",
  },
  {
    label: "Submissions Today",
    value: "1,243",
    icon: "📊",
    color: "#f59e0b",
    change: "+8%",
  },
  {
    label: "Revenue",
    value: "₹84,200",
    icon: "💰",
    color: "#6366f1",
    change: "+18%",
  },
];

const recentUsers = [
  {
    name: "Priya Kumari",
    email: "priya@example.com",
    joined: "Apr 12",
    exams: 12,
    status: "Active",
  },
  {
    name: "Arjun Sharma",
    email: "arjun@example.com",
    joined: "Apr 11",
    exams: 8,
    status: "Active",
  },
  {
    name: "Nisha Gupta",
    email: "nisha@example.com",
    joined: "Apr 10",
    exams: 5,
    status: "Inactive",
  },
  {
    name: "Rohit Verma",
    email: "rohit@example.com",
    joined: "Apr 9",
    exams: 15,
    status: "Active",
  },
  {
    name: "Sneha Patel",
    email: "sneha@example.com",
    joined: "Apr 8",
    exams: 3,
    status: "Banned",
  },
];

const recentExams = [
  {
    title: "SSC CGL Mock #4",
    category: "SSC",
    questions: 100,
    status: "Published",
    attempts: 1240,
  },
  {
    title: "UPSC GS Paper 2",
    category: "UPSC",
    questions: 80,
    status: "Draft",
    attempts: 0,
  },
  {
    title: "JEE Advanced Math",
    category: "JEE",
    questions: 54,
    status: "Published",
    attempts: 890,
  },
  {
    title: "NEET Chemistry",
    category: "NEET",
    questions: 45,
    status: "Draft",
    attempts: 0,
  },
  {
    title: "Banking Awareness",
    category: "Banking",
    questions: 50,
    status: "Published",
    attempts: 2100,
  },
];

const sidebarItems = [
  { icon: "📊", label: "Dashboard", tab: "dashboard" },
  { icon: "👥", label: "Users", tab: "users" },
  { icon: "📝", label: "Exams", tab: "exams" },
  { icon: "❓", label: "Questions", tab: "questions" },
  { icon: "📈", label: "Analytics", tab: "analytics" },
  { icon: "⚙️", label: "Settings", tab: "settings" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchUser, setSearchUser] = useState("");
  const [newExam, setNewExam] = useState({
    title: "",
    category: "SSC",
    duration: "",
    questions: "",
  });
  const [showCreateExam, setShowCreateExam] = useState(false);
  const [notification, setNotification] = useState("");

  const showNotif = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const filteredUsers = recentUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.email.toLowerCase().includes(searchUser.toLowerCase()),
  );

  const statusColor: Record<string, string> = {
    Active: "#10b981",
    Inactive: "#f59e0b",
    Banned: "#ef4444",
    Published: "#10b981",
    Draft: "#f59e0b",
  };
  const statusBg: Record<string, string> = {
    Active: "rgba(16,185,129,0.1)",
    Inactive: "rgba(245,158,11,0.1)",
    Banned: "rgba(239,68,68,0.1)",
    Published: "rgba(16,185,129,0.1)",
    Draft: "rgba(245,158,11,0.1)",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#020617" }}>
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? "220px" : "64px",
          minWidth: sidebarOpen ? "220px" : "64px",
          background: "#0f172a",
          borderRight: "1px solid #1e293b",
          transition: "width 0.2s",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}>
        {/* Sidebar Header */}
        <div
          style={{
            padding: "18px 16px",
            borderBottom: "1px solid #1e293b",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}>
          {sidebarOpen && (
            <span
              style={{
                color: "white",
                fontWeight: 800,
                fontSize: "15px",
                whiteSpace: "nowrap",
              }}>
              ⚡ Admin Panel
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "#1e293b",
              border: "none",
              color: "#64748b",
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>

        {/* Nav Items */}
        <div style={{ padding: "12px 8px", flex: 1 }}>
          {sidebarItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 10px",
                borderRadius: "8px",
                cursor: "pointer",
                border: "none",
                marginBottom: "4px",
                background:
                  activeTab === item.tab
                    ? "rgba(14,165,233,0.1)"
                    : "transparent",
                borderLeft:
                  activeTab === item.tab
                    ? "2px solid #0ea5e9"
                    : "2px solid transparent",
                transition: "all 0.15s",
              }}>
              <span style={{ fontSize: "16px", flexShrink: 0 }}>
                {item.icon}
              </span>
              {sidebarOpen && (
                <span
                  style={{
                    color: activeTab === item.tab ? "#38bdf8" : "#64748b",
                    fontSize: "13px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}>
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <div style={{ padding: "16px", borderTop: "1px solid #1e293b" }}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#475569",
                fontSize: "13px",
                textDecoration: "none",
              }}>
              ← Back to Site
            </Link>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}>
        {/* Top Bar */}
        <div
          style={{
            background: "#0f172a",
            borderBottom: "1px solid #1e293b",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}>
          <div>
            <h1
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "16px",
                textTransform: "capitalize",
              }}>
              {activeTab}
            </h1>
            <p style={{ color: "#475569", fontSize: "12px" }}>
              ExamPro Admin Panel
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                background: "#1e293b",
                borderRadius: "8px",
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
              <span style={{ fontSize: "14px" }}>🔔</span>
              <span
                style={{
                  background: "#ef4444",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "1px 6px",
                  borderRadius: "999px",
                }}>
                3
              </span>
            </div>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: "linear-gradient(135deg,#0ea5e9,#6366f1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: "12px",
              }}>
              AD
            </div>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
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
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}>
            ✅ {notification}
          </div>
        )}

        {/* Content Area */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {/* ── DASHBOARD TAB ── */}
          {activeTab === "dashboard" && (
            <div>
              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "16px",
                  marginBottom: "24px",
                }}>
                {stats.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "14px",
                      padding: "20px",
                    }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "12px",
                      }}>
                      <span style={{ fontSize: "24px" }}>{s.icon}</span>
                      <span
                        style={{
                          background: "rgba(16,185,129,0.1)",
                          color: "#10b981",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "999px",
                        }}>
                        {s.change}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "26px",
                        fontWeight: 800,
                        color: s.color,
                      }}>
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

              {/* Recent Tables */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "20px",
                }}>
                {/* Recent Users */}
                <div
                  style={{
                    background: "#0f172a",
                    border: "1px solid #1e293b",
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}>
                  <div
                    style={{
                      padding: "16px 20px",
                      borderBottom: "1px solid #1e293b",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <h2
                      style={{
                        color: "white",
                        fontWeight: 700,
                        fontSize: "14px",
                      }}>
                      Recent Users
                    </h2>
                    <button
                      onClick={() => setActiveTab("users")}
                      style={{
                        color: "#38bdf8",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}>
                      View All →
                    </button>
                  </div>
                  {recentUsers.slice(0, 4).map((u, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "12px 20px",
                        borderBottom: i < 3 ? "1px solid #1e293b" : "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}>
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "#0ea5e9",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "white",
                        }}>
                        {u.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            color: "white",
                            fontSize: "13px",
                            fontWeight: 600,
                          }}>
                          {u.name}
                        </div>
                        <div style={{ color: "#475569", fontSize: "11px" }}>
                          {u.email}
                        </div>
                      </div>
                      <span
                        style={{
                          background: statusBg[u.status],
                          color: statusColor[u.status],
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "999px",
                        }}>
                        {u.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Recent Exams */}
                <div
                  style={{
                    background: "#0f172a",
                    border: "1px solid #1e293b",
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}>
                  <div
                    style={{
                      padding: "16px 20px",
                      borderBottom: "1px solid #1e293b",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <h2
                      style={{
                        color: "white",
                        fontWeight: 700,
                        fontSize: "14px",
                      }}>
                      Recent Exams
                    </h2>
                    <button
                      onClick={() => setActiveTab("exams")}
                      style={{
                        color: "#38bdf8",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}>
                      View All →
                    </button>
                  </div>
                  {recentExams.slice(0, 4).map((e, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "12px 20px",
                        borderBottom: i < 3 ? "1px solid #1e293b" : "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            color: "white",
                            fontSize: "13px",
                            fontWeight: 600,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}>
                          {e.title}
                        </div>
                        <div style={{ color: "#475569", fontSize: "11px" }}>
                          {e.category} · {e.questions} Qs · {e.attempts}{" "}
                          attempts
                        </div>
                      </div>
                      <span
                        style={{
                          background: statusBg[e.status],
                          color: statusColor[e.status],
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "999px",
                        }}>
                        {e.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── USERS TAB ── */}
          {activeTab === "users" && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}>
                <input
                  placeholder="🔍 Search users..."
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  style={{
                    background: "#0f172a",
                    border: "1px solid #1e293b",
                    borderRadius: "10px",
                    padding: "10px 16px",
                    color: "white",
                    fontSize: "14px",
                    outline: "none",
                    width: "280px",
                  }}
                />
                <button
                  onClick={() => showNotif("User invitation sent!")}
                  style={{
                    background: "#0ea5e9",
                    color: "white",
                    fontWeight: 700,
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}>
                  + Invite User
                </button>
              </div>

              <div
                style={{
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "16px",
                  overflow: "hidden",
                }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 80px 60px 80px 100px",
                    padding: "12px 20px",
                    background: "#0a0f1a",
                    borderBottom: "1px solid #1e293b",
                  }}>
                  {[
                    "Name",
                    "Email",
                    "Joined",
                    "Exams",
                    "Status",
                    "Actions",
                  ].map((h) => (
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
                {filteredUsers.map((u, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 80px 60px 80px 100px",
                      padding: "14px 20px",
                      alignItems: "center",
                      borderBottom:
                        i < filteredUsers.length - 1
                          ? "1px solid #1e293b"
                          : "none",
                    }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}>
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: "#6366f1",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "white",
                        }}>
                        {u.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span
                        style={{
                          color: "white",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}>
                        {u.name}
                      </span>
                    </div>
                    <span style={{ color: "#64748b", fontSize: "12px" }}>
                      {u.email}
                    </span>
                    <span style={{ color: "#475569", fontSize: "12px" }}>
                      {u.joined}
                    </span>
                    <span
                      style={{
                        color: "#94a3b8",
                        fontSize: "13px",
                        fontWeight: 600,
                      }}>
                      {u.exams}
                    </span>
                    <span
                      style={{
                        background: statusBg[u.status],
                        color: statusColor[u.status],
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "999px",
                        display: "inline-block",
                      }}>
                      {u.status}
                    </span>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        onClick={() => showNotif(`${u.name} updated!`)}
                        style={{
                          background: "#1e293b",
                          border: "none",
                          color: "#94a3b8",
                          padding: "5px 8px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}>
                        ✏️
                      </button>
                      <button
                        onClick={() => showNotif(`${u.name} banned!`)}
                        style={{
                          background: "rgba(239,68,68,0.1)",
                          border: "none",
                          color: "#ef4444",
                          padding: "5px 8px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}>
                        🚫
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── EXAMS TAB ── */}
          {activeTab === "exams" && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}>
                <h2
                  style={{ color: "white", fontWeight: 700, fontSize: "16px" }}>
                  All Exams ({recentExams.length})
                </h2>
                <button
                  onClick={() => setShowCreateExam(!showCreateExam)}
                  style={{
                    background: "#0ea5e9",
                    color: "white",
                    fontWeight: 700,
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}>
                  + Create Exam
                </button>
              </div>

              {/* Create Exam Form */}
              {showCreateExam && (
                <div
                  style={{
                    background: "#0f172a",
                    border: "1px solid #0ea5e9",
                    borderRadius: "16px",
                    padding: "24px",
                    marginBottom: "20px",
                  }}>
                  <h3
                    style={{
                      color: "white",
                      fontWeight: 700,
                      fontSize: "15px",
                      marginBottom: "16px",
                    }}>
                    Create New Exam
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "14px",
                    }}>
                    {[
                      {
                        label: "Exam Title",
                        name: "title",
                        type: "text",
                        placeholder: "SSC CGL Mock #5",
                      },
                      {
                        label: "Duration (mins)",
                        name: "duration",
                        type: "number",
                        placeholder: "60",
                      },
                      {
                        label: "No. of Questions",
                        name: "questions",
                        type: "number",
                        placeholder: "100",
                      },
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
                          placeholder={field.placeholder}
                          value={newExam[field.name as keyof typeof newExam]}
                          onChange={(e) =>
                            setNewExam({
                              ...newExam,
                              [field.name]: e.target.value,
                            })
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
                    <div>
                      <label
                        style={{
                          display: "block",
                          color: "#64748b",
                          fontSize: "12px",
                          marginBottom: "6px",
                        }}>
                        Category
                      </label>
                      <select
                        value={newExam.category}
                        onChange={(e) =>
                          setNewExam({ ...newExam, category: e.target.value })
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
                        }}>
                        {[
                          "SSC",
                          "UPSC",
                          "JEE",
                          "NEET",
                          "Banking",
                          "Railway",
                          "Defence",
                          "GATE",
                        ].map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                    <button
                      onClick={() => {
                        showNotif("Exam created successfully!");
                        setShowCreateExam(false);
                      }}
                      style={{
                        background: "#0ea5e9",
                        color: "white",
                        fontWeight: 700,
                        padding: "10px 24px",
                        borderRadius: "10px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}>
                      ✅ Save Exam
                    </button>
                    <button
                      onClick={() => setShowCreateExam(false)}
                      style={{
                        background: "#1e293b",
                        color: "#94a3b8",
                        fontWeight: 600,
                        padding: "10px 20px",
                        borderRadius: "10px",
                        border: "1px solid #334155",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Exams Table */}
              <div
                style={{
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "16px",
                  overflow: "hidden",
                }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 80px 80px 80px 90px 110px",
                    padding: "12px 20px",
                    background: "#0a0f1a",
                    borderBottom: "1px solid #1e293b",
                  }}>
                  {[
                    "Title",
                    "Category",
                    "Questions",
                    "Attempts",
                    "Status",
                    "Actions",
                  ].map((h) => (
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
                {recentExams.map((e, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 80px 80px 80px 90px 110px",
                      padding: "14px 20px",
                      alignItems: "center",
                      borderBottom:
                        i < recentExams.length - 1
                          ? "1px solid #1e293b"
                          : "none",
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
                      {e.title}
                    </span>
                    <span style={{ color: "#38bdf8", fontSize: "12px" }}>
                      {e.category}
                    </span>
                    <span style={{ color: "#94a3b8", fontSize: "13px" }}>
                      {e.questions}
                    </span>
                    <span style={{ color: "#94a3b8", fontSize: "13px" }}>
                      {e.attempts.toLocaleString()}
                    </span>
                    <span
                      style={{
                        background: statusBg[e.status],
                        color: statusColor[e.status],
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "999px",
                        display: "inline-block",
                      }}>
                      {e.status}
                    </span>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        onClick={() => showNotif("Exam updated!")}
                        style={{
                          background: "#1e293b",
                          border: "none",
                          color: "#94a3b8",
                          padding: "5px 8px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}>
                        ✏️
                      </button>
                      <button
                        onClick={() => showNotif("Exam published!")}
                        style={{
                          background: "rgba(16,185,129,0.1)",
                          border: "none",
                          color: "#10b981",
                          padding: "5px 8px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}>
                        🚀
                      </button>
                      <button
                        onClick={() => showNotif("Exam deleted!")}
                        style={{
                          background: "rgba(239,68,68,0.1)",
                          border: "none",
                          color: "#ef4444",
                          padding: "5px 8px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}>
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ANALYTICS TAB ── */}
          {activeTab === "analytics" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
              }}>
              {/* Category Distribution */}
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
                  Exams by Category
                </h2>
                {[
                  { name: "SSC", count: 210, color: "#0ea5e9" },
                  { name: "UPSC", count: 180, color: "#6366f1" },
                  { name: "JEE", count: 150, color: "#f59e0b" },
                  { name: "NEET", count: 120, color: "#10b981" },
                  { name: "Banking", count: 100, color: "#ef4444" },
                  { name: "Others", count: 96, color: "#64748b" },
                ].map((item) => (
                  <div key={item.name} style={{ marginBottom: "12px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "5px",
                      }}>
                      <span style={{ color: "#94a3b8", fontSize: "13px" }}>
                        {item.name}
                      </span>
                      <span
                        style={{
                          color: item.color,
                          fontSize: "13px",
                          fontWeight: 700,
                        }}>
                        {item.count}
                      </span>
                    </div>
                    <div
                      style={{
                        height: "6px",
                        background: "#1e293b",
                        borderRadius: "3px",
                      }}>
                      <div
                        style={{
                          height: "100%",
                          borderRadius: "3px",
                          background: item.color,
                          width: `${(item.count / 210) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Monthly Signups */}
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
                  Monthly Signups
                </h2>
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    alignItems: "flex-end",
                    height: "120px",
                    marginBottom: "10px",
                  }}>
                  {[
                    { month: "Nov", val: 800 },
                    { month: "Dec", val: 1200 },
                    { month: "Jan", val: 1800 },
                    { month: "Feb", val: 1400 },
                    { month: "Mar", val: 2200 },
                    { month: "Apr", val: 1900 },
                  ].map((d) => (
                    <div
                      key={d.month}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "4px",
                      }}>
                      <span
                        style={{
                          color: "#38bdf8",
                          fontSize: "9px",
                          fontWeight: 700,
                        }}>
                        {(d.val / 1000).toFixed(1)}k
                      </span>
                      <div
                        style={{
                          width: "100%",
                          background:
                            "linear-gradient(to top, #0ea5e9, #6366f1)",
                          borderRadius: "4px 4px 0 0",
                          height: `${(d.val / 2200) * 90}px`,
                        }}
                      />
                      <span style={{ color: "#475569", fontSize: "10px" }}>
                        {d.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pass/Fail Rate */}
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
                  Pass / Fail Rate
                </h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "24px",
                    marginBottom: "20px",
                  }}>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "36px",
                        fontWeight: 900,
                        color: "#10b981",
                      }}>
                      68%
                    </div>
                    <div style={{ color: "#475569", fontSize: "13px" }}>
                      Pass Rate
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "36px",
                        fontWeight: 900,
                        color: "#ef4444",
                      }}>
                      32%
                    </div>
                    <div style={{ color: "#475569", fontSize: "13px" }}>
                      Fail Rate
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    height: "12px",
                    background: "#1e293b",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}>
                  <div
                    style={{
                      height: "100%",
                      width: "68%",
                      background: "#10b981",
                      borderRadius: "6px",
                    }}
                  />
                </div>
              </div>

              {/* Top Performing Exams */}
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
                  Top Performing Exams
                </h2>
                {recentExams
                  .filter((e) => e.status === "Published")
                  .map((e, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 0",
                        borderBottom: i < 2 ? "1px solid #1e293b" : "none",
                      }}>
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "8px",
                          background: "#1e293b",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#f59e0b",
                          fontWeight: 800,
                          fontSize: "13px",
                        }}>
                        {i + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            color: "white",
                            fontSize: "13px",
                            fontWeight: 600,
                          }}>
                          {e.title}
                        </div>
                        <div style={{ color: "#475569", fontSize: "11px" }}>
                          {e.attempts.toLocaleString()} attempts
                        </div>
                      </div>
                      <span
                        style={{
                          color: "#10b981",
                          fontWeight: 700,
                          fontSize: "13px",
                        }}>
                        ↑
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ── QUESTIONS TAB ── */}
          {activeTab === "questions" && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}>
                <h2
                  style={{ color: "white", fontWeight: 700, fontSize: "16px" }}>
                  Question Bank
                </h2>
                <button
                  onClick={() => showNotif("Question added!")}
                  style={{
                    background: "#0ea5e9",
                    color: "white",
                    fontWeight: 700,
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}>
                  + Add Question
                </button>
              </div>
              {[
                {
                  q: "Which Indian city is known as the Silicon Valley of India?",
                  cat: "GK",
                  diff: "Easy",
                  exam: "SSC CGL",
                },
                {
                  q: "Who was the first Prime Minister of India?",
                  cat: "History",
                  diff: "Easy",
                  exam: "UPSC",
                },
                {
                  q: "What is the chemical symbol for Gold?",
                  cat: "Science",
                  diff: "Medium",
                  exam: "NEET",
                },
                {
                  q: "Solve: If 3x + 5 = 20, find x",
                  cat: "Math",
                  diff: "Easy",
                  exam: "SSC",
                },
                {
                  q: "Which planet is closest to the Sun?",
                  cat: "Science",
                  diff: "Easy",
                  exam: "General",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "#0f172a",
                    border: "1px solid #1e293b",
                    borderRadius: "12px",
                    padding: "16px 20px",
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    flexWrap: "wrap",
                  }}>
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <div
                      style={{
                        color: "white",
                        fontSize: "13px",
                        fontWeight: 500,
                        marginBottom: "6px",
                      }}>
                      {item.q}
                    </div>
                    <div
                      style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <span
                        style={{
                          background: "rgba(14,165,233,0.1)",
                          color: "#38bdf8",
                          fontSize: "10px",
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: "999px",
                        }}>
                        {item.cat}
                      </span>
                      <span
                        style={{
                          background:
                            statusBg[item.diff] || "rgba(16,185,129,0.1)",
                          color: statusColor[item.diff] || "#10b981",
                          fontSize: "10px",
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: "999px",
                        }}>
                        {item.diff}
                      </span>
                      <span style={{ color: "#475569", fontSize: "11px" }}>
                        Exam: {item.exam}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      onClick={() => showNotif("Question updated!")}
                      style={{
                        background: "#1e293b",
                        border: "none",
                        color: "#94a3b8",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}>
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => showNotif("Question deleted!")}
                      style={{
                        background: "rgba(239,68,68,0.1)",
                        border: "none",
                        color: "#ef4444",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}>
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── SETTINGS TAB ── */}
          {activeTab === "settings" && (
            <div style={{ maxWidth: "600px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}>
                {[
                  { label: "Site Name", value: "ExamPro", type: "text" },
                  {
                    label: "Admin Email",
                    value: "admin@exampro.in",
                    type: "email",
                  },
                  {
                    label: "Max Exam Duration (mins)",
                    value: "180",
                    type: "number",
                  },
                  {
                    label: "Default Negative Marking",
                    value: "0.25",
                    type: "number",
                  },
                ].map((field) => (
                  <div
                    key={field.label}
                    style={{
                      background: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "12px",
                      padding: "16px 20px",
                    }}>
                    <label
                      style={{
                        display: "block",
                        color: "#64748b",
                        fontSize: "12px",
                        marginBottom: "8px",
                        fontWeight: 500,
                      }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      defaultValue={field.value}
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

                {/* Toggles */}
                {[
                  {
                    label: "Enable Registration",
                    desc: "Allow new users to sign up",
                    on: true,
                  },
                  {
                    label: "Maintenance Mode",
                    desc: "Take the site offline for updates",
                    on: false,
                  },
                  {
                    label: "Email Notifications",
                    desc: "Send result emails to users",
                    on: true,
                  },
                ].map((toggle) => (
                  <div
                    key={toggle.label}
                    style={{
                      background: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "12px",
                      padding: "16px 20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}>
                    <div>
                      <div
                        style={{
                          color: "white",
                          fontSize: "14px",
                          fontWeight: 600,
                        }}>
                        {toggle.label}
                      </div>
                      <div
                        style={{
                          color: "#475569",
                          fontSize: "12px",
                          marginTop: "2px",
                        }}>
                        {toggle.desc}
                      </div>
                    </div>
                    <button
                      onClick={() => showNotif(`${toggle.label} toggled!`)}
                      style={{
                        width: "44px",
                        height: "24px",
                        borderRadius: "12px",
                        background: toggle.on ? "#0ea5e9" : "#1e293b",
                        border: "none",
                        cursor: "pointer",
                        position: "relative",
                      }}>
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          background: "white",
                          position: "absolute",
                          top: "3px",
                          left: toggle.on ? "23px" : "3px",
                          transition: "left 0.2s",
                        }}
                      />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => showNotif("Settings saved successfully!")}
                  style={{
                    background: "#0ea5e9",
                    color: "white",
                    fontWeight: 700,
                    padding: "14px",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "15px",
                  }}>
                  💾 Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
