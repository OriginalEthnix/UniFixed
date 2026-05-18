const features = [
  {
    title: "AI Prediction",
    description: "Get smart college recommendations based on your rank.",
    icon: "🧠",
  },
  {
    title: "Safe / Target / Dream",
    description: "Understand your admission chances clearly.",
    icon: "🎯",
  },
  {
    title: "Placement Insights",
    description: "Compare average packages and opportunities.",
    icon: "📊",
  },
  {
    title: "College Comparison",
    description: "Compare colleges side-by-side easily.",
    icon: "⚡",
  },
];

export default function Features() {
  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 1rem",
      }}
    >
      <h2
        className="gradient-text"
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "3rem",
        }}
      >
        Why UniFixed?
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="glass-card fade-section"
            style={{
              padding: "2rem",
              transitionDelay: `${index * 0.1}s`,
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                filter: "saturate(0.8)",
              }}
            >
              {feature.icon}
            </div>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              {feature.title}
            </h3>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-muted)",
                lineHeight: 1.6,
              }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}