import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RankForm from "../components/RankForm";
import Features from "../components/Features";
import ScrollReveal from "../components/ScrollReveal";

export default function Home() {
  return (
    <main className="page-wrapper">
      {/* Dot grid overlay */}
      <div className="dot-grid-overlay" />

      {/* Floating background orbs */}
      <div
        className="orb orb-purple"
        style={{
          width: "500px",
          height: "500px",
          top: "10%",
          right: "-10%",
          opacity: 0.4,
        }}
      />
      <div
        className="orb orb-cyan"
        style={{
          width: "400px",
          height: "400px",
          bottom: "20%",
          left: "-8%",
          opacity: 0.3,
          animationDelay: "2s",
        }}
      />
      <div
        className="orb orb-pink"
        style={{
          width: "300px",
          height: "300px",
          top: "60%",
          right: "15%",
          opacity: 0.25,
          animationDelay: "4s",
        }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section — Full Viewport */}
      <Hero />

      {/* Neon Separator */}
      <div className="neon-separator" />

      {/* Predict Section */}
      <div
        className="fade-section"
        style={{
          position: "relative",
          zIndex: 2,
          padding: "2rem 1rem 4rem",
        }}
      >
        <RankForm />
      </div>

      {/* Neon Separator */}
      <div className="neon-separator" />

      {/* Features Section */}
      <div
        className="fade-section"
        style={{
          position: "relative",
          zIndex: 2,
          padding: "2rem 1rem 6rem",
        }}
      >
        <Features />
      </div>

      {/* Scroll Reveal Observer */}
      <ScrollReveal />
    </main>
  );
}