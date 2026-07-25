import { QuizItem } from '../types';

/**
 * Creates a standalone, single HTML file string containing HTML, CSS, JavaScript,
 * and the QUIZ_DATA array for direct double-click usage in any browser without a web server.
 */
export function generateSingleHtmlCode(quizList: QuizItem[]): string {
  const jsonQuizData = JSON.stringify(quizList, null, 2);

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chiếc Gậy Trường Sơn - Game Hành Quân Ngữ Văn</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
  <style>
    :root {
      --primary: #15803d;
      --primary-dark: #166534;
      --accent: #eab308;
      --accent-red: #dc2626;
      --bg-gradient: linear-gradient(135deg, #052e16 0%, #14532d 40%, #1c1917 100%);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Nunito', 'Outfit', sans-serif;
    }

    body {
      background: var(--bg-gradient);
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .glass-card {
      background: rgba(20, 83, 45, 0.45);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(250, 204, 21, 0.25);
      border-radius: 20px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
      max-width: 720px;
      width: 100%;
      padding: 28px;
      position: relative;
      overflow: hidden;
    }

    .btn {
      background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%);
      color: #1c1917;
      font-weight: 800;
      font-size: 1.1rem;
      padding: 14px 28px;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 15px rgba(234, 179, 8, 0.3);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(234, 179, 8, 0.4);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      color: #f8fafc;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .input-field {
      width: 100%;
      padding: 14px 18px;
      background: rgba(0, 0, 0, 0.3);
      border: 2px solid rgba(250, 204, 21, 0.3);
      border-radius: 12px;
      color: #fff;
      font-size: 1.1rem;
      outline: none;
      margin-bottom: 20px;
    }

    .input-field:focus {
      border-color: #eab308;
    }

    .option-btn {
      width: 100%;
      text-align: left;
      padding: 16px 20px;
      margin-bottom: 12px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      color: #fff;
      font-size: 1.05rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .option-btn:hover {
      background: rgba(250, 204, 21, 0.15);
      border-color: #eab308;
    }

    .option-btn.correct {
      background: rgba(22, 163, 74, 0.8) !important;
      border-color: #4ade80 !important;
    }

    .option-btn.wrong {
      background: rgba(220, 38, 38, 0.8) !important;
      border-color: #f87171 !important;
    }

    .progress-bar-container {
      width: 100%;
      height: 10px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: 20px;
    }

    .progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #22c55e, #eab308);
      transition: width 0.3s ease;
    }

    .shake {
      animation: shakeAnim 0.4s ease-in-out;
    }

    @keyframes shakeAnim {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-8px); }
      40%, 80% { transform: translateX(8px); }
    }

    .hidden { display: none !important; }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      background: rgba(250, 204, 21, 0.2);
      border: 1px solid #eab308;
      border-radius: 999px;
      color: #fef08a;
      font-size: 0.85rem;
      font-weight: 700;
    }
  </style>
