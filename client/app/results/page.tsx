"use client";

import { Suspense, useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import ScrollReveal from "../../components/ScrollReveal";
import SkeletonCard from "../../components/SkeletonCard";
import PredictionTabs, { TabType } from "../../components/PredictionTabs";
import CollegeCard, { CollegeData } from "../../components/CollegeCard";
import CompareDrawer from "../../components/CompareDrawer";

// ── Types ─────────────────────────────────────────────────────────────────────
type SortKey = "nirf" | "package" | "fees" | "rank";
type QuickFilter = "lowFees" | "topNirf" | "bestPlacements" | null;

// ── Helpers ───────────────────────────────────────────────────────────────────
function parseFees(fees: string): number {
  const m = fees.match(/[\d.]+/);
  return m ? parseFloat(m[0]) : 999;
}
function parsePackage(pkg: string): number {
  const m = pkg.match(/[\d.]+/);
  return m ? parseFloat(m[0]) : 0;
}

// ── Main content ──────────────────────────────────────────────────────────────
function ResultsContent() {
  const searchParams = useSearchParams();
  const userRank = Number(searchParams.get("rank"));
  const exam     = searchParams.get("exam")     || "JEE Main";
  const category = searchParams.get("category") || "General";
  const quota    = searchParams.get("quota")    || "AI";

  const [colleges,       setColleges]       = useState<CollegeData[]>([]);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState("");
  const [search,         setSearch]         = useState("");
  const [sortBy,         setSortBy]         = useState<SortKey>("nirf");
  const [activeTab,      setActiveTab]      = useState<TabType>("All");
  const [quickFilter,    setQuickFilter]    = useState<QuickFilter>(null);
  const [favorites,      setFavorites]      = useState<number[]>([]);
  const [compareList,    setCompareList]    = useState<CollegeData[]>([]);

  // ── Fetch favorites and compare state from localStorage ────────
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem("unifixed_favorites");
      if (storedFavs) setFavorites(JSON.parse(storedFavs));
      
      const storedCompare = localStorage.getItem("compareColleges");
      if (storedCompare) setCompareList(JSON.parse(storedCompare));
    } catch { /* ignore */ }
  }, []);

  // ── Fetch predictions ────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(
          `${API_BASE_URL}/predict?rank=${userRank}&exam=${encodeURIComponent(exam)}&category=${encodeURIComponent(category)}&quota=${encodeURIComponent(quota)}`
        );
        const data = await res.json();
        console.log(`[Results] Received ${Array.isArray(data) ? data.length : 0} results`);
        if (Array.isArray(data)) {
          setColleges(data);
        } else {
          console.error("Non-array response:", data);
          setColleges([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Server is waking up or unavailable. Please try again in a few seconds.");
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  // ── Favorites ────────────────────────────────────────────────────────────────
  const handleFavoriteToggle = useCallback((id: number) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try { localStorage.setItem("unifixed_favorites", JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  // ── Compare ───────────────────────────────────────────────────────────────────
  const handleCompareToggle = useCallback((college: CollegeData) => {
    setCompareList(prev => {
      let next;
      if (prev.some(c => c.id === college.id)) {
        next = prev.filter(c => c.id !== college.id);
      } else if (prev.length < 3) {
        next = [...prev, college];
      } else {
        next = prev;
      }
      try { localStorage.setItem("compareColleges", JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const handleCompareRemove = useCallback((id: number) => {
    setCompareList(prev => {
      const next = prev.filter(c => c.id !== id);
      try { localStorage.setItem("compareColleges", JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const handleCompareClear = useCallback(() => {
    setCompareList([]);
    try { localStorage.setItem("compareColleges", JSON.stringify([])); } catch { /* ignore */ }
  }, []);

  // ── Filtering + sorting ───────────────────────────────────────────────────────
  const displayedColleges = useMemo(() => {
    let list = [...colleges];

    // Tab filter
    if (activeTab !== "All") list = list.filter(c => c.category === activeTab);

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) || c.branch.toLowerCase().includes(q)
      );
    }

    // Quick filters
    if (quickFilter === "lowFees")       list = list.filter(c => parseFees(c.fees) <= 10);
    if (quickFilter === "topNirf")       list = list.filter(c => c.nirf <= 30);
    if (quickFilter === "bestPlacements")list = list.filter(c => c.placementScore >= 8);

    // Sort
    list.sort((a, b) => {
      if (sortBy === "nirf")    return a.nirf - b.nirf;
      if (sortBy === "rank")    return a.closingRank - b.closingRank;
      if (sortBy === "fees")    return parseFees(a.fees) - parseFees(b.fees);
      if (sortBy === "package") return parsePackage(b.package) - parsePackage(a.package);
      return 0;
    });

    return list;
  }, [colleges, activeTab, search, quickFilter, sortBy]);

  // ── Loading skeletons ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ position: "relative", zIndex: 2, padding: "7rem 2rem 4rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <div className="skeleton" style={{ height: "48px", width: "320px", marginBottom: "0.75rem" }} />
          <div className="skeleton" style={{ height: "18px", width: "240px" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div style={{ position: "relative", zIndex: 2, padding: "10rem 2rem", display: "flex", justifyContent: "center" }}>
        <div className="glass-card" style={{ padding: "2.5rem", maxWidth: "480px", textAlign: "center" }}>
          <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>⚠️</span>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#f87171", marginBottom: "0.75rem" }}>Connection Error</h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>{error}</p>
          <button className="btn-neon" style={{ marginTop: "1.5rem" }} onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", zIndex: 2, padding: "7rem 1.5rem 8rem", maxWidth: "1200px", margin: "0 auto" }}>

      {/* ── Page header ── */}
      <div style={{ marginBottom: "2rem", animation: "fadeUp 0.6s ease-out both" }}>
        <h1 className="gradient-text" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, marginBottom: "0.4rem" }}>
          Predicted Colleges
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
          {exam} &middot; Rank <span style={{ color: "var(--neon-cyan)", fontWeight: 600 }}>{userRank.toLocaleString()}</span>
          &nbsp;&middot; {category} &middot; {quota} Quota
        </p>
      </div>

      {/* ── Summary banner ── */}
      {colleges.length > 0 && (
        <div className="summary-banner" style={{ marginBottom: "1.5rem", animation: "fadeUp 0.6s ease-out 0.1s both" }}>
          <span>🎓</span>
          <span>
            Showing <strong>{displayedColleges.length}</strong> of <strong>{colleges.length}</strong> colleges for{" "}
            <strong>{exam}</strong> · <strong>{category}</strong> · <strong>{quota} Quota</strong>
          </span>
          {colleges.filter(c => c.category === "Safe").length > 0 && (
            <span style={{ marginLeft: "auto", color: "#34d399", fontSize: "0.85rem", fontWeight: 600 }}>
              ✓ {colleges.filter(c => c.category === "Safe").length} Safe choices found
            </span>
          )}
        </div>
      )}

      {/* ── Controls bar ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.75rem", animation: "fadeUp 0.6s ease-out 0.2s both" }}>

        {/* Tabs + Sort row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
          <PredictionTabs
            activeTab={activeTab}
            onTabChange={(tab) => { setActiveTab(tab); setQuickFilter(null); }}
            colleges={colleges}
          />
          <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortKey)}
              className="input-glass"
              style={{ minWidth: "180px", fontSize: "0.875rem", padding: "0.55rem 2.5rem 0.55rem 1rem" }}
              id="sort-select"
            >
              <option value="nirf">Sort: Best NIRF</option>
              <option value="package">Sort: Highest Package</option>
              <option value="fees">Sort: Lowest Fees</option>
              <option value="rank">Sort: Closing Rank ↑</option>
            </select>
          </div>
        </div>

        {/* Search + Quick filter chips row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search college or branch..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-glass"
            style={{ flex: "1 1 200px", fontSize: "0.875rem", padding: "0.55rem 1rem" }}
            id="college-search"
          />
          {(["lowFees", "topNirf", "bestPlacements"] as const).map((key) => {
            const labels: Record<string, string> = { lowFees: "💸 Low Fees", topNirf: "🏆 Top NIRF", bestPlacements: "🚀 Best Placements" };
            return (
              <button
                key={key}
                className={`filter-chip ${quickFilter === key ? "active" : ""}`}
                onClick={() => setQuickFilter(prev => prev === key ? null : key)}
              >
                {labels[key]}
              </button>
            );
          })}
          {(search || quickFilter) && (
            <button
              className="filter-chip"
              onClick={() => { setSearch(""); setQuickFilter(null); }}
              style={{ borderColor: "var(--neon-pink)", color: "var(--neon-pink)" }}
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Empty state ── */}
      {displayedColleges.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            No colleges found
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "400px", margin: "0 auto", lineHeight: 1.7 }}>
            {colleges.length === 0
              ? "No colleges match your rank, category, and quota. Try changing your filters."
              : "Try clearing the search or removing quick filters."}
          </p>
          {colleges.length === 0 && (
            <button className="btn-ghost" style={{ marginTop: "1.5rem" }} onClick={() => history.back()}>
              ← Go Back
            </button>
          )}
        </div>
      )}

      {/* ── College cards ── */}
      {displayedColleges.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {displayedColleges.map((college, index) => (
            <CollegeCard
              key={college.id}
              college={college}
              index={index}
              favorites={favorites}
              onFavoriteToggle={handleFavoriteToggle}
              compareSelected={compareList}
              onCompareToggle={handleCompareToggle}
            />
          ))}
        </div>
      )}

      {/* ── Compare floating drawer ── */}
      <CompareDrawer
        selected={compareList}
        onRemove={handleCompareRemove}
        onClear={handleCompareClear}
      />
    </div>
  );
}

// ── Page wrapper ───────────────────────────────────────────────────────────────
export default function ResultsPage() {
  return (
    <main className="page-wrapper">
      <div className="dot-grid-overlay" />

      <div className="orb orb-purple" style={{ width: "500px", height: "500px", top: "0%", right: "-10%", opacity: 0.25 }} />
      <div className="orb orb-cyan"   style={{ width: "400px", height: "400px", bottom: "15%", left: "-8%", opacity: 0.2, animationDelay: "3s" }} />
      <div className="orb orb-pink"   style={{ width: "300px", height: "300px", top: "50%", left: "40%", opacity: 0.12, animationDelay: "6s" }} />

      <Navbar />

      <Suspense
        fallback={
          <div style={{ position: "relative", zIndex: 2, padding: "7rem 2rem 4rem", maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        }
      >
        <ResultsContent />
      </Suspense>

      <ScrollReveal />
    </main>
  );
}