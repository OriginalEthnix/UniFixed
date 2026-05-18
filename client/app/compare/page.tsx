"use client";

import { useSearchParams } from "next/navigation";
import { colleges } from "../../Data/colleges";

export default function ComparePage() {
  const searchParams = useSearchParams();

  const college1Name =
    searchParams.get("college1") || "DTU";

  const college2Name =
    searchParams.get("college2") || "NSUT";

  const college1 = colleges.find(
    (c) => c.name === college1Name
  );

  const college2 = colleges.find(
    (c) => c.name === college2Name
  );

  if (!college1 || !college2) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        College not found
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      
      <h1 className="text-5xl font-bold mb-10">
        Compare Colleges
      </h1>

      <div className="overflow-x-auto">
        
        <table className="w-full border border-zinc-800 rounded-2xl overflow-hidden">
          
          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Feature</th>
              <th className="p-4 text-left">
                {college1.name}
              </th>
              <th className="p-4 text-left">
                {college2.name}
              </th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-t border-zinc-800">
              <td className="p-4">Branch</td>
              <td className="p-4">{college1.branch}</td>
              <td className="p-4">{college2.branch}</td>
            </tr>

            <tr className="border-t border-zinc-800">
              <td className="p-4">Average Package</td>
              <td className="p-4">{college1.package}</td>
              <td className="p-4">{college2.package}</td>
            </tr>

            <tr className="border-t border-zinc-800">
              <td className="p-4">NIRF Ranking</td>
              <td className="p-4">
                #{college1.nirf}
              </td>
              <td className="p-4">
                #{college2.nirf}
              </td>
            </tr>

            <tr className="border-t border-zinc-800">
              <td className="p-4">Campus Life</td>
              <td className="p-4">
                {college1.campus}
              </td>
              <td className="p-4">
                {college2.campus}
              </td>
            </tr>

            <tr className="border-t border-zinc-800">
              <td className="p-4">Coding Culture</td>
              <td className="p-4">
                {college1.codingCulture}
              </td>
              <td className="p-4">
                {college2.codingCulture}
              </td>
            </tr>

            <tr className="border-t border-zinc-800">
              <td className="p-4">Fees</td>
              <td className="p-4">
                {college1.fees}
              </td>
              <td className="p-4">
                {college2.fees}
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </main>
  );
}