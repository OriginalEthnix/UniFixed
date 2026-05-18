"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const userRank = Number(searchParams.get("rank"));
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("nirf");
  const [colleges, setColleges] = useState<any[]>([]);
  
  const router = useRouter();

  useEffect(() => {
  const fetchColleges = async () => {
    try {
      const response = await fetch(
  `http://localhost:5000/predict?rank=${userRank}`
);

      const data = await response.json();

      setColleges(data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  };

  fetchColleges();
}, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      
      <h1 className="text-5xl font-bold mb-3">
        Predicted Colleges
      </h1>

      <p className="text-zinc-400 mb-10">
        Showing results for rank {userRank}
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
  
  <input
    type="text"
    placeholder="Search colleges..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-xl w-full"
  />

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-xl"
  >
    <option value="nirf">Sort by NIRF</option>
    <option value="package">Sort by Package</option>
  </select>

</div>

      <div className="space-y-6">
        
        {[...colleges]
  .filter((college) =>
    college.name.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (sortBy === "nirf") {
      return a.nirf - b.nirf;
    }

    return (
      parseInt(b.package) -
      parseInt(a.package)
    );
  })
  .map((college, index) => {
          return (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl"
            >
              
              <div className="flex items-center justify-between">
                
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {college.name}
                  </h2>

                  <p className="text-zinc-400">
                    {college.branch}
                  </p>
                </div>

                <div className="text-right">
                  
                  <p className="text-lg font-medium">
                    {college.package}
                  </p>

                  <p className="text-zinc-500 text-sm">
                    Avg Package
                  </p>

                </div>

              </div>

              <div className="mt-6 flex gap-4 flex-wrap">
                
                <div className="bg-zinc-800 px-4 py-2 rounded-xl">
                  NIRF #{college.nirf}
                </div>

                <div className="bg-zinc-800 px-4 py-2 rounded-xl">
                  Closing Rank {college.closingRank}
                </div>

                <div
                  className={`
                    px-4 py-2 rounded-xl
                    ${
                      college.category === "Safe"
                        ? "bg-green-500/20 text-green-400"
                        : college.category === "Target"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }
                  `}
                >
                  {college.category}
                </div>

              </div>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
  
  <div className="bg-zinc-800 p-4 rounded-xl min-h-[90px]">
    <p className="text-zinc-400 text-sm">Hostel</p>
    <p className="font-medium">{college.hostel}</p>
  </div>

  <div className="bg-zinc-800 p-4 rounded-xl min-h-[90px]">
    <p className="text-zinc-400 text-sm">Campus</p>
    <p className="font-medium">{college.campus}</p>
  </div>

  <div className="bg-zinc-800 p-4 rounded-xl min-h-[90px]">
    <p className="text-zinc-400 text-sm">Coding Culture</p>
    <p className="font-medium">{college.codingCulture}</p>
  </div>

  <div className="bg-zinc-800 p-4 rounded-xl min-h-[90px]">
    <p className="text-zinc-400 text-sm">Fees</p>
    <p className="font-medium">{college.fees}</p>
  </div>

</div>
          <div className="mt-6">
  
  <div className="flex items-center justify-between mb-2">
    <p className="text-sm text-zinc-400">
      Placement Strength
    </p>

    <p className="text-sm font-medium">
      {college.placementScore}/10
    </p>
  </div>

  <div
    style={{
      width: "100%",
      height: "16px",
      backgroundColor: "#27272a",
      borderRadius: "9999px",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${college.placementScore * 10}%`,
        height: "100%",
        backgroundColor:
          college.placementScore >= 8
            ? "#22c55e"
            : college.placementScore >= 6
            ? "#eab308"
            : "#ef4444",
        borderRadius: "9999px",
      }}
    ></div>
  </div>

</div>
              <button
  onClick={() =>
  router.push(
    `/compare?college=${encodeURIComponent(college.name)}`
  )
}
  className="mt-6 bg-white text-black px-4 py-2 rounded-xl font-medium hover:opacity-90 transition"
>
  Compare
</button>

            </div>
          );
        })}

      </div>

    </main>
  );
}