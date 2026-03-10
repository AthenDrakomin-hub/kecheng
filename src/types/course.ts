export interface CourseSegment {
  time: string;
  title: string;
  content: string;
  imageSuggestion?: string;
  image?: string;
  isInteractive?: boolean;
}

export interface CourseDay {
  day: number;
  title: string;
  subtitle: string;
  week: string;
  weekTheme: string;
  segments: CourseSegment[];
  homework?: string;
  nextDayTeaser: string;
  highlights: string[];
}

export interface CourseModule {
  id: number;
  title: string;
  description: string;
  topics: string[];
}
