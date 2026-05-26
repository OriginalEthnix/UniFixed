"use client";
import { useMemo } from "react";
import { CollegeData } from "../types/college";

export type TabType = "All" | "Safe" | "Target" | "Dream";

interface PredictionTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  colleges: CollegeData[];
}

const TABS: { key: TabType; label: string; activeClass: string }[] = [
  { key: "All",    label: "All",    activeClass: "active-all"    },
  { key: "Safe",   label: "✓ Safe",   activeClass: "active-safe"   },
  { key: "Target", label: "◎ Target", activeClass: "active-target" },
  { key: "Dream",  label: "★ Dream",  activeClass: "active-dream"  },
];

export default function PredictionTabs({ activeTab, onTabChange, colleges }: PredictionTabsProps) {
  const counts = useMemo(() => ({
    All:    colleges.length,
    Safe:   colleges.filter(c => c.category === "Safe").length,
    Target: colleges.filter(c => c.category === "Target").length,
    Dream:  colleges.filter(c => c.category === "Dream").length,
  }), [colleges]);

  return (
    <div className="pred-tabs" role="tablist">
      {TABS.map(({ key, label, activeClass }) => (
        <button
          key={key}
          role="tab"
          aria-selected={activeTab === key}
          className={`pred-tab ${activeTab === key ? activeClass : ""}`}
          onClick={() => onTabChange(key)}
        >
          {label}
          <span className="tab-count">{counts[key]}</span>
        </button>
      ))}
    </div>
  );
}
