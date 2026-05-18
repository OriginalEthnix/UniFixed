"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import ScrollReveal from "../../components/ScrollReveal";

function ResultsContent() {
  const searchParams = useSearchParams();
  const userRank = Number(searchParams.get("rank"));
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("nirf");
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://unifixed.onrender.com/predict?rank=${userRank}`
        );

        const data = await response.json();

        if (Array.isArray(data)) {
          setColleges(data);
        } else {
          console.error("Backend returned an error or non-array:", data);
          setColleges([]);
        }
      } catch (error) {
    console.error("Error fetching colleges:", error);

    setError(
      "Server is waking up or unavailable. Please try again in a few seconds."
      );
    }
      finally {
    setLoading(false);
  }
    };

    fetchColleges();
  }, []);
  if (loading) {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>

        <p className="text-zinc-400 text-lg">
          Predicting your colleges...
        </p>
      </div>
    </main>
  );
}

if (error) {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div
        className="glass-card"
        style={{
          padding: "2rem",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: 700,
            marginBottom: "1rem",
            color: "#ff6b6b",
          }}
        >
          Oops!
        </h2>

        <p
          style={{
            color: "var(--text-muted)",
            lineHeight: 1.7,
          }}
        >
          {error}
        </p>
      </div>
    </main>
  );
}

const filteredColleges = [...colleges]
  .filter((college) =>
    college.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (sortBy === "nirf") {
      return a.nirf - b.nirf;
    }

    return (
      parseInt(b.package) -
      parseInt(a.package)
    );
  });


  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        padding: "7rem 2rem 4rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Page Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1
          className="gradient-text"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            fontWeight: 800,
            marginBottom: "0.5rem",
            animation: "fadeUp 0.6s ease-out both",
          }}
        >
          Predicted Colleges
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "1.1rem",
            animation: "fadeUp 0.6s ease-out 0.15s both",
          }}
        >
          Showing results for rank{" "}
          <span
            style={{ color: "var(--neon-cyan)", fontWeight: 600 }}
          >
            {userRank}
          </span>
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
          animation: "fadeUp 0.6s ease-out 0.3s both",
        }}
      >
        <input
          type="text"
          placeholder="Search colleges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-glass"
          style={{ flex: 1, minWidth: "200px" }}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-glass"
          style={{ minWidth: "180px", flex: "0 0 auto" }}
        >
          <option value="nirf">Sort by NIRF</option>
          <option value="package">Sort by Package</option>
        </select>
      </div>

      {filteredColleges.length === 0 && (
  <div
    style={{
      textAlign: "center",
      padding: "5rem 0",
    }}
  >
    <h2
      style={{
        fontSize: "2rem",
        fontWeight: 700,
        marginBottom: "0.75rem",
        color: "var(--text-primary)",
      }}
    >
      No matching colleges found
    </h2>

    <p
      style={{
        color: "var(--text-muted)",
        fontSize: "1rem",
      }}
    >
      Try searching with another college name.
    </p>
  </div>
)}

      {/* College Cards */}
{filteredColleges.length > 0 && (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    }}
  >
        {filteredColleges.map((college, index) => {
            const placementClass =
              college.placementScore >= 8
                ? "high"
                : college.placementScore >= 6
                ? "mid"
                : "low";

            const badgeClass =
              college.category === "Safe"
                ? "badge-safe"
                : college.category === "Target"
                ? "badge-target"
                : "badge-dream";

            return (
              <div
                key={index}
                className="glass-card fade-section"
                style={{
                  padding: "1.75rem",
                  transitionDelay: `${index * 0.05}s`,
                }}
              >
                {/* Top row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {college.name}
                    </h2>
                    <p
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.95rem",
                      }}
                    >
                      {college.branch}
                    </p>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      {college.package}
                    </p>
                    <p
                      style={{
                        color: "var(--text-dim)",
                        fontSize: "0.8rem",
                      }}
                    >
                      Avg Package
                    </p>
                  </div>
                </div>

                {/* Badges row */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                    marginTop: "1.25rem",
                  }}
                >
                  <span className="stat-chip">NIRF #{college.nirf}</span>
                  <span className="stat-chip">
                    Closing Rank {college.closingRank}
                  </span>
                  <span className={`badge ${badgeClass}`}>
                    {college.category}
                  </span>
                </div>

                {/* Detail cards */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "0.75rem",
                    marginTop: "1.25rem",
                  }}
                >
                  <div className="detail-card">
                    <p className="label">Hostel</p>
                    <p className="value">{college.hostel}</p>
                  </div>
                  <div className="detail-card">
                    <p className="label">Campus</p>
                    <p className="value">{college.campus}</p>
                  </div>
                  <div className="detail-card">
                    <p className="label">Coding Culture</p>
                    <p className="value">{college.codingCulture}</p>
                  </div>
                  <div className="detail-card">
                    <p className="label">Fees</p>
                    <p className="value">{college.fees}</p>
                  </div>
                </div>

                {/* Placement bar */}
                <div style={{ marginTop: "1.25rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-dim)",
                      }}
                    >
                      Placement Strength
                    </span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {college.placementScore}/10
                    </span>
                  </div>
                  <div className="placement-bar-track">
                    <div
                      className={`placement-bar-fill ${placementClass}`}
                      style={{
                        width: `${college.placementScore * 10}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Compare button */}
                <button
                  onClick={() =>
                    router.push(
                      `/compare?college=${encodeURIComponent(
                        college.name
                      )}`
                    )
                  }
                  className="btn-ghost"
                  style={{ marginTop: "1.25rem" }}
                >
                  Compare →
                </button>
              </div>
            );
          })}
      </div>
      )}
      </div>
  );
}

export default function ResultsPage() {
  return (
    <main className="page-wrapper">
      {/* Dot grid */}
      <div className="dot-grid-overlay" />

      {/* Background orbs */}
      <div
        className="orb orb-purple"
        style={{
          width: "400px",
          height: "400px",
          top: "5%",
          right: "-5%",
          opacity: 0.3,
        }}
      />
      <div
        className="orb orb-cyan"
        style={{
          width: "350px",
          height: "350px",
          bottom: "10%",
          left: "-5%",
          opacity: 0.25,
          animationDelay: "3s",
        }}
      />

      <Navbar />

      <Suspense fallback={null}>
        <ResultsContent />
      </Suspense>

      <ScrollReveal />
    </main>
  );
}