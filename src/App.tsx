import React, { useState } from 'react';
import { QuizItem, PlayerInfo, ScreenState, UserAnswer, GameSummary } from './types';
import { QUIZ_DATA, RANK_TITLES } from './quizData';
import { Header } from './components/Header';
import { StartScreen } from './components/StartScreen';
import { PlayScreen } from './components/PlayScreen';
import { EndScreen } from './components/EndScreen';
import { TeacherEditor } from './components/TeacherEditor';
import { shuffleQuizOptions } from './utils/shuffle';

export default function App() {
  const [quizList, setQuizList] = useState<QuizItem[]>(QUIZ_DATA);
  const [activeQuizList, setActiveQuizList] = useState<QuizItem[]>(QUIZ_DATA);
  const [screenState, setScreenState] = useState<ScreenState>('start');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
    name: '',
    classGroup: 'Lớp 11',
    avatarEmoji: '🪖',
    timerSetting: 20,
    shuffleOptions: true,
  });

  const [gameSummary, setGameSummary] = useState<GameSummary | null>(null);
  const [activeScore, setActiveScore] = useState<number>(0);
  const [activeCombo, setActiveCombo] = useState<number>(0);

  const handleStartGame = () => {
    setActiveScore(0);
    setActiveCombo(0);
    
    // Prepare question list (shuffle options if enabled)
    if (playerInfo.shuffleOptions !== false) {
      setActiveQuizList(shuffleQuizOptions(quizList));
    } else {
      setActiveQuizList(quizList);
    }
    
    setScreenState('playing');
  };

  const handleFinishGame = (
    answers: UserAnswer[],
    finalScore: number,
    maxCombo: number,
    totalTimeSpent: number
  ) => {
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const accuracyPct = Math.round((correctCount / activeQuizList.length) * 100);

    // Find rank title & stars
    let rankObj = RANK_TITLES[0];
    if (accuracyPct >= 90) rankObj = RANK_TITLES[2];
    else if (accuracyPct >= 60) rankObj = RANK_TITLES[1];

    const todayStr = new Date().toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const summaryObj: GameSummary = {
      playerName: playerInfo.name || 'Chiến sĩ Trường Sơn',
      classGroup: playerInfo.classGroup || 'Trường Sơn',
      score: finalScore,
      maxScore: activeQuizList.length * 10 + (maxCombo > 1 ? maxCombo * 5 : 0),
      correctCount,
      totalQuestions: activeQuizList.length,
      maxCombo,
      totalTimeSpent,
      stars: rankObj.stars,
      rankTitle: rankObj.title,
      date: todayStr,
      answers,
    };

    setGameSummary(summaryObj);
    setScreenState('ended');
  };

  const handleRestart = () => {
    setScreenState('start');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-emerald-950 to-stone-900 text-stone-100 flex flex-col justify-between p-4 sm:p-6 font-sans selection:bg-amber-400 selection:text-stone-950 relative overflow-x-hidden">
      {/* Background Decorative Forest & Camouflage Gradients */}
      <div className="fixed inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="w-full max-w-5xl mx-auto relative z-10 flex-1 flex flex-col">
        {/* Header Bar */}
        <Header
          screenState={screenState}
          setScreenState={setScreenState}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          playerName={playerInfo.name}
          score={activeScore}
          combo={activeCombo}
          onRestart={handleRestart}
        />

        {/* Main View Area */}
        <main className="flex-1 flex items-center justify-center my-auto py-4">
          {screenState === 'start' && (
            <StartScreen
              playerInfo={playerInfo}
              setPlayerInfo={setPlayerInfo}
              onStartGame={handleStartGame}
              totalQuestions={quizList.length}
            />
          )}

          {screenState === 'playing' && (
            <PlayScreen
              quizList={activeQuizList}
              playerInfo={playerInfo}
              onFinishGame={handleFinishGame}
            />
          )}

          {screenState === 'ended' && gameSummary && (
            <EndScreen
              summary={gameSummary}
              quizList={activeQuizList}
              onRestart={handleRestart}
            />
          )}

          {screenState === 'editor' && (
            <TeacherEditor
              quizList={quizList}
              setQuizList={setQuizList}
              onClose={() => setScreenState('start')}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-stone-500 font-medium py-3 border-t border-stone-800/60">
          <p>
            Trò chơi Giáo dục Ngữ văn: <strong className="text-amber-400/80">Chiếc Gậy Trường Sơn</strong> • Thiết kế phục vụ giảng dạy & học tập tương tác
          </p>
        </footer>
      </div>
    </div>
  );
}