</head>
<body>

  <div class="glass-card" id="app">
    <!-- MÀN HÌNH BẮT ĐẦU -->
    <div id="screen-start">
      <div style="text-align: center; margin-bottom: 24px;">
        <span class="badge">🪖 GAME HỌC TẬP NGỮ VĂN</span>
        <h1 style="font-size: 2.2rem; font-weight: 800; color: #fef08a; margin: 12px 0 6px;">Chiếc Gậy Trường Sơn</h1>
        <p style="color: #cbd5e1; font-size: 1.05rem;">Hành quân trắc nghiệm kiến thức lịch sử - văn học</p>
      </div>

      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 700;">Họ và tên học sinh:</label>
        <input type="text" id="player-name" class="input-field" placeholder="Nhập tên của bạn (Ví dụ: Nguyễn Văn A)" value="Chiến sĩ Trường Sơn" />

        <label style="display: block; margin-bottom: 8px; font-weight: 700;">Thời gian đếm ngược mỗi câu:</label>
        <select id="timer-setting" class="input-field">
          <option value="15">15 Giây (Thách thức)</option>
          <option value="20" selected>20 Giây (Khuyên dùng)</option>
          <option value="30">30 Giây (Thong thả)</option>
          <option value="0">Không giới hạn thời gian</option>
        </select>

        <label style="display: flex; align-items: center; gap: 8px; margin-top: 10px; cursor: pointer; font-size: 0.95rem; font-weight: 700; color: #fef08a;">
          <input type="checkbox" id="shuffle-options-chk" checked style="width: 18px; height: 18px; accent-color: #eab308;" />
          Đảo ngẫu nhiên vị trí các đáp án (A, B, C, D) khi chơi
        </label>
      </div>

      <button class="btn" style="width: 100%;" onclick="startGame()">
        🚀 BẮT ĐẦU HÀNH QUÂN
      </button>
    </div>

    <!-- MÀN HÌNH CHƠI GAME -->
    <div id="screen-play" class="hidden">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span id="question-count" style="font-weight: 700; color: #fef08a;">Câu 1 / 10</span>
        <span id="timer-display" class="badge">⏳ 20s</span>
        <span id="score-display" style="font-weight: 800; color: #4ade80;">Điểm: 0</span>
      </div>

      <div class="progress-bar-container">
        <div id="timer-bar" class="progress-bar" style="width: 100%;"></div>
      </div>

      <h2 id="question-text" style="font-size: 1.25rem; font-weight: 700; margin-bottom: 20px; line-height: 1.5;"></h2>

      <div id="options-container"></div>

      <div id="explanation-box" class="hidden" style="margin-top: 16px; padding: 16px; background: rgba(0,0,0,0.4); border-left: 4px solid #eab308; border-radius: 8px;">
        <h4 style="color: #fef08a; margin-bottom: 6px;">💡 Lời giải thích chi tiết:</h4>
        <p id="explanation-text" style="color: #e2e8f0; font-size: 0.95rem; line-height: 1.5;"></p>
        <button class="btn" style="margin-top: 14px; width: 100%;" onclick="nextQuestion()">Tiếp Tục Hành Quân ➡️</button>
      </div>
    </div>

    <!-- MÀN HÌNH KẾT THÚC -->
    <div id="screen-end" class="hidden" style="text-align: center;">
      <span class="badge">🎖️ HOÀN THÀNH HÀNH QUÂN</span>
      <h1 id="rank-title" style="font-size: 2rem; color: #fef08a; margin: 12px 0;">Anh Hùng Dãy Trường Sơn</h1>
      <div id="stars-display" style="font-size: 2.5rem; margin-bottom: 12px;">⭐⭐⭐</div>

      <div style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 12px; margin-bottom: 20px;">
        <p style="font-size: 1.1rem; margin-bottom: 6px;">Học sinh: <strong id="res-name" style="color: #fef08a;"></strong></p>
        <p style="font-size: 1.1rem; margin-bottom: 6px;">Điểm số: <strong id="res-score" style="color: #4ade80;"></strong></p>
        <p id="res-msg" style="color: #cbd5e1; font-size: 0.95rem;"></p>
      </div>

      <div style="display: flex; gap: 12px;">
        <button class="btn btn-secondary" style="flex: 1;" onclick="location.reload()">🔄 Chơi Lại</button>
        <button class="btn" style="flex: 1;" onclick="window.print()">🖨️ In Bảng Điểm</button>
      </div>
    </div>
  </div>

  <script>
    /* ===================================================
       CẤU TRÚC DỮ LIỆU ĐỂ GIÁO VIÊN DỄ SỬA SAU NÀY
       =================================================== */
    const QUIZ_DATA = ${jsonQuizData};

    // Web Audio API Synthesizer with Polyphonic Chord Harmonies
    const AudioEngine = {
      ctx: null,
      getCtx() {
        if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (this.ctx.state === 'suspended') this.ctx.resume();
        return this.ctx;
      },
      playChord(freqs, duration = 0.4, type = 'triangle') {
        try {
          const c = this.getCtx();
          const now = c.currentTime;
          freqs.forEach(f => {
            const osc = c.createOscillator(), g = c.createGain();
            osc.type = type; osc.frequency.setValueAtTime(f, now);
            g.gain.setValueAtTime(0.15 / freqs.length, now);
            g.gain.exponentialRampToValueAtTime(0.001, now + duration);
            osc.connect(g); g.connect(c.destination);
            osc.start(now); osc.stop(now + duration);
          });
        } catch(e) {}
      },
      playCorrect() {
        this.playChord([523.25, 659.25, 783.99, 1046.50], 0.35, 'triangle');
      },
      playWrong() {
        this.playChord([130.81, 155.56, 185.00], 0.35, 'sawtooth');
      }
    };

    let currentIdx = 0;
    let score = 0;
    let timer = null;
    let timeLeft = 20;
    let maxTime = 20;
    let playerName = '';
    let ACTIVE_QUIZ = [];

    function shuffleOptionsForQuiz(list) {
      return list.map(q => {
        const origCorrectText = (q.options[q.correct] || '').replace(/^[A-Za-z0-9]+\.\s*/, '').trim();
        const cleanOpts = q.options.map(o => o.replace(/^[A-Za-z0-9]+\.\s*/, '').trim());
        const shuffled = [...cleanOpts];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        let newCorr = shuffled.indexOf(origCorrectText);
        if (newCorr === -1) newCorr = 0;
        const formatted = shuffled.map((text, idx) => \`\${String.fromCharCode(65 + idx)}. \${text}\`);
        return { ...q, options: formatted, correct: newCorr };
      });
    }

    function startGame() {
      playerName = document.getElementById('player-name').value.trim() || 'Học sinh';
      maxTime = parseInt(document.getElementById('timer-setting').value);
      const doShuffle = document.getElementById('shuffle-options-chk').checked;

      if (doShuffle) {
        ACTIVE_QUIZ = shuffleOptionsForQuiz(QUIZ_DATA);
      } else {
        ACTIVE_QUIZ = JSON.parse(JSON.stringify(QUIZ_DATA));
      }

      document.getElementById('screen-start').classList.add('hidden');
      document.getElementById('screen-play').classList.remove('hidden');
      
      currentIdx = 0;
      score = 0;
      showQuestion();
    }

    function showQuestion() {
      const q = ACTIVE_QUIZ[currentIdx];
      document.getElementById('question-count').innerText = \`Câu \${currentIdx + 1} / \${ACTIVE_QUIZ.length}\`;
      document.getElementById('score-display').innerText = \`Điểm: \${score}\`;
      document.getElementById('question-text').innerText = q.question;
      document.getElementById('explanation-box').classList.add('hidden');

      const optsBox = document.getElementById('options-container');
      optsBox.innerHTML = '';

      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => selectAnswer(idx);
        optsBox.appendChild(btn);
      });

      resetTimer();
    }

    function resetTimer() {
      clearInterval(timer);
      if (maxTime === 0) {
        document.getElementById('timer-display').innerText = '♾️';
        document.getElementById('timer-bar').style.width = '100%';
        return;
      }

      timeLeft = maxTime;
      updateTimerUI();

      timer = setInterval(() => {
        timeLeft--;
        updateTimerUI();
        if (timeLeft <= 0) {
          clearInterval(timer);
          selectAnswer(-1); // Time out
        }
      }, 1000);
    }

    function updateTimerUI() {
      document.getElementById('timer-display').innerText = \`⏳ \${timeLeft}s\`;
      const pct = (timeLeft / maxTime) * 100;
      document.getElementById('timer-bar').style.width = pct + '%';
    }

    function selectAnswer(selectedIdx) {
      clearInterval(timer);
      const q = ACTIVE_QUIZ[currentIdx];
      const buttons = document.querySelectorAll('.option-btn');

      buttons.forEach(b => b.disabled = true);

      if (selectedIdx === q.correct) {
        score += 10;
        if (buttons[selectedIdx]) buttons[selectedIdx].classList.add('correct');
        AudioEngine.playCorrect();
        if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 60 });
      } else {
        AudioEngine.playWrong();
        document.getElementById('app').classList.add('shake');
        setTimeout(() => document.getElementById('app').classList.remove('shake'), 400);

        if (selectedIdx >= 0 && buttons[selectedIdx]) buttons[selectedIdx].classList.add('wrong');
        if (buttons[q.correct]) buttons[q.correct].classList.add('correct');
      }

      document.getElementById('explanation-text').innerText = q.explanation;
      document.getElementById('explanation-box').classList.remove('hidden');
    }

    function nextQuestion() {
      currentIdx++;
      if (currentIdx < ACTIVE_QUIZ.length) {
        showQuestion();
      } else {
        endGame();
      }
    }

    function endGame() {
      document.getElementById('screen-play').classList.add('hidden');
      document.getElementById('screen-end').classList.remove('hidden');

      document.getElementById('res-name').innerText = playerName;
      document.getElementById('res-score').innerText = \`\${score} / \${ACTIVE_QUIZ.length * 10}\`;

      const pct = (score / (ACTIVE_QUIZ.length * 10)) * 100;
      let stars = '⭐';
      let title = 'Tân Binh Trường Sơn';
      let msg = 'Cố gắng lên nhé! Hãy đọc lại các Lời giải thích để hiểu bài sâu hơn.';

      if (pct >= 90) {
        stars = '⭐⭐⭐';
        title = 'Anh Hùng Dãy Trường Sơn 🎖️';
        msg = 'Xuất sắc tuyệt vời! Bạn đã vượt qua chặng đường hành quân gian nguy bằng kiến thức vững vàng!';
        if (typeof confetti === 'function') confetti({ particleCount: 120, spread: 100 });
      } else if (pct >= 60) {
        stars = '⭐⭐';
        title = 'Chiến Sĩ Quật Cường 🪖';
        msg = 'Rất tốt! Bạn nắm vững hầu hết kiến thức trọng tâm của bài học.';
      }

      document.getElementById('stars-display').innerText = stars;
      document.getElementById('rank-title').innerText = title;
      document.getElementById('res-msg').innerText = msg;
    }
  </script>
</body>
</html>`;
}
