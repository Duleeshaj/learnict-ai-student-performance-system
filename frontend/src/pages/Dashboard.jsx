function Dashboard() {
  return (
    <div className="container list-page">
      <div
        className="card"
        style={{
          padding: "0",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,244,247,0.96))",
          border: "1px solid rgba(225, 29, 72, 0.10)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 0.75fr",
            minHeight: "360px",
          }}
        >
          <div
            style={{
              padding: "42px 38px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background:
                "radial-gradient(circle at top left, rgba(225,29,72,0.10), transparent 38%)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                width: "fit-content",
                padding: "8px 14px",
                borderRadius: "999px",
                background: "rgba(225, 29, 72, 0.08)",
                color: "#be123c",
                fontSize: "13px",
                fontWeight: "600",
                marginBottom: "18px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "999px",
                  background: "#e11d48",
                  display: "inline-block",
                }}
              ></span>
              AI-Based Student Performance System
            </div>

            <h1
              style={{
                fontSize: "44px",
                lineHeight: "1.1",
                marginBottom: "16px",
                color: "#0f172a",
                maxWidth: "620px",
              }}
            >
              One intelligent workspace for managing student progress
            </h1>

            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.8",
                color: "#475569",
                maxWidth: "640px",
                marginBottom: "24px",
              }}
            >
              Digitize attendance, manage academic records, monitor student
              progress, and generate AI-based predictions through a centralized
              system designed for LearnICT classes.
            </p>

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.95)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: "16px",
                  padding: "16px 18px",
                  minWidth: "170px",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    marginBottom: "6px",
                  }}
                >
                  Attendance Mode
                </p>
                <h3 style={{ marginBottom: 0, color: "#0f172a" }}>
                  QR + Manual
                </h3>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.95)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: "16px",
                  padding: "16px 18px",
                  minWidth: "170px",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    marginBottom: "6px",
                  }}
                >
                  Prediction Focus
                </p>
                <h3 style={{ marginBottom: 0, color: "#0f172a" }}>
                  Grade + Risk
                </h3>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "30px",
              background:
                "linear-gradient(180deg, rgba(255,250,251,1), rgba(255,255,255,1))",
              borderLeft: "1px solid rgba(225, 29, 72, 0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: "18px",
                padding: "18px",
                boxShadow: "0 8px 22px rgba(15,23,42,0.05)",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  marginBottom: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Core Strength
              </p>
              <h3 style={{ marginBottom: "6px", color: "#be123c" }}>
                Teacher-Centered Analytics
              </h3>
              <p className="small-text" style={{ marginBottom: 0 }}>
                Built for medium-sized ICT classes with individual student
                attention.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
            >
              <div
                style={{
                  background: "#fff7f8",
                  border: "1px solid rgba(225, 29, 72, 0.08)",
                  borderRadius: "16px",
                  padding: "18px",
                }}
              >
                <h3 style={{ marginBottom: "6px", color: "#0f172a" }}>
                  Unit-Based Tracking
                </h3>
                <p className="small-text" style={{ marginBottom: 0 }}>
                  Attendance and test marks managed by academic unit.
                </p>
              </div>

              <div
                style={{
                  background: "#fffafb",
                  border: "1px solid rgba(225, 29, 72, 0.08)",
                  borderRadius: "16px",
                  padding: "18px",
                }}
              >
                <h3 style={{ marginBottom: "6px", color: "#0f172a" }}>
                  Predictive Insight
                </h3>
                <p className="small-text" style={{ marginBottom: 0 }}>
                  Forecasts grades and highlights academic risk levels.
                </p>
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #e11d48, #fb7185)",
                borderRadius: "18px",
                padding: "18px",
                color: "white",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  opacity: 0.9,
                  marginBottom: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                System Outcome
              </p>
              <h3 style={{ marginBottom: "6px", color: "white" }}>
                Faster academic decisions
              </h3>
              <p style={{ marginBottom: 0, fontSize: "14px", opacity: 0.95 }}>
                Reduce manual work, improve record accuracy, and prepare better
                for parent meetings and exams.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginTop: "24px",
          marginBottom: "24px",
        }}
      >
        <div
          className="card"
          style={{
            padding: "28px",
            background:
              "linear-gradient(180deg, rgba(255,255,255,1), rgba(255,250,251,1))",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "18px",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "6px",
                }}
              >
                Platform Overview
              </p>
              <h3 style={{ marginBottom: "0", color: "#0f172a" }}>
                Complete teacher-aid workflow
              </h3>
            </div>

            <div
              style={{
                padding: "10px 14px",
                borderRadius: "999px",
                background: "rgba(225,29,72,0.08)",
                color: "#be123c",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              LearnICT Foundation
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
            }}
          >
            <div
              style={{
                padding: "18px",
                borderRadius: "18px",
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <h3 style={{ marginBottom: "8px", color: "#be123c" }}>
                Student Profiles
              </h3>
              <p className="small-text" style={{ marginBottom: 0 }}>
                Maintain student identity, class details, and QR-based
                attendance records.
              </p>
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "18px",
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <h3 style={{ marginBottom: "8px", color: "#be123c" }}>
                Dynamic Units
              </h3>
              <p className="small-text" style={{ marginBottom: 0 }}>
                Support flexible unit counts for each term without a fixed
                structure.
              </p>
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "18px",
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <h3 style={{ marginBottom: "8px", color: "#be123c" }}>
                Structured Marks
              </h3>
              <p className="small-text" style={{ marginBottom: 0 }}>
                Record unit test marks, Sir&apos;s term test marks, and school
                term test marks in one system.
              </p>
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "18px",
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <h3 style={{ marginBottom: "8px", color: "#be123c" }}>
                AI Prediction
              </h3>
              <p className="small-text" style={{ marginBottom: 0 }}>
                Generate predicted grade, trend, and academic risk score from
                stored records.
              </p>
            </div>
          </div>
        </div>

        <div
          className="card"
          style={{
            padding: "26px",
            background:
              "linear-gradient(180deg, rgba(255,255,255,1), rgba(255,247,249,1))",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "8px",
            }}
          >
            Key Highlights
          </p>

          <h3 style={{ marginBottom: "18px" }}>Why this system matters</h3>

          <div style={{ display: "grid", gap: "16px" }}>
            <div>
              <strong style={{ color: "#be123c" }}>Improves record accuracy</strong>
              <p className="small-text" style={{ marginTop: "6px", marginBottom: 0 }}>
                Replaces memory-based and book-based record keeping with a
                centralized system.
              </p>
            </div>

            <div>
              <strong style={{ color: "#be123c" }}>Supports early intervention</strong>
              <p className="small-text" style={{ marginTop: "6px", marginBottom: 0 }}>
                Identifies students who are likely to underperform before final
                exams.
              </p>
            </div>

            <div>
              <strong style={{ color: "#be123c" }}>Helps parent meeting preparation</strong>
              <p className="small-text" style={{ marginTop: "6px", marginBottom: 0 }}>
                Gives the teacher quick access to performance summaries and
                student feedback.
              </p>
            </div>

            <div>
              <strong style={{ color: "#be123c" }}>Combines analytics and AI</strong>
              <p className="small-text" style={{ marginTop: "6px", marginBottom: 0 }}>
                Connects educational data management with predictive learning
                analytics.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="card"
        style={{
          padding: "28px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,1), rgba(248,250,252,1))",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: "22px",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "8px",
              }}
            >
              Project Goal
            </p>
            <h3 style={{ marginBottom: "12px" }}>
              A practical intelligent support system for classroom teaching
            </h3>
            <p className="small-text" style={{ marginBottom: 0 }}>
              This platform is built to support a teacher who manages
              medium-sized ICT classes by simplifying data entry, improving
              academic visibility, and offering predictive insights from
              attendance and marks data.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "14px",
            }}
          >
            <div
              style={{
                borderRadius: "18px",
                padding: "18px",
                background: "#fff7f8",
                border: "1px solid rgba(225,29,72,0.08)",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginBottom: "6px", color: "#be123c" }}>01</h3>
              <p className="small-text" style={{ marginBottom: 0 }}>
                Digitize records
              </p>
            </div>

            <div
              style={{
                borderRadius: "18px",
                padding: "18px",
                background: "#fffafb",
                border: "1px solid rgba(225,29,72,0.08)",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginBottom: "6px", color: "#be123c" }}>02</h3>
              <p className="small-text" style={{ marginBottom: 0 }}>
                Track progress
              </p>
            </div>

            <div
              style={{
                borderRadius: "18px",
                padding: "18px",
                background: "#fffdfd",
                border: "1px solid rgba(225,29,72,0.08)",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginBottom: "6px", color: "#be123c" }}>03</h3>
              <p className="small-text" style={{ marginBottom: 0 }}>
                Predict outcomes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;