"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`nav-bar ${scrolled ? "scrolled" : ""}`}>
      <Link href="/" className="nav-logo" style={{ textDecoration: "none" }}>
        <span className="thin">Uni</span>
        <span className="bold gradient-text">Fixed</span>
      </Link>

      <div className="nav-links">
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/favorites" className="nav-link">
          Favorites
        </Link>
        <Link href="/compare" className="nav-link">
          Compare
        </Link>
        <button className="btn-ghost">Login</button>
      </div>
    </nav>
  );
}