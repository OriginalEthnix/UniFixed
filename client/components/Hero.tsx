export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        padding: "6rem 2rem 2rem",
        overflow: "hidden",
      }}
    >
      {/* Left content */}
      <div
        style={{
          flex: 1,
          maxWidth: "640px",
          zIndex: 2,
          position: "relative",
        }}
      >
        <h1
          className="hero-stagger-1"
          style={{
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            lineHeight: 1.05,
            marginBottom: "0.5rem",
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ fontWeight: 300, color: "#fff" }}>Uni</span>
          <span className="gradient-text-full" style={{ fontWeight: 800 }}>
            Fixed
          </span>
        </h1>

        <p
          className="hero-stagger-2"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.35rem)",
            color: "var(--text-muted)",
            marginBottom: "2rem",
            fontWeight: 400,
          }}
        >
          AI powered college counseling
        </p>

        <div
          className="hero-stagger-3"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
            marginBottom: "2.5rem",
          }}
        >
          {["JoSAA", "CSAB", "MCC", "and many other", "counseling bodies"].map(
            (item, i) => (
              <span
                key={i}
                style={{
                  fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                  fontWeight: 500,
                  color: "var(--text-body)",
                }}
              >
                {item}
              </span>
            )
          )}
        </div>

        <div className="hero-stagger-4">
          <a href="#predict">
            <button className="btn-neon" style={{ fontSize: "1.05rem" }}>
              Get Started →
            </button>
          </a>
        </div>
      </div>

      {/* Right side — 3D Diamond */}
      <div
        className="hero-stagger-5"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div className="hero-graphic">
          <div className="globe-spin">
            {/* Globe */}
            <div className="neon-globe">
              <div className="globe-grid"></div>
              <div className="globe-equator"></div>
            </div>
            
            {/* Cap */}
            <div className="grad-cap">
              <div className="cap-board">
                <div className="cap-tassel"></div>
              </div>
              <div className="cap-base"></div>
            </div>
          </div>
          
          {/* Orbit dots */}
          <div className="orbit orbit-1"><div className="dot"></div></div>
          <div className="orbit orbit-2"><div className="dot"></div></div>
          <div className="orbit orbit-3"><div className="dot"></div></div>
          
          {/* Floor glow */}
          <div className="floor-glow"></div>
        </div>
      </div>

      {/* Tagline bottom-left */}
      <div
        className="hero-stagger-5"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "2rem",
          zIndex: 2,
        }}
      >
        <p className="tagline">Predict. Compare. Decide.</p>
      </div>
    </section>
  );
}