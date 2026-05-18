"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { colleges } from "../../Data/colleges";
import Navbar from "../../components/Navbar";

function CompareContent() {
  const searchParams = useSearchParams();

  const college1Name =
    searchParams.get("college1") || "DTU";

  const college2Name =
    searchParams.get("college2") || "NSUT";

  const college1 = colleges.find(
    (c) => c.name === college1Name
  );

  const college2 = colleges.find(
    (c) => c.name === college2Name
  );

  if (!college1 || !college2) {
    return (
      <div
        style={{
          padding: "8rem 2rem",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h1
          className="gradient-text"
          style={{ fontSize: "2rem", fontWeight: 700 }}
        >
          College not found
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            marginTop: "1rem",
          }}
        >
          Please check the college names and try again.
        </p>
      </div>
    );
  }

  const rows = [
    { label: "Branch", v1: college1.branch, v2: college2.branch },
    { label: "Average Package", v1: college1.package, v2: college2.package },
    { label: "NIRF Ranking", v1: `#${college1.nirf}`, v2: `#${college2.nirf}` },
    { label: "Campus Life", v1: college1.campus, v2: college2.campus },
    { label: "Coding Culture", v1: college1.codingCulture, v2: college2.codingCulture },
    { label: "Fees", v1: college1.fees, v2: college2.fees },
  ];

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        padding: "7rem 2rem 4rem",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h1
        className="gradient-text"
        style={{
          fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
          fontWeight: 800,
          marginBottom: "2.5rem",
          animation: "fadeUp 0.6s ease-out both",
        }}
      >
        Compare Colleges
      </h1>

      <div
        className="glass-card"
        style={{
          padding: 0,
          overflow: "hidden",
          animation: "fadeUp 0.6s ease-out 0.2s both",
        }}
      >
        <table className="compare-table">
          <thead>
            <tr>
              <th style={{ color: "var(--text-muted)" }}>Feature</th>
              <th>
                <span className="gradient-text">{college1.name}</span>
              </th>
              <th>
                <span className="gradient-text">{college2.name}</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>{row.label}</td>
                <td>{row.v1}</td>
                <td>{row.v2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <main className="page-wrapper">
      {/* Dot grid */}
      <div className="dot-grid-overlay" />

      {/* Background orbs */}
      <div
        className="orb orb-purple"
        style={{
          width: "350px",
          height: "350px",
          top: "10%",
          left: "-5%",
          opacity: 0.3,
        }}
      />
      <div
        className="orb orb-cyan"
        style={{
          width: "300px",
          height: "300px",
          bottom: "15%",
          right: "-5%",
          opacity: 0.25,
          animationDelay: "2s",
        }}
      />

      <Navbar />

      <Suspense fallback={null}>
        <CompareContent />
      </Suspense>
    </main>
  );
}