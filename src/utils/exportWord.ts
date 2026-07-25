import { QuizItem, GameSummary } from '../types';

/**
 * Generates and downloads a Microsoft Word (.doc) file containing all quiz questions,
 * options, answer key table, and detailed lesson explanations.
 */
export function exportQuestionsToWord(quizList: QuizItem[], docTitle = 'ĐỀ THI TRẮC NGHIỆM NGỮ VĂN - CHIẾC GẬY TRƯỜNG SƠN'): void {
  const dateStr = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const questionsHtml = quizList.map((item, index) => {
    const optionsHtml = item.options.map((opt) => `<p style="margin: 4px 0 4px 20px; font-size: 11pt; font-family: 'Times New Roman', serif;">${opt}</p>`).join('');
    return `
      <div style="margin-bottom: 18px;">
        <p style="font-size: 11.5pt; font-weight: bold; margin-bottom: 6px; font-family: 'Times New Roman', serif; color: #111827;">
          Câu ${index + 1}: ${item.question}
        </p>
        ${optionsHtml}
      </div>
    `;
  }).join('');

  // Table of Answer Keys & Explanations
  const answerTableRows = quizList.map((item, index) => {
    const correctLetter = String.fromCharCode(65 + item.correct);
    return `
      <tr>
        <td style="border: 1px solid #9ca3af; padding: 6px 10px; text-align: center; font-weight: bold;">Câu ${index + 1}</td>
        <td style="border: 1px solid #9ca3af; padding: 6px 10px; text-align: center; font-weight: bold; color: #15803d;">${correctLetter}</td>
        <td style="border: 1px solid #9ca3af; padding: 6px 10px; font-size: 10pt;">${item.explanation}</td>
      </tr>
    `;
  }).join('');

  const wordContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${docTitle}</title>
      <style>
        body {
          font-family: 'Times New Roman', serif;
          font-size: 12pt;
          line-height: 1.4;
          color: #000;
          padding: 20px;
        }
        h1 {
          font-size: 16pt;
          font-weight: bold;
          text-align: center;
          text-transform: uppercase;
          color: #166534;
          margin-bottom: 4px;
        }
        h2 {
          font-size: 13pt;
          font-weight: bold;
          text-align: center;
          margin-bottom: 16px;
          color: #374151;
        }
        .header-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .header-table td {
          vertical-align: top;
          font-size: 11pt;
        }
        .section-title {
          font-size: 13pt;
          font-weight: bold;
          color: #166534;
          border-bottom: 2px solid #166534;
          padding-bottom: 4px;
          margin-top: 24px;
          margin-bottom: 14px;
        }
        table.answers {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        table.answers th {
          background-color: #f3f4f6;
          border: 1px solid #9ca3af;
          padding: 8px;
          font-size: 11pt;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <table class="header-table">
        <tr>
          <td style="width: 50%;">
            <strong>BỘ GIÁO DỤC VÀ ĐÀO TẠO</strong><br>
            TRƯỜNG THCS - THPT<br>
            <em>Môn học: Ngữ Văn</em>
          </td>
          <td style="width: 50%; text-align: right;">
            <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br>
            Độc lập - Tự do - Hạnh phúc<br>
            <em>Ngày tạo: ${dateStr}</em>
          </td>
        </tr>
      </table>

      <h1>${docTitle}</h1>
      <h2>Chủ đề: Tác phẩm "Chiếc gậy Trường Sơn" (Thời kỳ chống Mỹ cứu nước)</h2>
      <p style="text-align: center; font-style: italic; margin-bottom: 20px;">
        (Thời gian làm bài: 15-20 phút • Số lượng: ${quizList.length} câu hỏi)
      </p>

      <div style="border: 1px solid #374151; padding: 10px; margin-bottom: 20px; font-size: 11pt;">
        <strong>Họ và tên học sinh:</strong> ............................................................................
        <strong style="margin-left: 30px;">Lớp:</strong> ...........................
      </div>

      <div class="section-title">PHẦN I: CÂU HỎI TRẮC NGHIỆM</div>
      ${questionsHtml}

      <br style="page-break-before: always;" />

      <div class="section-title">PHẦN II: BẢNG ĐÁP ÁN VÀ LỜI GIẢI THÍCH CHI TIẾT</div>
      <table class="answers">
        <thead>
          <tr>
            <th style="width: 15%;">Câu hỏi</th>
            <th style="width: 15%;">Đáp án</th>
            <th style="width: 70%;">Lời giải thích bài học</th>
          </tr>
        </thead>
        <tbody>
          ${answerTableRows}
        </tbody>
      </table>
    </body>
    </html>
  `;

  // Download Blob as Microsoft Word File (.doc)
  const blob = new Blob(['\ufeff', wordContent], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `De_Thi_Ngu_Van_Chiec_Gay_Truong_Son.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generates a Word document for student results certificate report
 */
export function exportResultsToWord(summary: GameSummary): void {
  const wordContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>KẾT QUẢ HỌC TẬP - ${summary.playerName}</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; padding: 20px; line-height: 1.5; }
        h1 { font-size: 18pt; text-align: center; color: #166534; font-weight: bold; }
        .box { border: 2px solid #166534; padding: 15px; margin: 15px 0; background: #f0fdf4; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #9ca3af; padding: 8px; font-size: 10.5pt; }
        th { background: #e5e7eb; }
      </style>
    </head>
    <body>
      <h1>BÁO CÁO KẾT QUẢ HỌC TẬP NGỮ VĂN</h1>
      <p style="text-align: center;"><strong>Bài học: Chiếc Gậy Trường Sơn</strong></p>
      
      <div class="box">
        <p><strong>Họ và tên học sinh:</strong> ${summary.playerName}</p>
        <p><strong>Lớp / Nhóm:</strong> ${summary.classGroup}</p>
        <p><strong>Danh hiệu đạt được:</strong> ${summary.rankTitle}</p>
        <p><strong>Điểm số:</strong> ${summary.score} / ${summary.maxScore}</p>
        <p><strong>Số câu trả lời đúng:</strong> ${summary.correctCount} / ${summary.totalQuestions}</p>
        <p><strong>Combo liên tiếp cao nhất:</strong> x${summary.maxCombo}</p>
        <p><strong>Ngày thực hiện:</strong> ${summary.date}</p>
      </div>

      <h3>CHI TIẾT CÁC CÂU TRẢ LỜI:</h3>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Câu hỏi</th>
            <th>Kết quả</th>
            <th>Giải thích</th>
          </tr>
        </thead>
        <tbody>
          ${summary.answers.map((ans, idx) => `
            <tr>
              <td style="text-align: center; font-weight: bold;">${idx + 1}</td>
              <td>${ans.questionText}</td>
              <td style="text-align: center; font-weight: bold; color: ${ans.isCorrect ? '#16a34a' : '#dc2626'};">
                ${ans.isCorrect ? 'ĐÚNG' : 'SAI'}
              </td>
              <td>${ans.explanation}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', wordContent], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Ket_Qua_Hoc_Tap_${summary.playerName.replace(/\s+/g, '_')}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
