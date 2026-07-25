import React, { useState } from 'react';
import { Lock, KeyRound, X, Check, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { soundEngine } from '../audio';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check admin password (case-insensitive trim for user convenience)
    if (password.trim().toLowerCase() === 'admin') {
      soundEngine.playCorrect();
      setErrorMsg('');
      setPassword('');
      onSuccess();
    } else {
      soundEngine.playWrong();
      setErrorMsg('Mật khẩu Admin không đúng! Mật khẩu mặc định là: admin');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-stone-900 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-2xl space-y-5">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 text-stone-400 hover:text-stone-100 hover:bg-stone-700 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-amber-300 uppercase tracking-wide">
            Xác Nhận Quyền Admin
          </h2>
          <p className="text-xs text-stone-300">
            Vui lòng nhập mật khẩu quản trị để sửa câu hỏi và xem báo cáo kết quả học tập.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-amber-200/90 uppercase">
              Mật khẩu Admin:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                autoFocus
                placeholder="Nhập mật khẩu..."
                className="w-full pl-10 pr-10 py-3 bg-black/50 border border-stone-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl text-stone-100 text-sm font-mono outline-none transition-all"
              />
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Hint message */}
            <p className="text-[11px] text-amber-400/80 italic pt-0.5">
              🔑 Mật khẩu mặc định: <span className="font-mono font-bold underline">admin</span>
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-bold flex items-center gap-2 animate-shake">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              Đăng Nhập Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
