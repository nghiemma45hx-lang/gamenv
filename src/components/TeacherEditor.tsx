import React, { useState, useRef } from 'react';
import { Plus, Trash2, Save, RotateCcw, Download, Check, BookOpen, Shuffle, Sparkles, FileText } from 'lucide-react';
import { QuizItem } from '../types';
import { QUIZ_DATA } from '../quizData';
import { soundEngine } from '../audio';
import { generateSingleHtmlCode } from '../utils/exportHtml';
import { shuffleQuizOptions } from '../utils/shuffle';
import { exportQuestionsToWord } from '../utils/exportWord';

interface TeacherEditorProps {
  quizList: QuizItem[];
  setQuizList: React.Dispatch<React.SetStateAction<QuizItem[]>>;
  onClose: () => void;
}

export const TeacherEditor: React.FC<TeacherEditorProps> = ({
  quizList,
  setQuizList,
  onClose,
}) => {
  const [editingList, setEditingList] = useState<QuizItem[]>([...quizList]);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [newlyAddedId, setNewlyAddedId] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleOptionChange = (qIndex: number, optIndex: number, val: string) => {
    setEditingList((prev) => {
      const updated = [...prev];
      const newOptions = [...updated[qIndex].options];
      newOptions[optIndex] = val;
      updated[qIndex] = { ...updated[qIndex], options: newOptions };
      return updated;
    });
  };

  const handleFieldChange = (qIndex: number, field: keyof QuizItem, val: unknown) => {
    setEditingList((prev) => {
      const updated = [...prev];
      updated[qIndex] = { ...updated[qIndex], [field]: val };
      return updated;
    });
  };

  const handleAddQuestion = () => {
    soundEngine.playClick();
    const newId = Date.now();
    const nextNumber = editingList.length + 1;
    const newQ: QuizItem = {
      id: newId,
      question: `Câu hỏi số ${nextNumber}: (Nhập nội dung câu hỏi tại đây)`,
      options: [
        "A. Lựa chọn A",
        "B. Lựa chọn B",
        "C. Lựa chọn C",
        "D. Lựa chọn D"
      ],
      correct: 0,
      explanation: "Nhập lời giải thích bài học chi tiết tại đây...",
      category: "Củng cố kiến thức"
    };

    setEditingList((prev) => [...prev, newQ]);
    setNewlyAddedId(newId);

    // Smooth scroll down to the bottom and focus on the new question textarea
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
      if (lastTextareaRef.current) {
        lastTextareaRef.current.focus();
        lastTextareaRef.current.select();
      }
    }, 100);

    // Clear highlight after 3.5 seconds
    setTimeout(() => {
      setNewlyAddedId(null);
    }, 3500);
  };

  const handleDeleteQuestion = (qIndex: number) => {
    soundEngine.playClick();
    if (editingList.length <= 1) {
      alert("Cần giữ ít nhất 1 câu hỏi trong trò chơi!");
      return;
    }
    setEditingList((prev) => prev.filter((_, idx) => idx !== qIndex));
  };

  const handleResetDefault = () => {
    soundEngine.playClick();
    if (confirm("Khôi phục lại 10 câu hỏi mặc định về bài học 'Chiếc gậy Trường Sơn'?")) {
      setEditingList([...QUIZ_DATA]);
    }
  };

  const handleShuffleAllOptions = () => {
    soundEngine.playClick();
    setEditingList(shuffleQuizOptions(editingList));
  };

  const handleSaveList = () => {
    soundEngine.playCorrect();
    setQuizList(editingList);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportSingleHtml = () => {
    soundEngine.playClick();
    const htmlCode = generateSingleHtmlCode(editingList);
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ChiecGayTruongSon_GiaoVienEdit.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportWord = () => {
    soundEngine.playClick();
    exportQuestionsToWord(editingList);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-stone-900/95 backdrop-blur-xl border border-amber-500/40 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-1">
            <BookOpen className="w-3.5 h-3.5" /> DÀNH CHO GIÁO VIÊN & QUẢN TRỊ ({editingList.length} câu)
          </div>
          <h2 className="text-2xl font-black text-amber-300">
            Quản Lý & Chỉnh Sửa Câu Hỏi Bộ Môn
          </h2>
          <p className="text-xs text-stone-400">
            Dễ dàng thêm, sửa, xóa hoặc thay thế câu hỏi. Thay đổi có hiệu lực ngay trong trò chơi!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleShuffleAllOptions}
            className="px-3 py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-200 text-xs font-bold border border-amber-500/40 flex items-center gap-1 transition-all cursor-pointer"
            title="Đảo vị trí đáp án của tất cả các câu hỏi ngay trong trình sửa"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-400" /> Trộn Đáp Án
          </button>

          <button
            onClick={handleResetDefault}
            className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold border border-stone-700 flex items-center gap-1 transition-all cursor-pointer"
            title="Khôi phục câu hỏi ban đầu"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Mặc định
          </button>

          <button
            onClick={handleExportSingleHtml}
            className="px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-bold border border-emerald-600 flex items-center gap-1 transition-all cursor-pointer"
            title="Xuất file HTML đơn chứa các câu hỏi mới"
          >
            <Download className="w-3.5 h-3.5" /> Xuất File HTML
          </button>

          <button
            onClick={handleExportWord}
            className="px-3 py-2 rounded-xl bg-blue-800 hover:bg-blue-700 text-blue-100 text-xs font-bold border border-blue-600 flex items-center gap-1 transition-all cursor-pointer"
            title="Xuất đề thi và đáp án ra file Microsoft Word (.doc)"
          >
            <FileText className="w-3.5 h-3.5 text-blue-300" /> Xuất File Word
          </button>
        </div>
      </div>

      {/* Save Status Banner */}
      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-200 text-sm font-bold flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5 text-emerald-400" />
          Đã lưu thay đổi bộ câu hỏi thành công! Trò chơi đã cập nhật {editingList.length} câu hỏi mới.
        </div>
      )}

      {/* Questions List */}
      <div ref={containerRef} className="space-y-6 max-h-[58vh] overflow-y-auto pr-2 scroll-smooth">
        {editingList.map((q, qIdx) => {
          const isNewlyAdded = q.id === newlyAddedId;
          const isLast = qIdx === editingList.length - 1;

          return (
            <div
              key={q.id || qIdx}
              className={`p-5 rounded-2xl bg-black/40 border transition-all space-y-4 ${
                isNewlyAdded
                  ? 'border-amber-400 ring-2 ring-amber-400/60 bg-amber-950/30 shadow-lg shadow-amber-500/10'
                  : 'border-stone-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-black text-amber-300 text-sm sm:text-base">
                    Câu Hỏi #{qIdx + 1}
                  </span>
                  {isNewlyAdded && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-300 border border-amber-400/50 text-[10px] font-bold flex items-center gap-1 animate-pulse">
                      <Sparkles className="w-3 h-3 text-amber-400" /> Mới Thêm
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteQuestion(qIdx)}
                  className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs border border-rose-500/30 flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Xóa
                </button>
              </div>

              {/* Question Text */}
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase mb-1">
                  Nội dung câu hỏi:
                </label>
                <textarea
                  ref={isLast ? lastTextareaRef : undefined}
                  value={q.question}
                  onChange={(e) => handleFieldChange(qIdx, 'question', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl text-stone-100 text-sm outline-none font-medium transition-all"
                  placeholder="Nhập nội dung câu hỏi..."
                />
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, oIdx) => (
                  <div key={oIdx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-400">
                      <span>Lựa chọn {String.fromCharCode(65 + oIdx)}:</span>
                      <label className="flex items-center gap-1 cursor-pointer text-amber-300">
                        <input
                          type="radio"
                          name={`correct-${q.id || qIdx}`}
                          checked={q.correct === oIdx}
                          onChange={() => handleFieldChange(qIdx, 'correct', oIdx)}
                          className="accent-amber-400 cursor-pointer"
                        />
                        Là đáp án đúng
                      </label>
                    </div>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => handleOptionChange(qIdx, oIdx, e.target.value)}
                      className={`w-full px-3 py-2 bg-stone-900 border rounded-xl text-xs font-medium outline-none transition-all ${
                        q.correct === oIdx ? 'border-amber-400 bg-amber-950/20 text-amber-200' : 'border-stone-700 text-stone-300'
                      }`}
                      placeholder={`Lựa chọn ${String.fromCharCode(65 + oIdx)}...`}
                    />
                  </div>
                ))}
              </div>

              {/* Explanation */}
              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                  Lời giải thích bài học chi tiết:
                </label>
                <textarea
                  value={q.explanation}
                  onChange={(e) => handleFieldChange(qIdx, 'explanation', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl text-stone-200 text-xs outline-none font-medium transition-all"
                  placeholder="Lời giải thích sau khi học sinh trả lời..."
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-800">
        <button
          onClick={handleAddQuestion}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-stone-800 to-stone-700 hover:from-amber-900/60 hover:to-amber-800/60 text-amber-300 font-bold text-sm border border-amber-500/40 hover:border-amber-400 flex items-center gap-2 transition-all shadow-md cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4 text-amber-400" /> + Thêm Câu Hỏi Mới
        </button>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-sm transition-all cursor-pointer"
          >
            Đóng
          </button>
          <button
            onClick={handleSaveList}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-stone-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            Lưu Bộ Câu Hỏi
          </button>
        </div>
      </div>
    </div>
  );
};

