import React, { useState, useEffect } from 'react';
import { Award, RotateCcw, FileText, Download, CheckCircle2, XCircle, Flame, Star, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GameSummary, QuizItem } from '../types';
import { soundEngine } from '../audio';
import { CertificateModal } from './CertificateModal';
import { generateSingleHtmlCode } from '../utils/exportHtml';
import { exportResultsToWord } from '../utils/exportWord';

interface EndScreenProps {
  summary: GameSummary;
  quizList: QuizItem[];
  onRestart: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({ summary, quizList, onRestart }) => {
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);

  useEffect(() => {
    soundEngine.playFanfare();
    // Victory confetti celebration
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });
  }, []);

  const handleDownloadSingleHtml = () => {
    soundEngine.playClick();
    const htmlCode = generateSingleHtmlCode(quizList);
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ChiecGayTruongSon_Game_SingleFile.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportWordReport = () => {
    soundEngine.playClick();
    exportResultsToWord(summary);
  };

  const accuracyPct = Math.round((summary.correctCount / summary.totalQuestions) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Main Victory Card */}
      <div className="bg-stone-900/80 backdrop-blur-xl border border-amber-500/40 rounded-3xl p-6 sm:p-8 text-center text-stone-100 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs sm:text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4 text-amber-400" />
          HOÀN THÀNH CHẶNG ĐƯỜNG HÀNH QUÂN
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-2 text-4xl sm:text-5xl my-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className={`transition-all transform ${
                i < summary.stars ? 'scale-110 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]' : 'opacity-30 grayscale'
              }`}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* Rank Title */}
        <h1 className="text-2xl sm:text-4xl font-black text-amber-300 tracking-tight my-2">
          {summary.rankTitle}
        </h1>

        <p className="text-stone-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-6 font-medium">
          Chúc mừng chiến sĩ <strong className="text-amber-200">{summary.playerName}</strong> đã bền bỉ vượt qua tất cả các trạm dừng chân trên Dãy Trường Sơn!
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/40 p-4 rounded-2xl border border-stone-800 mb-6">
          <div className="text-center p-2">
            <div className="text-xs text-stone-400 font-bold uppercase">Tổng Điểm</div>
            <div className="text-2xl font-black text-emerald-400">{summary.score}</div>
          </div>

          <div className="text-center p-2">
            <div className="text-xs text-stone-400 font-bold uppercase">Chính Xác</div>
            <div className="text-2xl font-black text-amber-300">{accuracyPct}%</div>
          </div>

          <div className="text-center p-2">
            <div className="text-xs text-stone-400 font-bold uppercase">Combo Đạt Được</div>
            <div className="text-2xl font-black text-orange-400">x{summary.maxCombo}</div>
          </div>

          <div className="text-center p-2">
            <div className="text-xs text-stone-400 font-bold uppercase">Thời Gian</div>
            <div className="text-2xl font-black text-cyan-300">{summary.totalTimeSpent}s</div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => {
              soundEngine.playClick();
              onRestart();
            }}
            className="py-3 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-stone-700 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Chơi Lại
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setShowCertificate(true);
            }}
            className="py-3 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Award className="w-4 h-4" />
            Bằng Chứng Nhận
          </button>

          <button
            onClick={handleExportWordReport}
            className="py-3 px-3 rounded-xl bg-blue-800 hover:bg-blue-700 text-blue-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-blue-600 transition-all cursor-pointer"
            title="Tải báo cáo kết quả học tập file Word (.doc)"
          >
            <FileText className="w-4 h-4 text-blue-300" />
            Xuất Báo Cáo Word
          </button>

          <button
            onClick={handleDownloadSingleHtml}
            className="py-3 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-emerald-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-emerald-600 transition-all cursor-pointer"
            title="Tải duy nhất 1 File HTML để chạy offline trên máy tính không cần internet"
          >
            <Download className="w-4 h-4" />
            Tải HTML 1-File
          </button>
        </div>
      </div>

      {/* Review Answers Toggle Section */}
      <div className="bg-stone-900/60 backdrop-blur-md border border-stone-800 rounded-3xl p-5 text-stone-200">
        <button
          onClick={() => {
            soundEngine.playClick();
            setShowReview(!showReview);
          }}
          className="w-full flex items-center justify-between font-extrabold text-base sm:text-lg text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            Xem Chi Tiết Đáp Án & Lời Giải ({summary.correctCount}/{summary.totalQuestions} Câu Đúng)
          </span>
          {showReview ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {showReview && (
          <div className="mt-5 space-y-4 pt-4 border-t border-stone-800">
            {summary.answers.map((ans, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border ${
                  ans.isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/30'
                    : 'bg-rose-950/40 border-rose-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-bold text-sm sm:text-base text-stone-100">
                    Câu {idx + 1}: {ans.questionText}
                  </h4>
                  {ans.isCorrect ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-900/60 px-2.5 py-1 rounded-full shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-900/60 px-2.5 py-1 rounded-full shrink-0">
                      <XCircle className="w-3.5 h-3.5" /> Chưa đúng
                    </span>
                  )}
                </div>

                <div className="text-xs sm:text-sm space-y-1 mb-2">
                  <div className={ans.isCorrect ? 'text-emerald-300 font-semibold' : 'text-rose-300'}>
                    • Lựa chọn của bạn:{' '}
                    {ans.selectedOption >= 0 ? ans.options[ans.selectedOption] : 'Hết thời gian'}
                  </div>
                  {!ans.isCorrect && (
                    <div className="text-emerald-300 font-bold">
                      • Đáp án chính xác: {ans.options[ans.correctOption]}
                    </div>
                  )}
                </div>

                <div className="text-xs text-stone-300 bg-black/40 p-3 rounded-xl border border-stone-800 leading-relaxed">
                  <strong className="text-amber-300">💡 Giải thích bài học:</strong> {ans.explanation}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateModal summary={summary} onClose={() => setShowCertificate(false)} />
      )}
    </div>
  );
};
