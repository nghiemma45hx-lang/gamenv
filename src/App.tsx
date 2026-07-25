import React, { useState, useEffect } from 'react';
import { QuizItem, PlayerInfo, ScreenState, UserAnswer, GameSummary, SubjectTopic } from './types';
import { RANK_TITLES } from './quizData';
import { Header } from './components/Header';
import { StartScreen } from './components/StartScreen';
import { PlayScreen } from './components/PlayScreen';
import { EndScreen } from './components/EndScreen';
import { TeacherEditor } from './components/TeacherEditor';
import { AdminAuthModal } from './components/AdminAuthModal';
import { SubjectSelectorModal } from './components/SubjectSelectorModal';
import { shuffleQuizOptions } from './utils/shuffle';
import {
  loadSubjectsList,
  loadActiveSubjectId,
  saveActiveSubjectId,
  getActiveSubject,
  loadPlayerInfo,
  savePlayerInfo,
  saveGameResult,
} from './utils/storage';

export default function App() {
  const [subjectsList, setSubjectsList] = useState<SubjectTopic[]>(() => loadSubjectsList());
  const [activeSubjectId, setActiveSubjectId] = useState<string>(() => loadActiveSubjectId());
  
  const activeSubject = subjectsList.find((s) => s.id === activeSubjectId) || subjectsList[0];

  const [quizList, setQuizList] = useState<QuizItem[]>(() => activeSubject?.questions || []);
  const [activeQuizList, setActiveQuizList] = useState<QuizItem[]>(quizList);
  const [screenState, setScreenState] = useState<ScreenState>('start');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Subject Modal State
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState<boolean>(false);

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Player Info with LocalStorage persistence
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>(() => {
    const saved = loadPlayerInfo();
    return saved || {
      name: '',
      classGroup: 'Lớp 11',
      avatarEmoji: '🪖',
      timerSetting: 20,
      shuffleOptions: true,
    };
  });

  const [gameSummary, setGameSummary] = useState<GameSummary | null>(null);
  const [activeScore, setActiveScore] = useState<number>(0);
  const [activeCombo, setActiveCombo] = useState<number>(0);

  // Synchronize playerInfo changes to localStorage
  useEffect(() => {
    savePlayerInfo(playerInfo);
  }, [playerInfo]);

  // Synchronize active subject questions when subject changes
  const refreshActiveSubjectData = () => {
    const updatedSubjects = loadSubjectsList();
    const currentActiveId = loadActiveSubjectId();
    const foundSub = updatedSubjects.find((s) => s.id === currentActiveId) || updatedSubjects[0];

    setSubjectsList(updatedSubjects);
    setActiveSubjectId(foundSub.id);
    if (foundSub && foundSub.questions) {
      setQuizList(foundSub.questions);
    }
  };

  const handleSelectSubject = (subjectId: string) => {
    setActiveSubjectId(subjectId);
    saveActiveSubjectId(subjectId);
    
    const foundSub = subjectsList.find((s) => s.id === subjectId);
    if (foundSub && foundSub.questions) {
      setQuizList(foundSub.questions);
    }
  };

  const handleRequestAdminMode = () => {
    if (isAdminAuthenticated) {
      setScreenState('editor');
    } else {
      setIsAdminModalOpen(true);
    }
  };

  const handleAdminAuthSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsAdminModalOpen(false);
    setScreenState('editor');
  };

  const handleLogoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setScreenState('start');
  };

  const handleStartGame = () => {
    setActiveScore(0);
    setActiveCombo(0);
    
    // Save student info
    savePlayerInfo(playerInfo);

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
      hour: '2-digit',
      minute: '2-digit'
    });

    const summaryObj: GameSummary = {
      playerName: playerInfo.name || 'Học viên Trường Sơn',
      classGroup: playerInfo.classGroup || 'Lớp Học',
      subjectId: activeSubject?.id,
      subjectName: activeSubject?.name || 'Chiếc Gậy Trường Sơn',
      subjectCategory: activeSubject?.subjectCategory || 'Ngữ Văn',
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

    // Save game summary result persistently to localStorage
    saveGameResult(summaryObj);

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
          onRequestAdminMode={handleRequestAdminMode}
          isAdminAuthenticated={isAdminAuthenticated}
          activeSubject={activeSubject}
          onOpenSubjectModal={() => setIsSubjectModalOpen(true)}
        />

        {/* Main View Area */}
        <main className="flex-1 flex items-center justify-center my-auto py-4">
          {screenState === 'start' && (
            <StartScreen
              playerInfo={playerInfo}
              setPlayerInfo={setPlayerInfo}
              onStartGame={handleStartGame}
              totalQuestions={quizList.length}
              activeSubject={activeSubject}
              onOpenSubjectModal={() => setIsSubjectModalOpen(true)}
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
              onLogoutAdmin={handleLogoutAdmin}
              onSubjectChanged={refreshActiveSubjectData}
            />
          )}
        </main>

        {/* Subject / Topic Selector Modal */}
        <SubjectSelectorModal
          isOpen={isSubjectModalOpen}
          subjects={subjectsList}
          activeSubjectId={activeSubjectId}
          onSelectSubject={handleSelectSubject}
          onClose={() => setIsSubjectModalOpen(false)}
          onOpenTeacherEditor={handleRequestAdminMode}
        />

        {/* Admin Password Verification Modal */}
        <AdminAuthModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          onSuccess={handleAdminAuthSuccess}
        />

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-stone-500 font-medium py-3 border-t border-stone-800/60">
          <p>
            Trò chơi Giáo dục Đa Môn Học: <strong className="text-amber-400/80">Chiếc Gậy Trường Sơn</strong> • Hệ thống Quản lý Chủ đề & Kết quả Học tập
          </p>
        </footer>
      </div>
    </div>
  );
}
