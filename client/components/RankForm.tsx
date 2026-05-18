"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RankForm() {
  const [rank, setRank] = useState("");
  const [exam, setExam] = useState("JEE Main");

  const router = useRouter();

  const handlePredict = () => {
    if (!rank) {
      alert("Please enter your rank");
      return;
    }

    router.push(
      `/results?rank=${rank}&exam=${encodeURIComponent(exam)}`
    );
  };

  return (
    <section
      id="predict"
      style={{
        width: "100%",
        maxWidth: "480px",
        margin: "0 auto",
      }}
    >
      <h2
        className="gradient-text"
        style={{
          fontSize: "1.8rem",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
      >
        Enter Your Rank
      </h2>

      <div
        className="glass-card"
        style={{ padding: "2rem" }}
      >
        <input
          type="number"
          placeholder="Enter your rank"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          className="input-glass"
          style={{ marginBottom: "1rem" }}
        />

        <select
          value={exam}
          onChange={(e) => setExam(e.target.value)}
          className="input-glass"
          style={{ marginBottom: "1.5rem" }}
        >
          <option>JEE Main</option>
          <option>JEE Advanced</option>
          <option>NEET</option>
          <option>VITEEE</option>
        </select>

        <button
          onClick={handlePredict}
          className="btn-neon"
          style={{ width: "100%" }}
        >
          Predict Colleges
        </button>
      </div>
    </section>
  );
}