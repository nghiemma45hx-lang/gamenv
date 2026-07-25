import React, { useState } from 'react';
import { GameSummary } from '../types';
import { loadGameResults, deleteSingleGameResult, clearAllGameResults } from '../utils/storage';
import { exportResultsToWord } from '../utils/exportWord';
import { soundEngine } from '../audio';
import { Search, Trash2, Eye, Download, FileText, Award, Users, CheckCircle2, RefreshCw, X, ShieldAlert, BookOpen } from 'lucide-react';

export const ResultsManager: React.FC = () => {
  const [resultsList, setResultsList] = useState<GameSummary[]>(loadGameResults());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [selectedResult, setSelectedResult] = useState<GameSummary | null>(null);

  const handleRefresh = () => {
    soundEngine.playClick();
    setResultsList(loadGameResults());
  };

  const handleDeleteSingle = (index: number) => {
    soundEngine.playClick();
    if (confirm("Bạn có chắc chắn muốn xóa lượt làm bài này khỏi danh sách?")) {
      const updated = deleteSingleGameResult(index);
      setResultsList(updated);
    }
  };

  const handleClearAll = () => {
    soundEngine.playWrong();
    if (confirm("⚠️ CẢNH BÁO: Tất cả lịch sử và kết quả học tập của học sinh sẽ bị xóa sạch. Bạn có chắc chắn không?")) {
      clearAllGameResults();
      setResultsList([]);
    }
  };

  // Get list of unique subject categories/names in results
  const uniqueSubjects = Array.from(
    new Set(resultsList.map((r) => r.subjectName || 'Chiếc Gậy Trường Sơn'))
  );

  // Filtered list
  const filtered = resultsList.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const itemSubject = item.subjectName || 'Chiếc Gậy Trường Sơn';

    if (subjectFilter !== 'all' && itemSubject !== subjectFilter) {
      return false;
    }

    if (!q) return true;
    return (
      item.playerName.toLowerCase().includes(q) ||
      item.classGroup.toLowerCase().includes(q) ||
      item.rankTitle.toLowerCase().includes(q) ||
      item.date.toLowerCase().includes(q) ||
      (item.subjectName && item.subjectName.toLowerCase().includes(q)) ||
      (item.subjectCategory && item.subjectCategory.toLowerCase().includes(q))
    );
  });

  // Calculate statistics
  const totalSubmissions = resultsList.length;
  const avgScore = totalSubmissions > 0 ? Math.round(resultsList.reduce((acc, r) => acc + r.score, 0) / totalSubmissions) : 0;
  const highScore = totalSubmissions > 0 ? Math.max(...resultsList.map(r => r.score)) : 0;
  const avgAccuracy = totalSubmissions > 0 
    ? Math.round((resultsList.reduce((acc, r) => acc + (r.correctCount / (r.totalQuestions || 1)), 0) / totalSubmissions) * 100)
    : 0;

  // Export to CSV
  const handleExportCSV = () => {
    soundEngine.playClick();
    if (resultsList.length === 0) {
      alert("Chưa có kết quả học tập nào để xuất!");
      return;
    }

    const headers = ['STT', 'Họ và Tên', 'Lớp / Nhóm', 'Môn Học', 'Chủ Đề', 'Điểm Số', 'Số Câu Đúng', 'Tổng Câu', 'Combo Cao Nhất', 'Thời Gian (giây)', 'Danh Hiệu', 'Ngày Làm'];
    const rows = resultsList.map((r, idx) => [
      idx + 1,
      `"${r.playerName.replace(/"/g, '""')}"`,
      `"${r.classGroup.replace(/"/g, '""')}"`,
      `"${(r.subjectCategory || 'Ngữ Văn').replace(/"/g, '""')}"`,
      `"${(r.subjectName || 'Chiếc Gậy Trường Sơn').replace(/"/g, '""')}"`,
      r.score,
      r.correctCount,
      r.totalQuestions,
      r.maxCombo,
      r.totalTimeSpent,
      `"${r.rankTitle.replace(/"/g, '""')}"`,
      `"${r.date}"`
    ]);

    const csvContent = '\ufeff' + [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ket_Qua_Hoc_Tap_Hoc_Sinh_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 font-bold shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-amber-200/80 uppercase">Lượt Làm Bài</div>
            <div className="text-xl font-black text-amber-300">{totalSubmissions}</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-bold shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-emerald-200/80 uppercase">Điểm Cao Nhất</div>
            <div className="text-xl font-black text-emerald-300">{highScore} đ</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300 font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-blue-200/80 uppercase">Điểm T.Bình</div>
            <div className="text-xl font-black text-blue-300">{avgScore} đ</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-purple-200/80 uppercase">Đúng T.Bình</div>
            <div className="text-xl font-black text-purple-300">{avgAccuracy}%</div>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Export Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tên học sinh, lớp, danh hiệu..."
            className="w-full pl-9 pr-3 py-2 bg-black/50 border border-stone-700 focus:border-amber-400 rounded-xl text-xs text-stone-100 outline-none"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>

        {/* Filter by Subject */}
        {uniqueSubjects.length > 1 && (
          <div className="flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-xl border border-stone-700 text-xs">
            <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="bg-transparent text-amber-200 font-bold outline-none cursor-pointer"
            >
              <option value="all" className="bg-stone-900 text-stone-100">Tất cả môn học</option>
              {uniqueSubjects.map((subName) => (
                <option key={subName} value={subName} className="bg-stone-900 text-stone-100">
                  {subName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleRefresh}
            className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold border border-stone-700 flex items-center gap-1 transition-all cursor-pointer"
            title="Tải lại danh sách"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Làm mới
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-bold border border-emerald-600 flex items-center gap-1 transition-all cursor-pointer"
            title="Xuất danh sách ra file Excel / CSV"
          >
            <Download className="w-3.5 h-3.5" /> Xuất Excel/CSV
          </button>

          {resultsList.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-3 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 text-xs font-bold border border-rose-500/40 flex items-center gap-1 transition-all cursor-pointer"
              title="Xóa toàn bộ kết quả"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa Tất Cả
            </button>
          )}
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-black/50 border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-stone-400 space-y-2">
            <ShieldAlert className="w-8 h-8 text-amber-500/50 mx-auto" />
            <p className="text-sm font-bold text-stone-300">Chưa có kết quả học tập nào được lưu trữ.</p>
            <p className="text-xs text-stone-500">Kết quả sẽ tự động lưu lại mỗi khi học sinh hoàn thành bài làm trắc nghiệm.</p>
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[45vh] overflow-y-auto">
            <table className="w-full text-left text-xs text-stone-300 border-collapse">
              <thead className="bg-stone-900/90 text-amber-300 font-bold uppercase sticky top-0 border-b border-stone-800">
                <tr>
                  <th className="p-3 text-center">STT</th>
                  <th className="p-3">Họ và Tên</th>
                  <th className="p-3">Lớp / Nhóm</th>
                  <th className="p-3">Môn & Chủ Đề</th>
                  <th className="p-3 text-center">Điểm</th>
                  <th className="p-3 text-center">Câu Đúng</th>
                  <th className="p-3 text-center">Thời Gian</th>
                  <th className="p-3">Danh Hiệu</th>
                  <th className="p-3">Ngày Làm</th>
                  <th className="p-3 text-center">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 font-medium">
                {filtered.map((item, idx) => {
                  const accuracyPct = Math.round((item.correctCount / (item.totalQuestions || 1)) * 100);
                  return (
                    <tr key={idx} className="hover:bg-amber-950/20 transition-colors">
                      <td className="p-3 text-center text-stone-400 font-mono">{idx + 1}</td>
                      <td className="p-3 font-bold text-stone-100">{item.playerName}</td>
                      <td className="p-3 text-stone-300">{item.classGroup}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold mr-1">
                          {item.subjectCategory || 'Ngữ Văn'}
                        </span>
                        <span className="text-stone-200 text-xs font-semibold">
                          {item.subjectName || 'Chiếc Gậy Trường Sơn'}
                        </span>
                      </td>
                      <td className="p-3 text-center font-bold text-amber-300">{item.score} đ</td>
                      <td className="p-3 text-center">
                        <span className="font-bold text-emerald-400">{item.correctCount}</span>/{item.totalQuestions}
                        <span className="text-[10px] text-stone-400 ml-1">({accuracyPct}%)</span>
                      </td>
                      <td className="p-3 text-center font-mono text-stone-300">{item.totalTimeSpent}s</td>
                      <td className="p-3 font-bold text-amber-200">{item.rankTitle}</td>
                      <td className="p-3 text-stone-400 text-[11px]">{item.date}</td>
                      <td className="p-3 text-center space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => {
                            soundEngine.playClick();
                            setSelectedResult(item);
                          }}
                          className="px-2 py-1 rounded-lg bg-blue-950 hover:bg-blue-900 text-blue-200 border border-blue-500/40 text-[11px] font-bold transition-all cursor-pointer"
                          title="Xem chi tiết bài làm"
                        >
                          <Eye className="w-3 h-3 inline mr-1" /> Chi Tiết
                        </button>
                        <button
                          onClick={() => {
                            soundEngine.playClick();
                            exportResultsToWord(item);
                          }}
                          className="px-2 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/40 text-[11px] font-bold transition-all cursor-pointer"
                          title="Xuất file Word báo cáo"
                        >
                          <FileText className="w-3 h-3 inline" />
                        </button>
                        <button
                          onClick={() => handleDeleteSingle(idx)}
                          className="px-2 py-1 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-[11px] font-bold transition-all cursor-pointer"
                          title="Xóa lượt này"
                        >
                          <Trash2 className="w-3 h-3 inline" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-stone-900 border-2 border-amber-500/60 rounded-3xl p-6 text-stone-100 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                    Môn {selectedResult.subjectCategory || 'Ngữ Văn'}
                  </span>
                  <span className="text-xs font-bold text-amber-400">
                    Chủ đề: {selectedResult.subjectName || 'Chiếc Gậy Trường Sơn'}
                  </span>
                </div>
                <h3 className="text-lg font-black text-amber-300">
                  Chi Tiết Bài Làm - {selectedResult.playerName}
                </h3>
                <p className="text-xs text-stone-400">
                  Lớp: {selectedResult.classGroup} • Điểm số: <strong className="text-amber-300">{selectedResult.score} đ</strong> • Ngày: {selectedResult.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedResult(null)}
                className="p-1.5 rounded-full bg-stone-800 text-stone-400 hover:text-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {selectedResult.answers.map((ans, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                    ans.isCorrect
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                      : 'bg-rose-950/30 border-rose-500/40 text-rose-100'
                  }`}
                >
                  <div className="font-bold text-stone-200">
                    Câu {idx + 1}: {ans.questionText}
                  </div>
                  <div className="flex flex-wrap justify-between gap-2 text-[11px]">
                    <span>
                      Đã chọn:{' '}
                      <strong className={ans.isCorrect ? 'text-emerald-300' : 'text-rose-300 font-bold'}>
                        {ans.options[ans.selectedOption] || 'Bỏ qua'}
                      </strong>
                    </span>
                    {!ans.isCorrect && (
                      <span className="text-amber-300">
                        Đáp án đúng: <strong>{ans.options[ans.correctOption]}</strong>
                      </span>
                    )}
                  </div>
                  <div className="text-stone-400 text-[11px] italic pt-1 border-t border-stone-800/50">
                    💡 Giải thích: {ans.explanation}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 gap-2">
              <button
                onClick={() => exportResultsToWord(selectedResult)}
                className="px-4 py-2 rounded-xl bg-blue-800 hover:bg-blue-700 text-blue-100 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" /> Xuất File Word
              </button>
              <button
                onClick={() => setSelectedResult(null)}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
