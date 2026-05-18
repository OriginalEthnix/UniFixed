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
    <div className="bg-zinc-900 p-6 rounded-2xl w-full max-w-md shadow-xl">
      
      <input
        type="number"
        placeholder="Enter your rank"
        value={rank}
        onChange={(e) => setRank(e.target.value)}
        className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 mb-4 outline-none"
      />

      <select
        value={exam}
        onChange={(e) => setExam(e.target.value)}
        className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 mb-4 outline-none"
      >
        <option>JEE Main</option>
        <option>JEE Advanced</option>
        <option>NEET</option>
        <option>VITEEE</option>
      </select>

      <button
        onClick={handlePredict}
        className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
      >
        Predict Colleges
      </button>

    </div>
  );
}