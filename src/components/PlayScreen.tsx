import React, { useEffect, useState, useRef } from 'react';
import { Clock, CheckCircle2, XCircle, ArrowRight, Lightbulb, Flame, Award, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizItem, PlayerInfo, UserAnswer } from '../types';
import { soundEngine } from '../audio';

interface PlayScreenProps {
  quizList: QuizItem[];
  playerInfo: PlayerInfo;
  onFinishGame: (answers: UserAnswer[], finalScore: number, maxCombo: number, totalTimeSpent: number) => void;
}

export const PlayScreen: React.FC<PlayScreenProps> = ({
  quizList,
  playerInfo,
  onFinishGame,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  // Timer states
  const [timeLeft, setTimeLeft] = useState<number>(playerInfo.timerSetting);
  const [isScreenShaking, setIsScreenShaking] = useState<boolean>(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQ = quizList[currentIdx];
  const maxTime = playerInfo.timerSetting;

  // Reset timer when question changes
  useEffect(() => {
    setSelectedOpt(null);
    setIsAnswered(false);
    setQuestionStartTime(Date.now());

    if (maxTime > 0) {
      setTimeLeft(maxTime);
      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIdx, maxTime]);

  const handleTimeOut = () => {
    if (isAnswered) return;
    soundEngine.playIncorrect();
    setIsScreenShaking(true);
    setTimeout(() => setIsScreenShaking(false), 500);

    setSelectedOpt(-1); // -1 = timed out
    setIsAnswered(true);
    setCombo(0);

    const spentSecs = Math.round((Date.now() - questionStartTime) / 1000);
    const answerObj: UserAnswer = {
      questionId: currentQ.id,
      questionText: currentQ.question,
      options: currentQ.options,
      selectedOption: -1,
      correctOption: currentQ.correct,
      isCorrect: false,
      timeSpent: spentSecs,
      explanation: currentQ.explanation,
    };

    setUserAnswers((prev) => [...prev, answerObj]);
  };

  const handleSelectOption = (optIdx: number) => {
    if (isAnswered) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const spentSecs = Math.round((Date.now() - questionStartTime) / 1000);
    const isRight = optIdx === currentQ.correct;

    setSelectedOpt(optIdx);
    setIsAnswered(true);

    if (isRight) {
      // Calculate score bonus with combo
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);

      if (newCombo > 1) {
        soundEngine.playComboChord(newCombo);
      } else {
        soundEngine.playCorrect();
      }

      const bonusPoints = 10 + (newCombo > 1 ? (newCombo - 1) * 5 : 0);
      setScore((prev) => prev + bonusPoints);

      // Trigger colorful Confetti particles
      confetti({
        particleCount: 50 + newCombo * 10,
        spread: 60,
        origin: { y: 0.7 },
      });
    } else {
      soundEngine.playIncorrect();
      setCombo(0);
      setIsScreenShaking(true);
      setTimeout(() => setIsScreenShaking(false), 500);
    }

    const answerObj: UserAnswer = {
      questionId: currentQ.id,
      questionText: currentQ.question,
      options: currentQ.options,
      selectedOption: optIdx,
      correctOption: currentQ.correct,
      isCorrect: isRight,
      timeSpent: spentSecs,
      explanation: currentQ.explanation,
    };

    setUserAnswers((prev) => [...prev, answerObj]);
  };

  const handleNextQuestion = () => {
    soundEngine.playClick();
    if (currentIdx + 1 < quizList.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Calculate total time
      const totalTime = userAnswers.reduce((acc, curr) => acc + curr.timeSpent, 0);
      onFinishGame(userAnswers, score, maxCombo, totalTime);
    }
  };

  // Progress Bar Percentage
  const timerPercentage = maxTime > 0 ? (timeLeft / maxTime) * 100 : 100;
  const isTimeCritical = maxTime > 0 && timeLeft <= 5;

  return (
    <div className={`w-full max-w-3xl mx-auto transition-transform ${isScreenShaking ? 'animate-bounce' : ''}`}>
      {/* Top Status Banner */}
      <div className="bg-stone-900/80 backdrop-blur-md border border-stone-800 rounded-2xl p-4 mb-4 flex flex-wrap items-center justify-between gap-3 text-stone-200">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{playerInfo.avatarEmoji}</span>
          <div>
            <div className="font-extrabold text-amber-300 text-sm sm:text-base flex items-center gap-1.5">
              {playerInfo.name || 'Chiến sĩ'}
              <span className="text-xs px-2 py-0.5 rounded-md bg-stone-800 text-stone-400 font-normal">
                {playerInfo.classGroup || 'Trường Sơn'}
              </span>
            </div>
            <div className="text-xs text-stone-400">
              Trạm dừng chân #{currentIdx + 1} / {quizList.length}
            </div>
          </div>
        </div>

        {/* Combo & Score */}
        <div className="flex items-center gap-3">
          {combo > 1 && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/40 text-orange-400 font-black text-xs sm:text-sm animate-pulse">
              <Flame className="w-4 h-4 fill-orange-400" />
              COMBO x{combo}
            </div>
          )}
          <div className="px-3 py-1 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-extrabold text-sm sm:text-base">
            🏆 {score} Điểm
          </div>
        </div>
      </div>

      {/* Countdown Timer Progress Bar */}
      {maxTime > 0 && (
        <div className="mb-4 bg-stone-900/60 p-2 rounded-2xl border border-stone-800">
          <div className="flex items-center justify-between text-xs font-bold text-stone-300 px-1 mb-1">
            <span className="flex items-center gap-1">
              <Clock className={`w-3.5 h-3.5 ${isTimeCritical ? 'text-rose-400 animate-spin' : 'text-amber-400'}`} />
              Thời gian trả lời
            </span>
            <span className={isTimeCritical ? 'text-rose-400 font-black animate-ping' : 'text-amber-300'}>
              {timeLeft} giây
            </span>
          </div>
          <div className="w-full h-2.5 bg-stone-950 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                isTimeCritical
                  ? 'bg-gradient-to-r from-rose-500 to-red-600'
                  : 'bg-gradient-to-r from-emerald-500 via-yellow-400 to-amber-500'
              }`}
              style={{ width: `${timerPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Question Card */}
      <div className="bg-stone-900/70 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-stone-100 relative">
        {/* Category Tag */}
        {currentQ.category && (
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-3">
            📍 Chủ đề: {currentQ.category}
          </div>
        )}

        {/* Question Text */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed text-amber-200 mb-6">
          <span className="text-amber-400 font-black mr-2">Câu {currentIdx + 1}:</span>
          {currentQ.question}
        </h2>

        {/* Option Buttons Grid */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((optText, idx) => {
            let btnClass = "bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 border-stone-700 hover:border-amber-400/50";
            let icon = null;

            if (isAnswered) {
              if (idx === currentQ.correct) {
                btnClass = "bg-emerald-900/90 text-emerald-100 border-emerald-400 font-bold shadow-lg shadow-emerald-900/50 ring-2 ring-emerald-400/50";
                icon = <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />;
              } else if (idx === selectedOpt) {
                btnClass = "bg-rose-950/90 text-rose-200 border-rose-500 font-bold shadow-lg shadow-rose-900/50";
                icon = <XCircle className="w-5 h-5 text-rose-400 shrink-0" />;
              } else {
                btnClass = "bg-stone-950/40 text-stone-500 border-stone-800 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-start justify-between gap-3 text-sm sm:text-base font-semibold cursor-pointer ${btnClass}`}
              >
                <span>{optText}</span>
                {icon}
              </button>
            );
          })}
        </div>

        {/* Immediate Detailed Lesson Explanation Modal / Box */}
        {isAnswered && (
          <div className="p-5 rounded-2xl bg-black/50 border-l-4 border-amber-400 space-y-3 animate-fadeIn mb-6">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm sm:text-base">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
              LỜI GIẢI THÍCH BÀI HỌC CHI TIẾT:
            </div>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Next Question / Continue Action */}
        {isAnswered && (
          <button
            onClick={handleNextQuestion}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black text-base sm:text-lg tracking-wide shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {currentIdx + 1 < quizList.length ? (
              <>
                TIẾP TỤC HÀNH QUÂN TỚI CÂU {currentIdx + 2}
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              <>
                HOÀN THÀNH HÀNH QUÂN & XEM KẾT QUẢ
                <Award className="w-5 h-5" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
