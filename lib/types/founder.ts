export interface FounderTrackRecord {
  year: string;
  achievement: string;
  description: string;
}

export interface Founder {
  id: string;
  name: string;
  title: string;
  role: string;
  quote: string;
  photoUrl: string;
  cvSummary: string;
  visionStatement: string;
  trackRecord: FounderTrackRecord[];
  education: string[];
  careerHighlights: string[];
}
