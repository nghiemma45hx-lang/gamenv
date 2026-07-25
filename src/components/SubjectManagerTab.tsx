import React, { useState } from 'react';
import { SubjectTopic, QuizItem } from '../types';
import { soundEngine } from '../audio';
import { Plus, Trash2, Edit3, Check, RotateCcw, BookOpen, Sparkles, FolderPlus, Save, CheckCircle2 } from 'lucide-react';

interface SubjectManagerTabProps {
  subjects: SubjectTopic[];
  activeSubjectId: string;
  onSelectActiveSubject: (id: string) => void;
  onUpdateSubjects: (newList: SubjectTopic[]) => void;
  onResetToDefault: () => void;
}

export const SubjectManagerTab: React.FC<SubjectManagerTabProps> = ({
  subjects,
  activeSubjectId,
  onSelectActiveSubject,
  onUpdateSubjects,
  onResetToDefault,
}) => {
  const [editingSubject, setEditingSubject] = useState<SubjectTopic | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    subjectCategory: 'Ngữ Văn',
    iconEmoji: '📖',
    badgeText: 'Lớp 11',
    description: '',
  });

  const handleStartCreate = () => {
    soundEngine.playClick();
    setIsCreatingNew(true);
    setEditingSubject(null);
    setFormData({
      name: '',
      subjectCategory: 'Ngữ Văn',
      iconEmoji: '📖',
      badgeText: 'Lớp 11',
      description: '',
    });
  };

  const handleStartEdit = (sub: SubjectTopic) => {
    soundEngine.playClick();
    setEditingSubject(sub);
    setIsCreatingNew(false);
    setFormData({
      name: sub.name,
      subjectCategory: sub.subjectCategory,
      iconEmoji: sub.iconEmoji,
      badgeText: sub.badgeText,
      description: sub.description,
    });
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên môn học / chủ đề!');
      return;
    }

    soundEngine.playCorrect();

    if (isCreatingNew) {
      const newSubjectId = `custom-subject-${Date.now()}`;
      const newSubject: SubjectTopic = {
        id: newSubjectId,
        name: formData.name.trim(),
        subjectCategory: formData.subjectCategory.trim(),
        iconEmoji: formData.iconEmoji.trim() || '📚',
        badgeText: formData.badgeText.trim() || 'Mới',
        description: formData.description.trim() || 'Chủ đề môn học mới',
        isCustom: true,
        questions: [
          {
            id: 1,
            question: `Câu hỏi mẫu cho chủ đề ${formData.name}`,
            options: ['Lựa chọn A', 'Lựa chọn B', 'Lựa chọn C', 'Lựa chọn D'],
            correct: 0,
            explanation: 'Lời giải thích câu hỏi mẫu.',
            category: formData.subjectCategory,
          }
        ],
      };

      const updated = [...subjects, newSubject];
      onUpdateSubjects(updated);
      onSelectActiveSubject(newSubjectId);
      setIsCreatingNew(false);
      setSaveSuccessMsg(`Đã tạo chủ đề mới "${newSubject.name}"!`);
    } else if (editingSubject) {
      const updated = subjects.map((sub) => {
        if (sub.id === editingSubject.id) {
          return {
            ...sub,
            name: formData.name.trim(),
            subjectCategory: formData.subjectCategory.trim(),
            iconEmoji: formData.iconEmoji.trim() || '📚',
            badgeText: formData.badgeText.trim(),
            description: formData.description.trim(),
          };
        }
        return sub;
      });
      onUpdateSubjects(updated);
      setEditingSubject(null);
      setSaveSuccessMsg(`Đã cập nhật thông tin chủ đề "${formData.name}"!`);
    }

    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleDeleteSubject = (sub: SubjectTopic) => {
    soundEngine.playWrong();
    if (confirm(`Bạn có chắc chắn muốn xóa chủ đề "${sub.name}"?`)) {
      const updated = subjects.filter((s) => s.id !== sub.id);
      onUpdateSubjects(updated);
      if (activeSubjectId === sub.id && updated.length > 0) {
        onSelectActiveSubject(updated[0].id);
      }
      setSaveSuccessMsg(`Đã xóa chủ đề "${sub.name}"`);
      setTimeout(() => setSaveSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Save status notice */}
      {saveSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-amber-300 flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Danh Sách Các Chủ Đề & Môn Học ({subjects.length})
          </h3>
          <p className="text-xs text-stone-400">
            Chọn chủ đề làm môn học mặc định cho học sinh hoặc tạo chủ đề môn học mới
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetToDefault}
            className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold border border-stone-700 flex items-center gap-1.5 transition-all cursor-pointer"
            title="Khôi phục bộ môn học mặc định"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
            <span>Khôi phục Mặc định</span>
          </button>

          <button
            onClick={handleStartCreate}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-stone-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <FolderPlus className="w-4 h-4" />
            <span>+ Tạo Chủ Đề / Môn Mới</span>
          </button>
        </div>
      </div>

      {/* Create / Edit Form Modal */}
      {(isCreatingNew || editingSubject) && (
        <div className="p-5 rounded-2xl bg-amber-950/30 border-2 border-amber-400/80 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
            <h4 className="text-sm font-black text-amber-300 uppercase">
              {isCreatingNew ? '✨ Tạo Môn Học / Chủ Đề Mới' : `✏️ Chỉnh Sửa Chủ Đề: ${editingSubject?.name}`}
            </h4>
            <button
              onClick={() => {
                setIsCreatingNew(false);
                setEditingSubject(null);
              }}
              className="text-xs text-stone-400 hover:text-stone-200"
            >
              Hủy
            </button>
          </div>

          <form onSubmit={handleSaveForm} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-amber-200">Tên Tác Phẩm / Chủ Đề:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="VD: Chiếc Gậy Trường Sơn, Lịch Sử Việt Nam..."
                className="w-full px-3 py-2 bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-xl text-xs text-stone-100 outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-amber-200">Môn Học (Phân Loại):</label>
              <input
                type="text"
                value={formData.subjectCategory}
                onChange={(e) => setFormData({ ...formData, subjectCategory: e.target.value })}
                placeholder="VD: Ngữ Văn, Lịch Sử, Địa Lý, Tiếng Anh..."
                className="w-full px-3 py-2 bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-xl text-xs text-stone-100 outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-amber-200">Biểu Tượng Emoji:</label>
              <input
                type="text"
                value={formData.iconEmoji}
                onChange={(e) => setFormData({ ...formData, iconEmoji: e.target.value })}
                placeholder="VD: 🪖, 📜, 🗺️, 🇬🇧, 🧮..."
                className="w-full px-3 py-2 bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-xl text-xs text-stone-100 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-amber-200">Nhãn / Cấp Học (Badge):</label>
              <input
                type="text"
                value={formData.badgeText}
                onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                placeholder="VD: Lớp 11, Lớp 12, THPT..."
                className="w-full px-3 py-2 bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-xl text-xs text-stone-100 outline-none"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-bold text-amber-200">Mô Tả Ngắn Về Chủ Đề:</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tóm tắt nội dung chính của môn học / chủ đề..."
                rows={2}
                className="w-full px-3 py-2 bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-xl text-xs text-stone-100 outline-none"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsCreatingNew(false);
                  setEditingSubject(null);
                }}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-bold cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black flex items-center gap-1 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" /> Lưu Thông Tin Chủ Đề
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subjects.map((sub) => {
          const isActive = sub.id === activeSubjectId;
          const qCount = sub.questions ? sub.questions.length : 0;

          return (
            <div
              key={sub.id}
              className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-4 ${
                isActive
                  ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/10'
                  : 'bg-black/40 border-stone-800 hover:border-stone-700'
              }`}
            >
              {/* Top info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase">
                      {sub.subjectCategory}
                    </span>
                    <span className="text-[10px] font-bold text-stone-400 bg-stone-800 px-2 py-0.5 rounded-md">
                      {sub.badgeText}
                    </span>
                  </div>

                  {isActive && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black flex items-center gap-1 shadow-sm">
                      <Check className="w-3 h-3" /> ĐANG DÙNG
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <div className="text-3xl p-2 rounded-xl bg-stone-900 border border-stone-800 shrink-0">
                    {sub.iconEmoji || '📚'}
                  </div>
                  <div>
                    <h4 className="text-base font-black text-stone-100">
                      {sub.name}
                    </h4>
                    <p className="text-xs text-stone-400 line-clamp-2 mt-0.5">
                      {sub.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {qCount} câu hỏi
                </div>

                <div className="flex items-center gap-1.5">
                  {!isActive && (
                    <button
                      onClick={() => {
                        soundEngine.playCorrect();
                        onSelectActiveSubject(sub.id);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold cursor-pointer transition-all"
                    >
                      Kích Hoạt
                    </button>
                  )}

                  <button
                    onClick={() => handleStartEdit(sub)}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold border border-stone-700 cursor-pointer"
                    title="Sửa thông tin"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {sub.isCustom && (
                    <button
                      onClick={() => handleDeleteSubject(sub)}
                      className="p-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 text-xs font-bold border border-rose-500/40 cursor-pointer"
                      title="Xóa chủ đề"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
