"use client";
import { useRouter } from "next/navigation";
import { useCompare } from "../hooks/useCompare";

export default function CompareDrawer() {
  const router = useRouter();
  const { compareList: selected, removeCollege, clearColleges, isLoaded } = useCompare();

  if (!isLoaded || selected.length === 0) return null;

  const handleCompare = () => {
    router.push(`/compare`);
  };

  return (
    <div className="compare-drawer" role="complementary" aria-label="Compare selection">
      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
        Compare ({selected.length}/3):
      </span>

      {selected.map((c) => (
        <div key={c.id} className="compare-chip">
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {c.name}
          </span>
          <button
            className="compare-chip-remove"
            onClick={() => removeCollege(c.id)}
            aria-label={`Remove ${c.name} from compare`}
          >
            ×
          </button>
        </div>
      ))}

      <div style={{ display: "flex", gap: "0.5rem", marginLeft: "auto" }}>
        <button className="btn-ghost" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }} onClick={clearColleges}>
          Clear
        </button>
        <button
          className="btn-neon"
          style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem" }}
          onClick={handleCompare}
          disabled={selected.length < 2}
        >
          Compare →
        </button>
      </div>
    </div>
  );
}
