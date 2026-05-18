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
        <div className="diamond-wrapper">
          <div
            className="diamond"
            style={{ transform: "rotate(45deg)" }}
          >
            <div
              className="diamond"
              style={{
                width: "60%",
                height: "60%",
                position: "absolute",
                top: "20%",
                left: "20%",
                animation: "diamondRotate 16s linear infinite reverse",
              }}
            />
          </div>
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