import React from 'react';
import { Play, Sparkles, Clock, Volume2, ShieldCheck, MapPin, Shuffle } from 'lucide-react';
import { PlayerInfo, TimerSetting } from '../types';
import { soundEngine } from '../audio';

interface StartScreenProps {
  playerInfo: PlayerInfo;
  setPlayerInfo: React.Dispatch<React.SetStateAction<PlayerInfo>>;
  onStartGame: () => void;
  totalQuestions: number;
}

const AVATARS = ['🪖', '🎒', '🥾', '🎋', '🚩', '⭐', '🎖️', '🔥'];

export const StartScreen: React.FC<StartScreenProps> = ({
  playerInfo,
  setPlayerInfo,
  onStartGame,
  totalQuestions,
}) => {
  const handleTestSound = () => {
    soundEngine.playCorrect();
    setTimeout(() => soundEngine.playFanfare(), 300);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-stone-900/60 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-stone-100 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Badge & Title */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-bold shadow-md mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          GAME TRẮC NGHIỆM TƯƠNG TÁC NGỮ VĂN
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400 drop-shadow-sm mb-2">
          Chiếc Gậy Trường Sơn
        </h1>
        <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Cùng xẻ dọc dãy núi Trường Sơn hùng vĩ, thử thách tri thức Ngữ văn - Lịch sử và chinh phục danh hiệu <span className="text-amber-300 font-bold">"Anh Hùng Dãy Trường Sơn"</span>!
        </p>
      </div>

      {/* Input Form Section */}
      <div className="space-y-6 relative z-10 mb-8 bg-black/30 p-5 sm:p-6 rounded-2xl border border-stone-800">
        {/* Avatar Selection */}
        <div>
          <label className="block text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider mb-2">
            1. Chọn Biểu Tượng Hào Hùng:
          </label>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {AVATARS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setPlayerInfo((prev) => ({ ...prev, avatarEmoji: emoji }));
                }}
                className={`w-11 h-11 sm:w-12 sm:h-12 text-2xl rounded-2xl flex items-center justify-center transition-all ${
                  playerInfo.avatarEmoji === emoji
                    ? 'bg-gradient-to-br from-amber-400 to-yellow-600 text-stone-950 scale-110 shadow-lg shadow-amber-500/30 ring-2 ring-amber-300'
                    : 'bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 border border-stone-700'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Student Name & Class */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider mb-2">
              2. Họ Và Tên Học Sinh:
            </label>
            <input
              type="text"
              value={playerInfo.name}
              onChange={(e) => setPlayerInfo((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Nhập tên của bạn (Ví dụ: Nguyễn Văn A)"
              className="w-full px-4 py-3 bg-stone-900/90 border-2 border-stone-700 focus:border-amber-400 rounded-xl text-stone-100 placeholder-stone-500 outline-none transition-all font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider mb-2">
              3. Lớp / Nhóm Học Tập:
            </label>
            <input
              type="text"
              value={playerInfo.classGroup}
              onChange={(e) => setPlayerInfo((prev) => ({ ...prev, classGroup: e.target.value }))}
              placeholder="Ví dụ: Lớp 11A1 / Lớp 12B"
              className="w-full px-4 py-3 bg-stone-900/90 border-2 border-stone-700 focus:border-amber-400 rounded-xl text-stone-100 placeholder-stone-500 outline-none transition-all font-semibold"
            />
          </div>
        </div>

        {/* Timer Setting Options */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              4. Thời Gian Đếm Ngược Mỗi Câu:
            </label>
            <button
              type="button"
              onClick={handleTestSound}
              className="text-xs text-emerald-300 hover:text-emerald-200 flex items-center gap-1 underline font-medium"
            >
              <Volume2 className="w-3.5 h-3.5" /> Thử âm thanh
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { val: 10, label: '10s (Nhanh)' },
              { val: 15, label: '15s (Tốt)' },
              { val: 20, label: '20s (Chuẩn)' },
              { val: 30, label: '30s (Thư thả)' },
              { val: 0, label: '♾️ Tùy ý' },
            ].map(({ val, label }) => (
              <button
                key={val}
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setPlayerInfo((prev) => ({ ...prev, timerSetting: val as TimerSetting }));
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                  playerInfo.timerSetting === val
                    ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md font-black'
                    : 'bg-stone-800/80 hover:bg-stone-700/80 text-stone-300 border-stone-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Shuffle Answer Options Toggle */}
        <div className="pt-2 border-t border-stone-800">
          <label className="flex items-center justify-between cursor-pointer p-3 rounded-xl bg-stone-900/80 border border-stone-700 hover:border-amber-400/50 transition-all">
            <div className="flex items-center gap-2.5">
              <Shuffle className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-xs sm:text-sm font-bold text-stone-200 block">
                  Đảo ngẫu nhiên vị trí các đáp án (A, B, C, D)
                </span>
                <span className="text-[11px] text-stone-400 font-medium">
                  Trộn vị trí đáp án mỗi lần chơi để chống học vẹt
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={playerInfo.shuffleOptions ?? true}
              onChange={(e) => {
                soundEngine.playClick();
                setPlayerInfo((prev) => ({ ...prev, shuffleOptions: e.target.checked }));
              }}
              className="w-5 h-5 accent-amber-400 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* March Map Preview */}
      <div className="mb-8 p-4 bg-emerald-950/40 rounded-2xl border border-emerald-500/30">
        <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-amber-400" />
          Hành trình {totalQuestions} Trạm dừng chân trên Dãy Trường Sơn:
        </h4>
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2 text-xs font-bold text-stone-300">
          <div className="flex items-center gap-1 text-amber-300 whitespace-nowrap">
            <span>🏡 Hòa Xá</span> ➡️
          </div>
          <div className="flex items-center gap-1 text-emerald-300 whitespace-nowrap">
            <span>⛰️ Khe Sanh</span> ➡️
          </div>
          <div className="flex items-center gap-1 text-emerald-300 whitespace-nowrap">
            <span>🌊 Ngã Ba Đồng Lộc</span> ➡️
          </div>
          <div className="flex items-center gap-1 text-emerald-300 whitespace-nowrap">
            <span>🌳 Đèo Lò Xo</span> ➡️
          </div>
          <div className="flex items-center gap-1 text-yellow-300 whitespace-nowrap font-black">
            <span>🏁 Miền Nam Mến Yêu</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={() => {
          soundEngine.playClick();
          onStartGame();
        }}
        className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black text-lg sm:text-xl tracking-wide shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer"
      >
        <Play className="w-6 h-6 fill-stone-950" />
        SẴN SÀNG BẮT ĐẦU HÀNH QUÂN!
        <Sparkles className="w-5 h-5 text-stone-900 animate-pulse" />
      </button>
    </div>
  );
};
