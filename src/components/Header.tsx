import React from 'react';
import { Volume2, VolumeX, Edit3, Award, Flame, RefreshCw, BookOpen } from 'lucide-react';
import { soundEngine } from '../audio';
import { ScreenState, SubjectTopic } from '../types';

interface HeaderProps {
  screenState: ScreenState;
  setScreenState: (s: ScreenState) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  playerName: string;
  score: number;
  combo: number;
  onRestart: () => void;
  onRequestAdminMode?: () => void;
  isAdminAuthenticated?: boolean;
  activeSubject?: SubjectTopic;
  onOpenSubjectModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  screenState,
  setScreenState,
  isMuted,
  setIsMuted,
  playerName,
  score,
  combo,
  onRestart,
  onRequestAdminMode,
  isAdminAuthenticated,
  activeSubject,
  onOpenSubjectModal,
}) => {
  const handleToggleSound = () => {
    const nextMute = soundEngine.toggleMute();
    setIsMuted(nextMute);
    if (!nextMute) soundEngine.playClick();
  };

  return (
    <header className="w-full max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-emerald-950/60 backdrop-blur-md border border-emerald-500/30 shadow-xl text-emerald-50">
      {/* App Branding */}
      <div 
        onClick={() => { soundEngine.playClick(); setScreenState('start'); }}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-xl shadow-lg group-hover:scale-105 transition-transform">
          {activeSubject?.iconEmoji || '🪖'}
        </div>
        <div>
          <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-amber-300 flex items-center gap-2">
            CHIẾC GẬY TRƯỜNG SƠN
            {activeSubject && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/40 hidden sm:inline-block">
                {activeSubject.subjectCategory}
              </span>
            )}
          </h1>
          <p className="text-xs text-emerald-200/80">
            {activeSubject ? activeSubject.name : 'Hành quân trắc nghiệm & Rèn luyện tri thức'}
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Topic Selector Quick Button */}
        {onOpenSubjectModal && screenState !== 'playing' && (
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenSubjectModal();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 hover:bg-amber-500/30 transition-all cursor-pointer shadow-sm"
            title="Đổi môn học hoặc chủ đề"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Đổi Môn Học</span>
          </button>
        )}

        {screenState === 'playing' && (
          <div className="flex items-center gap-3 mr-2 bg-black/30 px-3 py-1.5 rounded-xl border border-emerald-500/20 text-xs sm:text-sm">
            <span className="font-bold text-amber-300">⭐ {score} đ</span>
            {combo > 1 && (
              <span className="flex items-center gap-1 font-black text-amber-400 animate-bounce">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                x{combo}
              </span>
            )}
          </div>
        )}

        {/* Audio Mute Button */}
        <button
          onClick={handleToggleSound}
          title={isMuted ? "Mở âm thanh" : "Tắt âm thanh"}
          className={`p-2 rounded-xl transition-all border cursor-pointer ${
            isMuted 
              ? 'bg-rose-950/60 text-rose-300 border-rose-500/40 hover:bg-rose-900/80' 
              : 'bg-emerald-800/50 text-emerald-200 border-emerald-500/40 hover:bg-emerald-700/60'
          }`}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        {/* Teacher Editor / Admin Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            if (screenState === 'editor') {
              setScreenState('start');
            } else if (onRequestAdminMode) {
              onRequestAdminMode();
            } else {
              setScreenState('editor');
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
            screenState === 'editor'
              ? 'bg-amber-400 text-stone-900 border-amber-300 shadow-lg shadow-amber-400/20'
              : 'bg-emerald-900/60 text-amber-300 border-amber-400/30 hover:bg-emerald-800/80'
          }`}
          title="Quản lý câu hỏi & xem báo cáo kết quả học sinh"
        >
          <Edit3 className="w-4 h-4" />
          <span className="hidden md:inline">
            {screenState === 'editor' ? 'Thoát Admin' : 'Quản Trị Admin'}
          </span>
          {isAdminAuthenticated && screenState !== 'editor' && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Đã đăng nhập Admin" />
          )}
        </button>

        {screenState !== 'start' && (
          <button
            onClick={() => {
              soundEngine.playClick();
              onRestart();
            }}
            className="p-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 cursor-pointer"
            title="Chơi lại từ đầu"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
