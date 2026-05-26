"use client";
import { memo, useState } from "react";
import FavoriteButton from "./FavoriteButton";

export interface CollegeInsight {
  pros: string[];
  cons: string[];
  campusVibe: string;
  codingCultureReview: string;
  placementReality: string;
  hostelReview: string;
  peerCompetitiveness: string;
  attendanceStrictness: string;
  cityLife: string;
  startupCulture: string;
  facultyQuality: string;
  aiRecommendation: string;
}

export interface CollegeData {
  id: number;
  name: string;
  branch: string;
  exam: string;
  closingRank: number;
  nirf: number;
  hostel: string;
  campus: string;
  fees: string;
  package: string;
  codingCulture: string;
  placementScore: number;
  category: "Safe" | "Target" | "Dream";
  insights?: CollegeInsight | null;
}

interface CollegeCardProps {
  college: CollegeData;
  index: number;
  favorites: number[];
  onFavoriteToggle: (id: number) => void;
  compareSelected: CollegeData[];
  onCompareToggle: (college: CollegeData) => void;
}

const BADGE_CLASS: Record<string, string> = {
  Safe:   "badge-safe",
  Target: "badge-target",
  Dream:  "badge-dream",
};

const PLACEMENT_CLASS = (score: number) =>
  score >= 8 ? "high" : score >= 6 ? "mid" : "low";

function CollegeCard({ college, index, favorites, onFavoriteToggle, compareSelected, onCompareToggle }: CollegeCardProps) {
  const [showInsights, setShowInsights] = useState(false);
  const isCompared  = compareSelected.some((c) => c.id === college.id);
  const canCompare  = isCompared || compareSelected.length < 3;
  const insights = college.insights;

  return (
    <div
      className={`glass-card card-enter ${isCompared ? "compare-selected" : ""}`}
      style={{
        padding: "1.75rem",
        animationDelay: `${Math.min(index * 0.06, 0.6)}s`,
      }}
    >
      {/* ── Top row ───────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem", lineHeight: 1.3 }}>
            {college.name}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            {college.branch} &middot; <span style={{ color: "var(--text-dim)", fontSize: "0.82rem" }}>{college.exam}</span>
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
          <FavoriteButton
            collegeId={college.id}
            favorites={favorites}
            onToggle={onFavoriteToggle}
          />
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>{college.package}</p>
            <p style={{ color: "var(--text-dim)", fontSize: "0.78rem" }}>Avg Package</p>
          </div>
        </div>
      </div>

      {/* ── Badges ────────────────────────────────── */}
      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "1.1rem" }}>
        <span className="stat-chip">NIRF #{college.nirf}</span>
        <span className="stat-chip">Closing Rank {college.closingRank.toLocaleString()}</span>
        <span className={`badge ${BADGE_CLASS[college.category]}`}>{college.category}</span>
      </div>

      {/* ── Detail grid ───────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "0.65rem", marginTop: "1.1rem" }}>
        {[
          { label: "Hostel",         value: college.hostel },
          { label: "Campus",         value: college.campus },
          { label: "Coding Culture", value: college.codingCulture },
          { label: "Fees",           value: college.fees },
        ].map(({ label, value }) => (
          <div key={label} className="detail-card">
            <p className="label">{label}</p>
            <p className="value">{value}</p>
          </div>
        ))}
      </div>

      {/* ── Placement bar ─────────────────────────── */}
      <div style={{ marginTop: "1.1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
          <span style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>Placement Strength</span>
          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>
            {college.placementScore}/10
          </span>
        </div>
        <div className="placement-bar-track">
          <div
            className={`placement-bar-fill ${PLACEMENT_CLASS(college.placementScore)}`}
            style={{ width: `${college.placementScore * 10}%` }}
          />
        </div>
      </div>

      {/* ── Qualitative Insights Accordion ────────── */}
      {insights && (
        <div style={{ marginTop: "1.25rem", borderRadius: "12px", border: "1px solid var(--border-subtle)", overflow: "hidden", background: "rgba(255,255,255,0.02)" }}>
          <button 
            onClick={() => setShowInsights(!showInsights)}
            style={{ width: "100%", padding: "0.85rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", fontWeight: 600, fontSize: "0.95rem" }}
          >
            <span>💡 View College Insights</span>
            <span style={{ transform: showInsights ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>▼</span>
          </button>
          
          <div style={{ maxHeight: showInsights ? "1000px" : "0", opacity: showInsights ? 1 : 0, overflow: "hidden", transition: "all 0.4s ease-in-out" }}>
            <div style={{ padding: "0 1.25rem 1.25rem" }}>
              
              {/* AI Recommendation Highlight */}
              <div style={{ padding: "1rem", borderRadius: "8px", background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)", marginBottom: "1rem" }}>
                <p style={{ color: "var(--neon-purple)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.35rem" }}>✨ AI Recommendation</p>
                <p style={{ color: "var(--text-primary)", fontSize: "0.95rem", lineHeight: 1.5 }}>{insights.aiRecommendation}</p>
              </div>

              {/* Pros & Cons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ padding: "1rem", borderRadius: "8px", background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.15)" }}>
                  <p style={{ color: "#34d399", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem" }}>Pros</p>
                  <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.85rem", color: "var(--text-body)", lineHeight: 1.6 }}>
                    {Array.isArray(insights.pros) ? insights.pros.map((p, i) => <li key={i}>{p}</li>) : null}
                  </ul>
                </div>
                <div style={{ padding: "1rem", borderRadius: "8px", background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.15)" }}>
                  <p style={{ color: "#f87171", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem" }}>Cons</p>
                  <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.85rem", color: "var(--text-body)", lineHeight: 1.6 }}>
                    {Array.isArray(insights.cons) ? insights.cons.map((c, i) => <li key={i}>{c}</li>) : null}
                  </ul>
                </div>
              </div>

              {/* Other Insights */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Campus Vibe</p>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-body)", lineHeight: 1.5 }}>{insights.campusVibe}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Placement Reality</p>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-body)", lineHeight: 1.5 }}>{insights.placementReality}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Coding Culture</p>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-body)", lineHeight: 1.5 }}>{insights.codingCultureReview}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Peer Environment</p>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-body)", lineHeight: 1.5 }}>{insights.peerCompetitiveness}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── Actions ───────────────────────────────── */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
        <button
          className={`btn-ghost ${isCompared ? "active" : ""}`}
          style={{
            padding: "0.55rem 1.2rem",
            fontSize: "0.875rem",
            borderColor: isCompared ? "var(--neon-purple)" : undefined,
            color: isCompared ? "var(--neon-purple)" : undefined,
            opacity: !canCompare ? 0.4 : 1,
            cursor: !canCompare ? "not-allowed" : "pointer",
          }}
          onClick={() => canCompare && onCompareToggle(college)}
          disabled={!canCompare}
          title={!canCompare ? "Max 3 colleges for comparison" : undefined}
        >
          {isCompared ? "✓ Comparing" : "⊕ Compare"}
        </button>
      </div>
    </div>
  );
}

export default memo(CollegeCard);
