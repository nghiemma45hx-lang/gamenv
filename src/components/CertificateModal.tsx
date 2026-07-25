import React from 'react';
import { X, Printer, ShieldCheck } from 'lucide-react';
import { GameSummary } from '../types';
import { soundEngine } from '../audio';

interface CertificateModalProps {
  summary: GameSummary;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ summary, onClose }) => {
  const handlePrint = () => {
    soundEngine.playClick();

    // Create a hidden printable iframe to guarantee printing works inside sandboxed iframes
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    document.body.appendChild(printFrame);

    const doc = printFrame.contentWindow?.document || printFrame.contentDocument;

    if (doc) {
      const starsStr = '⭐'.repeat(summary.stars);
      const printHtml = `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
          <meta charset="utf-8">
          <title>Bằng Chứng Nhận Hành Quân - ${summary.playerName}</title>
          <style>
            @page {
              size: A4 landscape;
              margin: 10mm;
            }
            body {
              font-family: 'Times New Roman', serif;
              margin: 0;
              padding: 20px;
              background: #ffffff;
              color: #111827;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }
            .cert-card {
              width: 100%;
              max-width: 900px;
              border: 6px double #b45309;
              padding: 30px;
              border-radius: 16px;
              background: #fffbeb;
              text-align: center;
              box-shadow: none;
            }
            .inner-border {
              border: 2px dashed #d97706;
              padding: 24px;
              border-radius: 12px;
            }
            .badge {
              display: inline-block;
              padding: 6px 20px;
              background: #fef3c7;
              color: #92400e;
              border: 1px solid #f59e0b;
              border-radius: 30px;
              font-weight: bold;
              font-size: 11pt;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 12px;
            }
            h1 {
              font-size: 28pt;
              color: #78350f;
              margin: 4px 0 8px 0;
              font-weight: 900;
              text-transform: uppercase;
            }
            .subtitle {
              font-size: 12pt;
              color: #4b5563;
              margin-bottom: 20px;
              font-weight: bold;
            }
            .student-section {
              border-top: 1px solid #d1d5db;
              border-bottom: 1px solid #d1d5db;
              padding: 14px 0;
              margin: 16px 0;
            }
            .student-label {
              font-size: 10.5pt;
              color: #6b7280;
              text-transform: uppercase;
              font-weight: bold;
            }
            .student-name {
              font-size: 26pt;
              font-weight: 900;
              color: #92400e;
              margin: 4px 0;
            }
            .rank-box {
              background: #fef9c3;
              border: 1px solid #fde047;
              border-radius: 10px;
              padding: 12px;
              margin: 16px 0;
            }
            .rank-title {
              font-size: 22pt;
              font-weight: 800;
              color: #854d0e;
            }
            .stats-grid {
              display: flex;
              justify-content: space-around;
              margin: 20px 0;
              gap: 12px;
            }
            .stat-item {
              flex: 1;
              background: #ffffff;
              border: 1px solid #e5e7eb;
              padding: 12px;
              border-radius: 8px;
            }
            .stat-label {
              font-size: 9.5pt;
              color: #6b7280;
              display: block;
              font-weight: bold;
            }
            .stat-val {
              font-size: 15pt;
              font-weight: 900;
              color: #111827;
            }
            .footer-sig {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              margin-top: 24px;
              padding-top: 12px;
              border-top: 1px solid #d1d5db;
            }
          </style>
        </head>
        <body>
          <div class="cert-card">
            <div class="inner-border">
              <div class="badge">CHỨNG NHẬN KẾT QUẢ HỌC TẬP NGỮ VĂN</div>
              <h1>BẰNG CHỨNG NHẬN HÀNH QUÂN</h1>
              <div class="subtitle">Chủ đề: Chiếc Gậy Trường Sơn - Kháng Chiến Chống Mỹ Cứu Nước</div>

              <div class="student-section">
                <div class="student-label">Trao tặng cho Học sinh:</div>
                <div class="student-name">${summary.playerName || 'Chiến Sĩ Trường Sơn'}</div>
                ${summary.classGroup ? `<div style="font-weight: bold; font-size: 12pt; color: #374151;">Lớp / Nhóm: ${summary.classGroup}</div>` : ''}
              </div>

              <div class="rank-box">
                <div style="font-size: 10pt; font-weight: bold; color: #854d0e; text-transform: uppercase;">Danh hiệu đạt được:</div>
                <div class="rank-title">${summary.rankTitle}</div>
                <div style="font-size: 18pt; margin-top: 2px;">${starsStr}</div>
              </div>

              <div class="stats-grid">
                <div class="stat-item">
                  <span class="stat-label">Điểm Số</span>
                  <span class="stat-val" style="color: #16a34a;">${summary.score} / ${summary.maxScore}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Số Câu Đúng</span>
                  <span class="stat-val" style="color: #d97706;">${summary.correctCount} / ${summary.totalQuestions}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Combo Cao Nhất</span>
                  <span class="stat-val" style="color: #ea580c;">x${summary.maxCombo}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Tổng Thời Gian</span>
                  <span class="stat-val" style="color: #0284c7;">${summary.totalTimeSpent}s</span>
                </div>
              </div>

              <div class="footer-sig">
                <div style="text-align: left;">
                  <div style="font-size: 10pt; color: #4b5563;">Ngày hoàn thành: <strong>${summary.date}</strong></div>
                  <div style="font-size: 10pt; color: #1e3a8a; font-weight: bold; margin-top: 2px;">Môn học: Ngữ Văn THCS - THPT</div>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: 10pt; font-weight: bold; color: #374151;">Xác nhận của Giáo viên</div>
                  <div style="font-style: italic; font-size: 11pt; margin: 15px 0 5px 0; color: #78350f;">(Đã xác nhận)</div>
                  <div style="font-size: 11pt; font-weight: bold; color: #111827;">Giáo viên Bộ môn</div>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      doc.open();
      doc.write(printHtml);
      doc.close();

      setTimeout(() => {
        try {
          printFrame.contentWindow?.focus();
          printFrame.contentWindow?.print();
        } catch {
          window.print();
        }
        setTimeout(() => {
          if (document.body.contains(printFrame)) {
            document.body.removeChild(printFrame);
          }
        }, 2000);
      }, 300);
    } else {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="printable-area relative w-full max-w-3xl bg-stone-900 border-4 border-amber-500/60 rounded-3xl p-6 sm:p-10 text-stone-100 shadow-2xl overflow-hidden print:p-8 print:border-2 print:shadow-none print:bg-white print:text-black">
        {/* Close Button (Hidden when printing) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-all print:hidden cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Decorative Border */}
        <div className="border-2 border-dashed border-amber-400/40 p-6 sm:p-8 rounded-2xl relative">
          {/* Header Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 font-bold text-xs uppercase tracking-widest mb-3 print:text-amber-700 print:bg-amber-100">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              CHỨNG NHẬN KẾT QUẢ HỌC TẬP NGỮ VĂN
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-amber-300 tracking-tight mb-1 print:text-amber-800">
              BẰNG CHỨNG NHẬN HÀNH QUÂN
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 font-semibold print:text-stone-700">
              Chủ đề bài học: Chiếc Gậy Trường Sơn - Kháng Chiến Chống Mỹ Cứu Nước
            </p>
          </div>

          {/* Student Name */}
          <div className="text-center my-6 py-4 border-y border-stone-800 print:border-stone-300">
            <p className="text-stone-400 text-xs uppercase font-bold tracking-wider mb-1 print:text-stone-600">
              Trao tặng cho Học sinh:
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-200 print:text-amber-900">
              {summary.playerName || 'Chiến Sĩ Trường Sơn'}
            </h2>
            {summary.classGroup && (
              <p className="text-sm text-amber-400/90 font-bold mt-1 print:text-stone-700">
                Lớp / Nhóm: {summary.classGroup}
              </p>
            )}
          </div>

          {/* Rank Title & Stars */}
          <div className="text-center my-6 bg-amber-950/30 p-4 rounded-xl border border-amber-500/20 print:bg-amber-50">
            <p className="text-xs text-amber-300 font-bold uppercase tracking-wider mb-1 print:text-amber-800">
              Danh Hiệu Đạt Được:
            </p>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 print:text-amber-900">
              {summary.rankTitle}
            </div>
            <div className="text-2xl mt-1">
              {'⭐'.repeat(summary.stars)}
            </div>
          </div>

          {/* Performance Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 text-center">
            <div className="bg-stone-950/50 p-3 rounded-xl border border-stone-800 print:bg-stone-100 print:border-stone-300">
              <span className="block text-xs text-stone-400 font-bold print:text-stone-600">Điểm Số</span>
              <span className="text-lg font-black text-emerald-400 print:text-emerald-700">{summary.score} / {summary.maxScore}</span>
            </div>

            <div className="bg-stone-950/50 p-3 rounded-xl border border-stone-800 print:bg-stone-100 print:border-stone-300">
              <span className="block text-xs text-stone-400 font-bold print:text-stone-600">Số Câu Đúng</span>
              <span className="text-lg font-black text-amber-300 print:text-amber-800">{summary.correctCount} / {summary.totalQuestions}</span>
            </div>

            <div className="bg-stone-950/50 p-3 rounded-xl border border-stone-800 print:bg-stone-100 print:border-stone-300">
              <span className="block text-xs text-stone-400 font-bold print:text-stone-600">Combo Cao Nhất</span>
              <span className="text-lg font-black text-orange-400 print:text-orange-700">x{summary.maxCombo}</span>
            </div>

            <div className="bg-stone-950/50 p-3 rounded-xl border border-stone-800 print:bg-stone-100 print:border-stone-300">
              <span className="block text-xs text-stone-400 font-bold print:text-stone-600">Tổng Thời Gian</span>
              <span className="text-lg font-black text-cyan-300 print:text-cyan-800">{summary.totalTimeSpent}s</span>
            </div>
          </div>

          {/* Date & Signatures */}
          <div className="flex justify-between items-end mt-8 pt-6 border-t border-stone-800 text-xs sm:text-sm print:border-stone-300">
            <div>
              <p className="text-stone-400 font-semibold print:text-stone-600">Ngày hoàn thành: {summary.date}</p>
              <p className="text-amber-400/80 font-bold mt-1 print:text-stone-800">Môn học: Ngữ Văn THCS - THPT</p>
            </div>
            <div className="text-center">
              <p className="text-stone-400 font-bold print:text-stone-700">Xác nhận của Giáo viên</p>
              <div className="h-10 my-1 font-serif italic text-amber-300/80 print:text-stone-800 flex items-center justify-center">
                (Đã xác nhận)
              </div>
              <p className="text-stone-300 font-extrabold print:text-black">Giáo viên Bộ môn</p>
            </div>
          </div>
        </div>

        {/* Print Action Buttons (Hidden when printing) */}
        <div className="mt-6 flex gap-3 justify-end print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-sm transition-all cursor-pointer"
          >
            Đóng
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-stone-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            In Bằng Chứng Nhận / Lưu PDF
          </button>
        </div>
      </div>
    </div>
  );
};

