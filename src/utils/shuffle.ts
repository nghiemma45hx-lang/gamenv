import { QuizItem } from '../types';

/**
 * Shuffles the options of each quiz question randomly and updates the correct answer index.
 * Automatically cleans up existing "A.", "B." prefixes and re-applies ordered prefixes.
 */
export function shuffleQuizOptions(quizList: QuizItem[]): QuizItem[] {
  return quizList.map((item) => {
    // 1. Identify the correct answer text
    const originalCorrectText = item.options[item.correct] || '';
    const cleanCorrectText = originalCorrectText.replace(/^[A-Za-z0-9]+\.\s*/, '').trim();

    // 2. Clean option texts
    const cleanOptions = item.options.map((opt) =>
      opt.replace(/^[A-Za-z0-9]+\.\s*/, '').trim()
    );

    // 3. Fisher-Yates shuffle
    const shuffled = [...cleanOptions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 4. Find new correct index
    let newCorrectIndex = shuffled.indexOf(cleanCorrectText);
    if (newCorrectIndex === -1) {
      newCorrectIndex = 0; // fallback safety
    }

    // 5. Re-apply clean prefixes (A., B., C., D.)
    const formattedOptions = shuffled.map(
      (optText, idx) => `${String.fromCharCode(65 + idx)}. ${optText}`
    );

    return {
      ...item,
      options: formattedOptions,
      correct: newCorrectIndex,
    };
  });
}
