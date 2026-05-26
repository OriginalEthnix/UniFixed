export interface CollegeInsight {
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
}

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
  insights?: CollegeInsight;
}
