import { QuizItem, PlayerInfo, GameSummary, SubjectTopic } from '../types';
import { DEFAULT_SUBJECTS, QUIZ_DATA } from '../quizData';

const SUBJECTS_STORAGE_KEY = 'chiec_gay_truong_son_subjects_v2';
const ACTIVE_SUBJECT_ID_KEY = 'chiec_gay_truong_son_active_subject_id_v2';
const RESULTS_STORAGE_KEY = 'chiec_gay_truong_son_results_v1';
const PLAYER_INFO_STORAGE_KEY = 'chiec_gay_truong_son_player_info_v1';

/**
 * Loads all subject topics from localStorage or returns default presets
 */
export function loadSubjectsList(): SubjectTopic[] {
  try {
    const data = localStorage.getItem(SUBJECTS_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load subjects list from storage:', err);
  }
  return DEFAULT_SUBJECTS;
}

/**
 * Saves entire list of subjects to localStorage
 */
export function saveSubjectsList(list: SubjectTopic[]): void {
  try {
    localStorage.setItem(SUBJECTS_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save subjects list to storage:', err);
  }
}

/**
 * Loads active subject ID
 */
export function loadActiveSubjectId(): string {
  try {
    const id = localStorage.getItem(ACTIVE_SUBJECT_ID_KEY);
    if (id) return id;
  } catch (err) {
    console.error('Failed to load active subject ID:', err);
  }
  return DEFAULT_SUBJECTS[0].id;
}

/**
 * Saves active subject ID
 */
export function saveActiveSubjectId(id: string): void {
  try {
    localStorage.setItem(ACTIVE_SUBJECT_ID_KEY, id);
  } catch (err) {
    console.error('Failed to save active subject ID:', err);
  }
}

/**
 * Helper to get currently active subject
 */
export function getActiveSubject(): SubjectTopic {
  const subjects = loadSubjectsList();
  const activeId = loadActiveSubjectId();
  const found = subjects.find((s) => s.id === activeId);
  return found || subjects[0] || DEFAULT_SUBJECTS[0];
}

/**
 * Resets subjects back to initial default presets
 */
export function resetSubjectsToDefault(): SubjectTopic[] {
  try {
    localStorage.removeItem(SUBJECTS_STORAGE_KEY);
    localStorage.removeItem(ACTIVE_SUBJECT_ID_KEY);
  } catch (err) {
    console.error('Failed to reset subjects storage:', err);
  }
  return DEFAULT_SUBJECTS;
}

/**
 * Legacy support: Loads active quiz list or fallback
 */
export function loadQuizList(): QuizItem[] {
  const activeSubject = getActiveSubject();
  return activeSubject.questions && activeSubject.questions.length > 0
    ? activeSubject.questions
    : QUIZ_DATA;
}

/**
 * Legacy & Active Subject question updater
 */
export function saveQuizList(list: QuizItem[], subjectId?: string): void {
  const subjects = loadSubjectsList();
  const targetId = subjectId || loadActiveSubjectId();
  const updated = subjects.map((sub) => {
    if (sub.id === targetId) {
      return { ...sub, questions: list };
    }
    return sub;
  });
  saveSubjectsList(updated);
}

/**
 * Loads saved player info
 */
export function loadPlayerInfo(): PlayerInfo | null {
  try {
    const data = localStorage.getItem(PLAYER_INFO_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to load player info:', err);
  }
  return null;
}

/**
 * Saves player info
 */
export function savePlayerInfo(info: PlayerInfo): void {
  try {
    localStorage.setItem(PLAYER_INFO_STORAGE_KEY, JSON.stringify(info));
  } catch (err) {
    console.error('Failed to save player info:', err);
  }
}

/**
 * Loads all saved student test results
 */
export function loadGameResults(): GameSummary[] {
  try {
    const data = localStorage.getItem(RESULTS_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load game results:', err);
  }
  return [];
}

/**
 * Saves a new game summary result
 */
export function saveGameResult(summary: GameSummary): GameSummary[] {
  try {
    const current = loadGameResults();
    const updated = [summary, ...current];
    localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save game result:', err);
    return [];
  }
}

/**
 * Deletes a single result record by index
 */
export function deleteSingleGameResult(index: number): GameSummary[] {
  try {
    const current = loadGameResults();
    const updated = current.filter((_, idx) => idx !== index);
    localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete game result:', err);
    return loadGameResults();
  }
}

/**
 * Clears all saved test results
 */
export function clearAllGameResults(): void {
  try {
    localStorage.removeItem(RESULTS_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear game results:', err);
  }
}
