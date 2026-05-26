// Skeleton loading card — displayed while /predict is fetching
export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
        <div style={{ flex: 1 }}>
          <div className="skeleton" style={{ height: "22px", width: "65%", marginBottom: "0.6rem" }} />
          <div className="skeleton" style={{ height: "14px", width: "40%" }} />
        </div>
        <div className="skeleton" style={{ height: "20px", width: "80px", borderRadius: "99px" }} />
      </div>

      {/* Badge row */}
      <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.25rem" }}>
        <div className="skeleton" style={{ height: "32px", width: "100px", borderRadius: "99px" }} />
        <div className="skeleton" style={{ height: "32px", width: "120px", borderRadius: "99px" }} />
        <div className="skeleton" style={{ height: "32px", width: "80px", borderRadius: "99px" }} />
      </div>

      {/* Detail grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginBottom: "1.25rem" }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "0.85rem" }}>
            <div className="skeleton" style={{ height: "11px", width: "60%", marginBottom: "0.5rem" }} />
            <div className="skeleton" style={{ height: "14px", width: "80%" }} />
          </div>
        ))}
      </div>

      {/* Bar */}
      <div className="skeleton" style={{ height: "8px", borderRadius: "99px" }} />
    </div>
  );
}
