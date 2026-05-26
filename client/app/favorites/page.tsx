"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import CollegeCard, { CollegeData } from "../../components/CollegeCard";
import CompareDrawer from "../../components/CompareDrawer";
import { useCompare } from "../../hooks/useCompare";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [colleges, setColleges] = useState<CollegeData[]>([]);
  const [loading, setLoading] = useState(true);
  const { compareList, toggleCollege } = useCompare();

  // Load favorites from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("unifixed_favorites");
      if (stored) setFavorites(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  // Fetch college data to populate the favorites
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${API_BASE_URL}/colleges`);
        const data = await res.json();
        
        if (Array.isArray(data)) {
          const allBranches: CollegeData[] = [];
          data.forEach((college: any) => {
            college.branches.forEach((branch: any) => {
              allBranches.push({
                ...branch,
                name: college.name,
                nirf: college.nirf,
                hostel: college.hostel,
                campus: college.campus,
                fees: college.fees,
                package: branch.averagePackage,
                category: "Safe", // Default category for display in favorites
              });
            });
          });
          setColleges(allBranches);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  const handleFavoriteToggle = (id: number) => {
    setFavorites(prev => {
      const next = prev.filter(x => x !== id);
      try { localStorage.setItem("unifixed_favorites", JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const favoriteColleges = colleges.filter(c => favorites.includes(c.id));

  return (
    <main className="page-wrapper">
      <div className="dot-grid-overlay" />
      <div className="orb orb-pink" style={{ width: "400px", height: "400px", top: "10%", right: "-5%", opacity: 0.2 }} />
      <Navbar />

      <div style={{ position: "relative", zIndex: 2, padding: "7rem 1.5rem 8rem", maxWidth: "1200px", margin: "0 auto" }}>
        <button className="btn-ghost" style={{ marginBottom: "2rem", padding: "0.5rem 1rem", fontSize: "0.85rem" }} onClick={() => history.back()}>
          ← Go Back
        </button>

        <h1 className="gradient-text-full" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 800, marginBottom: "0.5rem", animation: "fadeUp 0.6s ease-out both" }}>
          Your Saved Colleges
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "3rem", animation: "fadeUp 0.6s ease-out 0.15s both" }}>
          Review your favorite picks and keep track of your dream choices.
        </p>

        {loading ? (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-400">Loading your favorites...</p>
          </div>
        ) : favoriteColleges.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">♡</span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
              No favorites yet
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "400px", margin: "0 auto" }}>
              When you see a college you like in the prediction results, click the heart icon to save it here!
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", animation: "fadeUp 0.6s ease-out 0.2s both" }}>
            {favoriteColleges.map((college, index) => (
              <CollegeCard
                key={college.id}
                college={college}
                index={index}
                favorites={favorites}
                onFavoriteToggle={handleFavoriteToggle}
                compareSelected={compareList}
                onCompareToggle={toggleCollege}
              />
            ))}
          </div>
        )}
      </div>
      <CompareDrawer />
    </main>
  );
}
