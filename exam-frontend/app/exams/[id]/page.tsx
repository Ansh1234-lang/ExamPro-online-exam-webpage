"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

const examData: Record<string, any> = {
  "1": {
    title: "SSC CGL Mock Test 2024",
    category: "SSC",
    difficulty: "Medium",
    questions: 100,
    duration: 60,
    totalMarks: 200,
    passingMarks: 140,
    negativeMarking: 0.5,
    attempts: 24500,
    rating: 4.8,
    description:
      "A comprehensive mock test for SSC CGL 2024 covering all four sections — General Intelligence, General Awareness, Quantitative Aptitude and English Comprehension.",
    topics: [
      "General Intelligence & Reasoning",
      "General Awareness",
      "Quantitative Aptitude",
      "English Comprehension",
    ],
    instructions: [
      "The exam consists of 100 questions for 200 marks.",
      "Each correct answer carries 2 marks.",
      "There is a negative marking of 0.5 marks for each wrong answer.",
      "The total duration of the exam is 60 minutes.",
      "Do not refresh or close the browser during the exam.",
      "Your answers are auto-saved as you proceed.",
      "The exam will auto-submit when the timer reaches zero.",
    ],
  },
  "2": {
    title: "UPSC Prelims GS Paper 1",
    category: "UPSC",
    difficulty: "Hard",
    questions: 100,
    duration: 120,
    totalMarks: 200,
    passingMarks: 110,
    negativeMarking: 0.66,
    attempts: 18200,
    rating: 4.9,
    description:
      "Full-length UPSC Civil Services Preliminary Examination General Studies Paper 1 mock test with questions from History, Geography, Polity, Economy, Environment and Current Affairs.",
    topics: [
      "History & Culture",
      "Geography",
      "Indian Polity",
      "Economy",
      "Environment & Ecology",
      "Current Affairs",
    ],
    instructions: [
      "The exam consists of 100 questions for 200 marks.",
      "Each correct answer carries 2 marks.",
      "There is a negative marking of 0.66 marks for each wrong answer.",
      "The total duration of the exam is 120 minutes.",
      "Do not refresh or close the browser during the exam.",
      "Your answers are auto-saved as you proceed.",
      "The exam will auto-submit when the timer reaches zero.",
    ],
  },
};

const difficultyColor: Record<string, string> = {
  Easy: "#10b981",
  Medium: "#f59e0b",
  Hard: "#ef4444",
};

const difficultyBg: Record<string, string> = {
  Easy: "rgba(16,185,129,0.1)",
  Medium: "rgba(245,158,11,0.1)",
  Hard: "rgba(239,68,68,0.1)",
};

export default function ExamDetailPage() {
  const { id } = useParams();
  const exam = examData[id as string] || examData["1"];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        padding: "32px 24px",
      }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Back */}
        <Link
          href="/exams"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#64748b",
            textDecoration: "none",
            fontSize: "14px",
            marginBottom: "24px",
          }}>
          ← Back to Exams
        </Link>

        {/* Header Card */}
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
              gap: "10px",
              marginBottom: "16px",
              flexWrap: "wrap",
            }}>
            <span
              style={{
                background: "rgba(14,165,233,0.1)",
                color: "#38bdf8",
                fontSize: "12px",
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: "999px",
                border: "1px solid rgba(14,165,233,0.2)",
              }}>
              {exam.category}
            </span>
            <span
              style={{
                background: difficultyBg[exam.difficulty],
                color: difficultyColor[exam.difficulty],
                fontSize: "12px",
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: "999px",
              }}>
              {exam.difficulty}
            </span>
          </div>

          <h1
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "white",
              marginBottom: "12px",
            }}>
            {exam.title}
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              lineHeight: 1.7,
              marginBottom: "24px",
            }}>
            {exam.description}
          </p>

          {/* Stats Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "16px",
              marginBottom: "28px",
            }}>
            {[
              { icon: "📝", label: "Questions", value: exam.questions },
              { icon: "⏱️", label: "Duration", value: `${exam.duration} mins` },
              { icon: "🎯", label: "Total Marks", value: exam.totalMarks },
              { icon: "✅", label: "Passing Marks", value: exam.passingMarks },
              {
                icon: "➖",
                label: "Negative Marking",
                value: `-${exam.negativeMarking}`,
              },
              {
                icon: "👥",
                label: "Attempts",
                value: `${(exam.attempts / 1000).toFixed(1)}k`,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "#1e293b",
                  borderRadius: "12px",
                  padding: "14px",
                  textAlign: "center",
                }}>
                <div style={{ fontSize: "22px", marginBottom: "6px" }}>
                  {stat.icon}
                </div>
                <div
                  style={{ color: "white", fontWeight: 700, fontSize: "16px" }}>
                  {stat.value}
                </div>
                <div
                  style={{
                    color: "#475569",
                    fontSize: "11px",
                    marginTop: "2px",
                  }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Rating */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "28px",
            }}>
            <div style={{ display: "flex", gap: "2px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    fontSize: "18px",
                    color:
                      star <= Math.round(exam.rating) ? "#f59e0b" : "#1e293b",
                  }}>
                  ★
                </span>
              ))}
            </div>
            <span style={{ color: "#f59e0b", fontWeight: 700 }}>
              {exam.rating}
            </span>
            <span style={{ color: "#475569", fontSize: "13px" }}>
              ({exam.attempts.toLocaleString()} ratings)
            </span>
          </div>

          {/* Start Button */}
          <Link
            href={`/exams/${id}/take`}
            style={{
              display: "block",
              textAlign: "center",
              background: "#0ea5e9",
              color: "white",
              fontWeight: 700,
              fontSize: "18px",
              padding: "16px",
              borderRadius: "14px",
              textDecoration: "none",
              width: "100%",
              boxSizing: "border-box",
            }}>
            🚀 Start Exam Now
          </Link>
        </div>

        {/* Two Column Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}>
          {/* Topics Covered */}
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
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "16px",
              }}>
              📚 Topics Covered
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {exam.topics.map((topic: string) => (
                <div
                  key={topic}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}>
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#0ea5e9",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ color: "#94a3b8", fontSize: "14px" }}>
                    {topic}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
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
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "16px",
              }}>
              📋 Instructions
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {exam.instructions.map((inst: string, i: number) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}>
                  <span
                    style={{
                      background: "#1e293b",
                      color: "#38bdf8",
                      fontSize: "11px",
                      fontWeight: 700,
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}>
                    {i + 1}
                  </span>
                  <span
                    style={{
                      color: "#94a3b8",
                      fontSize: "13px",
                      lineHeight: 1.6,
                    }}>
                    {inst}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
