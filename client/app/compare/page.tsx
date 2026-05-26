"use client";

import { Suspense } from "react";
import Navbar from "../../components/Navbar";
import { useCompare } from "../../hooks/useCompare";

function CompareContent() {
  const { compareList: collegesData, isLoaded, removeCollege } = useCompare();

  if (!isLoaded) {
    return (
      <div style={{ padding: "10rem 2rem", textAlign: "center", position: "relative", zIndex: 2 }}>
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-zinc-400">Loading comparison...</p>
      </div>
    );
  }

  if (collegesData.length < 2) {
    return (
      <div style={{ padding: "10rem 2rem", textAlign: "center", position: "relative", zIndex: 2 }}>
        <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>⚖️</span>
        <h1 className="gradient-text" style={{ fontSize: "2rem", fontWeight: 700 }}>
          {collegesData.length === 0 ? "No colleges selected for comparison yet." : "Not enough colleges to compare"}
        </h1>
        <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>
          {collegesData.length === 0
            ? "Go back to the results page and select up to 3 colleges to see them side-by-side."
            : "Please select at least 2 colleges from the prediction results to compare them."}
        </p>
        <button className="btn-neon" style={{ marginTop: "1.5rem" }} onClick={() => history.back()}>
          ← Go Back to Results
        </button>
      </div>
    );
  }

  const rows = [
    { label: "AI Recommendation", isHtml: true, keys: collegesData.map(c => 
      c.insights?.aiRecommendation ? `<div style="color:var(--neon-purple);font-weight:600;font-size:0.95rem;">✨ ${c.insights.aiRecommendation}</div>` : "-"
    )},
    { label: "Branch", keys: collegesData.map(c => c.branch) },
    { label: "Average Package", keys: collegesData.map(c => c.package) },
    { label: "NIRF Ranking", keys: collegesData.map(c => `#${c.nirf}`) },
    { label: "Closing Rank", keys: collegesData.map(c => c.closingRank.toLocaleString()) },
    
    // Insights
    { label: "Campus Vibe", keys: collegesData.map(c => c.insights?.campusVibe || "-") },
    { label: "Coding Culture", keys: collegesData.map(c => c.insights?.codingCultureReview || "-") },
    { label: "Placement Reality", keys: collegesData.map(c => c.insights?.placementReality || "-") },
    { label: "Peer Competitiveness", keys: collegesData.map(c => c.insights?.peerCompetitiveness || "-") },
    { label: "Hostel Review", keys: collegesData.map(c => c.insights?.hostelReview || "-") },
    
    // Pros & Cons
    { label: "Pros", isHtml: true, keys: collegesData.map(c => 
      Array.isArray(c.insights?.pros) 
        ? `<ul style="margin:0;padding-left:1.2rem;color:#34d399;font-size:0.85rem">${c.insights.pros.map((p:string) => `<li>${p}</li>`).join("")}</ul>` 
        : "-"
    )},
    { label: "Cons", isHtml: true, keys: collegesData.map(c => 
      Array.isArray(c.insights?.cons) 
        ? `<ul style="margin:0;padding-left:1.2rem;color:#f87171;font-size:0.85rem">${c.insights.cons.map((x:string) => `<li>${x}</li>`).join("")}</ul>` 
        : "-"
    )},
    
    { label: "Campus Rating", keys: collegesData.map(c => c.campus) },
    { label: "Fees", keys: collegesData.map(c => c.fees) },
  ];

  return (
    <div style={{ position: "relative", zIndex: 2, padding: "7rem 2rem 4rem", maxWidth: "1200px", margin: "0 auto" }}>
      <button className="btn-ghost" style={{ marginBottom: "2rem", padding: "0.5rem 1rem", fontSize: "0.85rem" }} onClick={() => history.back()}>
        ← Back to Results
      </button>

      <h1 className="gradient-text" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 800, marginBottom: "2.5rem", animation: "fadeUp 0.6s ease-out both" }}>
        Compare Colleges
      </h1>

      <div className="glass-card" style={{ padding: 0, overflowX: "auto", animation: "fadeUp 0.6s ease-out 0.2s both" }}>
        <table className="compare-table" style={{ minWidth: "600px" }}>
          <thead>
            <tr>
              <th style={{ color: "var(--text-muted)", width: "20%" }}>Feature</th>
              {collegesData.map((c, i) => (
                <th key={c.id || i} style={{ width: `${80 / collegesData.length}%`, position: "relative", paddingBottom: "2rem" }}>
                  <span className="gradient-text">{c.name}</span>
                  <button 
                    className="btn-ghost" 
                    style={{ position: "absolute", bottom: "0.5rem", left: "50%", transform: "translateX(-50%)", padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
                    onClick={() => removeCollege(c.id)}
                    title="Remove from comparison"
                  >
                    Remove
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{row.label}</td>
                {row.keys.map((val: any, j) => (
                  <td key={j}>
                    {row.isHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: val }} />
                    ) : (
                      val
                    )}
                  </td>
                ))}
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
      <div className="dot-grid-overlay" />
      <div className="orb orb-purple" style={{ width: "350px", height: "350px", top: "10%", left: "-5%", opacity: 0.3 }} />
      <div className="orb orb-cyan" style={{ width: "300px", height: "300px", bottom: "15%", right: "-5%", opacity: 0.25, animationDelay: "2s" }} />
      <Navbar />
      <Suspense fallback={null}>
        <CompareContent />
      </Suspense>
    </main>
  );
}