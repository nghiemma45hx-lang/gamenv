import React from 'react';
import { SubjectTopic } from '../types';
import { soundEngine } from '../audio';
import { BookOpen, Check, X, Sparkles, FolderKanban, Plus } from 'lucide-react';

interface SubjectSelectorModalProps {
  isOpen: boolean;
  subjects: SubjectTopic[];
  activeSubjectId: string;
  onSelectSubject: (id: string) => void;
  onClose: () => void;
  onOpenTeacherEditor?: () => void;
}

export const SubjectSelectorModal: React.FC<SubjectSelectorModalProps> = ({
  isOpen,
  subjects,
  activeSubjectId,
  onSelectSubject,
  onClose,
  onOpenTeacherEditor,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-stone-900 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
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
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner">
            <BookOpen className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-amber-300 uppercase tracking-wide">
            Chọn Chủ Đề & Môn Học
          </h2>
          <p className="text-xs text-stone-300 max-w-md mx-auto">
            Lựa chọn môn học hoặc chủ đề bạn muốn ôn tập và làm bài kiểm tra trắc nghiệm
          </p>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {subjects.map((sub) => {
            const isActive = sub.id === activeSubjectId;
            const qCount = sub.questions ? sub.questions.length : 0;

            return (
              <div
                key={sub.id}
                onClick={() => {
                  soundEngine.playCorrect();
                  onSelectSubject(sub.id);
                  onClose();
                }}
                className={`group relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isActive
                    ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/10'
                    : 'bg-stone-950/60 border-stone-800 hover:border-amber-500/50 hover:bg-stone-900/80'
                }`}
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase">
                    {sub.subjectCategory}
                  </span>
                  <span className="text-[11px] font-bold text-stone-400 bg-stone-800 px-2 py-0.5 rounded-md">
                    {sub.badgeText}
                  </span>
                </div>

                {/* Title & Emoji */}
                <div className="flex items-start gap-3">
                  <div className="text-3xl p-2 rounded-xl bg-stone-900 border border-stone-800 shrink-0 group-hover:scale-110 transition-transform">
                    {sub.iconEmoji || '📚'}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-stone-100 group-hover:text-amber-300 transition-colors">
                      {sub.name}
                    </h3>
                    <p className="text-[11px] text-stone-400 line-clamp-2 mt-0.5">
                      {sub.description}
                    </p>
                  </div>
                </div>

                {/* Footer Stats & Selection Indicator */}
                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs font-bold">
                  <span className="text-stone-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {qCount} câu hỏi
                  </span>

                  {isActive ? (
                    <span className="px-3 py-1 rounded-xl bg-amber-400 text-stone-950 text-[11px] font-black flex items-center gap-1 shadow-md">
                      <Check className="w-3.5 h-3.5" /> Đang Chọn
                    </span>
                  ) : (
                    <span className="text-amber-400/80 group-hover:text-amber-300 text-[11px] underline font-semibold">
                      Chọn chủ đề này →
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Option to create new or manage in Admin */}
        {onOpenTeacherEditor && (
          <div className="pt-2 border-t border-stone-800 text-center">
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
                onOpenTeacherEditor();
              }}
              className="text-xs text-amber-300 hover:text-amber-200 font-bold inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 transition-all cursor-pointer border border-stone-700"
            >
              <FolderKanban className="w-4 h-4 text-amber-400" />
              <span>Quản trị viên: Thêm / Sửa đổi các chủ đề môn học</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
