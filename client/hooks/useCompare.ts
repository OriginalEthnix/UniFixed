"use client";

import { useState, useEffect, useCallback } from "react";

export interface CollegeData {
  id: number;
  name: string;
  branch: string;
  exam: string;
  closingRank: number;
  nirf: number;
  hostel: string;
  campus: string;
  fees: string;
  package: string;
  codingCulture: string;
  placementScore: number;
  category: "Safe" | "Target" | "Dream";
  insights?: {
    pros?: string[];
    cons?: string[];
    campusVibe?: string;
    codingCultureReview?: string;
    placementReality?: string;
    hostelReview?: string;
    peerCompetitiveness?: string;
    attendanceStrictness?: string;
    cityLife?: string;
    startupCulture?: string;
    facultyQuality?: string;
    aiRecommendation?: string;
  };
}

const STORAGE_KEY = "compareColleges";

export function useCompare() {
  const [compareList, setCompareListState] = useState<CollegeData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadState = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setCompareListState(JSON.parse(stored));
        } else {
          setCompareListState([]);
        }
      } catch (e) {
        console.error("Failed to parse compareColleges from localStorage", e);
      }
      setIsLoaded(true);
    };

    loadState();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        loadState();
      }
    };
    
    const handleCustomEvent = () => {
      loadState();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("compareUpdate", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("compareUpdate", handleCustomEvent);
    };
  }, []);

  const addCollege = useCallback((college: CollegeData) => {
    setCompareListState(prev => {
      if (prev.some(c => c.id === college.id)) return prev;
      if (prev.length >= 3) return prev;
      const next = [...prev, college];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setTimeout(() => window.dispatchEvent(new Event("compareUpdate")), 0);
      return next;
    });
  }, []);

  const removeCollege = useCallback((id: number) => {
    setCompareListState(prev => {
      const next = prev.filter(c => c.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setTimeout(() => window.dispatchEvent(new Event("compareUpdate")), 0);
      return next;
    });
  }, []);

  const clearColleges = useCallback(() => {
    setCompareListState([]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    setTimeout(() => window.dispatchEvent(new Event("compareUpdate")), 0);
  }, []);

  const toggleCollege = useCallback((college: CollegeData) => {
    setCompareListState(prev => {
      if (prev.some(c => c.id === college.id)) {
        const next = prev.filter(c => c.id !== college.id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setTimeout(() => window.dispatchEvent(new Event("compareUpdate")), 0);
        return next;
      } else {
        if (prev.length >= 3) return prev;
        const next = [...prev, college];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setTimeout(() => window.dispatchEvent(new Event("compareUpdate")), 0);
        return next;
      }
    });
  }, []);

  return {
    compareList,
    isLoaded,
    addCollege,
    removeCollege,
    clearColleges,
    toggleCollege
  };
}
