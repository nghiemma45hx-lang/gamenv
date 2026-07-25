export interface QuizOption {
  text: string;
}

export interface QuizItem {
  id: number;
  question: string;
  options: string[];
  correct: number; // 0-based index
  explanation: string;
  category?: string;
}

export interface SubjectTopic {
  id: string;
  name: string; // e.g. "Chiếc Gậy Trường Sơn" or "Lịch Sử Việt Nam"
  subjectCategory: string; // e.g. "Ngữ Văn", "Lịch Sử", "Địa Lý", "Tiếng Anh", "Toán Học"
  iconEmoji: string; // e.g. "🪖", "📜", "🗺️", "🇬🇧", "🧮"
  description: string;
  badgeText: string; // e.g. "Lớp 11", "THPT", "Ôn Thi"
  isCustom?: boolean;
  questions: QuizItem[];
}

export type TimerSetting = 5 | 10 | 15 | 20 | 30 | 0; // 0 = unlimited

export interface PlayerInfo {
  name: string;
  classGroup: string;
  avatarEmoji: string;
  timerSetting: TimerSetting;
  shuffleOptions?: boolean;
}

export interface UserAnswer {
  questionId: number;
  questionText: string;
  options: string[];
  selectedOption: number;
  correctOption: number;
  isCorrect: boolean;
  timeSpent: number; // in seconds
  explanation: string;
}

export interface GameSummary {
  playerName: string;
  classGroup: string;
  subjectId?: string;
  subjectName?: string;
  subjectCategory?: string;
  score: number;
  maxScore: number;
  correctCount: number;
  totalQuestions: number;
  maxCombo: number;
  totalTimeSpent: number; // in seconds
  stars: number; // 1 to 3
  rankTitle: string;
  date: string;
  answers: UserAnswer[];
}

export type ScreenState = 'start' | 'playing' | 'ended' | 'review' | 'editor';

