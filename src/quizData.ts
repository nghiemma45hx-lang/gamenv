import { QuizItem, SubjectTopic } from './types';

/**
 * MẢNG CÂU HỎI MẶC ĐỊNH CHO MÔN NGỮ VĂN
 */
export const QUIZ_DATA: QuizItem[] = [
  {
    id: 1,
    question: "Bài hát / Tác phẩm 'Chiếc gậy Trường Sơn' gắn liền với thời kỳ lịch sử nào của dân tộc?",
    options: [
      "A. Thời kỳ kháng chiến chống Pháp",
      "B. Thời kỳ kháng chiến chống Mỹ cứu nước",
      "C. Thời kỳ chiến tranh bảo vệ biên giới",
      "D. Thời kỳ xây dựng chủ nghĩa xã hội ở miền Bắc"
    ],
    correct: 1,
    explanation: "'Chiếc gậy Trường Sơn' được nhạc sĩ Phạm Tuyên sáng tác năm 1967 trong thời kỳ Kháng chiến chống Mỹ cứu nước, cổ vũ tinh thần xẻ dọc Trường Sơn đi cứu nước của thế hệ trẻ Việt Nam.",
    category: "Lịch sử & Tác cảnh"
  },
  {
    id: 2,
    question: "Tác giả sáng tác bài hát nổi tiếng 'Chiếc gậy Trường Sơn' là ai?",
    options: [
      "A. Nhạc sĩ Phạm Tuyên",
      "B. Nhạc sĩ Văn Cao",
      "C. Nhạc sĩ Phan Huỳnh Điểu",
      "D. Nhạc sĩ Hoàng Hiệp"
    ],
    correct: 0,
    explanation: "Nhạc sĩ Phạm Tuyên là tác giả của ca khúc nổi tiếng này. Ông đã bắt trọn không khí hừng hực khí thế của thanh niên thời đại chống Mỹ cứu nước lên đường ra tiền tuyến.",
    category: "Tác giả"
  },
  {
    id: 3,
    question: "Hình ảnh 'chiếc gậy Trường Sơn' trong bài hát tượng trưng cho điều gì sâu sắc nhất?",
    options: [
      "A. Sự thiếu thốn trang thiết bị của bộ đội ta",
      "B. Ý chí quật cường, dẻo dai và lòng yêu nước của thế hệ trẻ",
      "C. Đồ vật bình thường chỉ dùng để chống đường trơn trượt",
      "D. Hình ảnh tượng trưng cho tuổi già và sự mệt mỏi"
    ],
    correct: 1,
    explanation: "Chiếc gậy tre giản dị không chỉ giúp nâng đỡ bước chân trên dốc đá Trường Sơn gian nguy, mà còn là biểu tượng nghệ thuật cho sức mạnh dẻo dai, ý chí sắt đá và tình yêu Tổ quốc dâng trào.",
    category: "Ý nghĩa biểu tượng"
  },
  {
    id: 4,
    question: "Nguồn gốc thực tế của phong trào tặng 'Chiếc gậy hành quân' xuất phát từ địa danh nào?",
    options: [
      "A. Xã Hòa Xá (Ứng Hòa, Hà Tây cũ - nay thuộc Hà Nội)",
      "B. Quê hương Bến Tre với phong trào Đồng Khởi",
      "C. Chiến khu Việt Bắc (Tuyên Quang)",
      "D. Ngã ba Đồng Lộc (Hà Tĩnh)"
    ],
    correct: 0,
    explanation: "Phong trào chiếc gậy hành quân khởi xướng từ làng Hòa Xá (Ứng Hòa). Chiếc gậy tre đẽo gọt cẩn thận được khắc lời thề dặn dò các tân binh trước giờ vượt dãy Trường Sơn vào Nam chiến đấu.",
    category: "Bối cảnh thực tế"
  },
  {
    id: 5,
    question: "Câu hát 'Vượt qua dốc đá gian nguy coi thường' phản ánh phẩm chất gì của người chiến sĩ?",
    options: [
      "A. Tinh thần lạc quan cách mạng, dũng cảm và sẵn sàng hy sinh",
      "B. Sự bộc phát nông nổi của tuổi trẻ",
      "C. Tâm lý hoang mang lo sợ trước núi cao vực sâu",
      "D. Tinh thần phó mặc cho số phận"
    ],
    correct: 0,
    explanation: "Từ 'coi thường' ở đây thể hiện tư thế chủ động, bản lĩnh vững vàng và tinh thần lạc quan yêu đời của các chiến sĩ thanh niên xung phong trước thử thách thiên nhiên khắc nghiệt.",
    category: "Phân tích tâm lý"
  },
  {
    id: 6,
    question: "Tuyến đường Trường Sơn (Đường Hồ Chí Minh) mang tầm vóc lịch sử như thế nào?",
    options: [
      "A. Tuyến đường huyết mạch nối liền hậu phương miền Bắc với tiền tuyến miền Nam",
      "B. Con đường giao thương thương mại quốc tế",
      "C. Khu du lịch thám hiểm thời chiến",
      "D. Tuyến đường sắt vận chuyển hàng hóa nội địa"
    ],
    correct: 0,
    explanation: "Đường Trường Sơn là mạch máu giao thông chiến lược, con đường huyền thoại ghi dấu sự hy sinh anh dũng và ý chí 'Không có gì quý hơn độc lập tự do' của dân tộc.",
    category: "Bối cảnh lịch sử"
  },
  {
    id: 7,
    question: "Nhịp điệu rộn rã, khỏe khoắn của bài hát gợi liên tưởng đến hình ảnh nào?",
    options: [
      "A. Nhịp bước chân hành quân trùng trùng điệp điệp của đoàn quân",
      "B. Nhịp ru êm đềm của người mẹ miền quê",
      "C. Nhịp gõ trôi chảy của dòng sông mây",
      "D. Tiếng mưa rơi trên mái lá hậu phương"
    ],
    correct: 0,
    explanation: "Âm hưởng hào hùng, nhịp bước chắc khỏe của ca khúc tái hiện chân thực tư thế hiên ngang, khí thế hành quân nức lòng của hàng triệu thanh niên Việt Nam.",
    category: "Nghệ thuật âm nhạc"
  },
  {
    id: 8,
    question: "Biện pháp nghệ thuật nổi bật được sử dụng khi miêu tả chiếc gậy tre giản dị là gì?",
    options: [
      "A. Ẩn dụ nghệ thuật và nâng tầm thành biểu tượng anh hùng",
      "B. Nói giảm nói tránh để bớt đau thương",
      "C. Phóng đại phi thực tế",
      "D. So sánh đối lập gay gắt"
    ],
    correct: 0,
    explanation: "Hình ảnh chiếc gậy tre mộc mạc được nâng lên thành một ẩn dụ nghệ thuật giàu sức gợi, kết nối tình cảm hậu phương - tiền tuyến và tiếp sức cho những chặng đường chiến thắng.",
    category: "Nghệ thuật văn học"
  },
  {
    id: 9,
    question: "Chất trữ tình kết hợp với chất anh hùng ca trong bài hát tạo nên vẻ đẹp gì cho người lính?",
    options: [
      "A. Vẻ đẹp vừa dũng cảm kiên cường, vừa lãng mạn, trẻ trung và tràn đầy niềm tin",
      "B. Vẻ đẹp trầm ngâm, ủy mị và buồn thương",
      "C. Vẻ đẹp thô giáp, thiếu đi cảm xúc đời thường",
      "D. Vẻ đẹp huyền bí, khó tiếp cận"
    ],
    correct: 0,
    explanation: "Đó là vẻ đẹp đặc trưng của thế hệ trẻ Việt Nam thời kỳ chống Mỹ: tâm hồn trong sáng, tình yêu quê hương da thiết kết hợp với bản lĩnh quật cường ra trận.",
    category: "Cảm hứng chủ đạo"
  },
  {
    id: 10,
    question: "Bài học ý nghĩa nhất mà học sinh thế hệ hôm nay nhận được từ bài học 'Chiếc gậy Trường Sơn' là gì?",
    options: [
      "A. Kế thừa truyền thống yêu nước, rèn luyện ý chí vượt khó và tinh thần cống hiến",
      "B. Chỉ cần học thuộc các bài thơ cũ để làm bài thi",
      "C. Tìm kiếm các lối đi tắt dễ dàng trong cuộc sống",
      "D. Giữ gìn gậy tre làm đồ vật trang trí"
    ],
    correct: 0,
    explanation: "Chiếc gậy Trường Sơn trao truyền bài học về tinh thần vượt khó, lòng biết ơn sâu sắc các thế hệ cha anh và nhắc nhở tuổi trẻ hôm nay nỗ lực học tập, xây dựng đất nước đàng hoàng hơn, to đẹp hơn.",
    category: "Bài học liên hệ"
  }
];

/**
 * CÂU HỎI MÔN LỊCH SỬ
 */
export const HISTORY_QUIZ: QuizItem[] = [
  {
    id: 101,
    question: "Tuyến đường chiến lược Trường Sơn (Đường Hồ Chí Minh) chính thức được mở vào ngày tháng năm nào?",
    options: [
      "A. Ngày 19/05/1959",
      "B. Ngày 22/12/1944",
      "C. Ngày 02/09/1945",
      "D. Ngày 30/04/1975"
    ],
    correct: 0,
    explanation: "Bộ Chính trị và Quân ủy Trung ương quyết định thành lập 'Đoàn công tác quân sự đặc biệt' (Đoàn 559) vào ngày 19/5/1959, đúng sinh nhật Chủ tịch Hồ Chí Minh.",
    category: "Mốc lịch sử"
  },
  {
    id: 102,
    question: "Đoàn quân sự đầu tiên có nhiệm vụ xẻ núi mở đường Trường Sơn có phiên hiệu là gì?",
    options: [
      "A. Đoàn 559",
      "B. Đoàn 312",
      "C. Đoàn 308",
      "D. Đoàn 555"
    ],
    correct: 0,
    explanation: "Đoàn 559 do Thượng tá Võ Bẩm làm Trưởng đoàn được giao nhiệm vụ chi viện cho chiến trường miền Nam.",
    category: "Lịch sử Quân đội"
  },
  {
    id: 103,
    question: "Địa danh nào trên đường Trường Sơn được mệnh danh là 'Tọa độ lửa', nơi 10 nữ thanh niên xung phong hy sinh anh dũng?",
    options: [
      "A. Ngã ba Đồng Lộc (Hà Tĩnh)",
      "B. Hang Tám Cô (Quảng Bình)",
      "C. Thành cổ Quảng Trị",
      "D. Khe Sanh"
    ],
    correct: 0,
    explanation: "Ngã ba Đồng Lộc là điểm nút giao thông quan trọng bậc nhất, nơi 10 cô gái thanh niên xung phong Tiểu đội 4 đã anh dũng hy sinh năm 1968.",
    category: "Địa danh lịch sử"
  },
  {
    id: 104,
    question: "Khẩu hiệu nổi tiếng nào thể hiện quyết tâm sắt đá của các chiến sĩ lái xe Trường Sơn?",
    options: [
      "A. Yêu xe như con, quý xăng như máu",
      "B. Nhất cận thị, nhị cận giang",
      "C. Tiến nhanh, tiến mạnh, tiến vững chắc",
      "D. Thà hy sinh chứ không chịu làm nô lệ"
    ],
    correct: 0,
    explanation: "'Yêu xe như con, quý xăng như máu, vượt mọi khó khăn hoàn thành nhiệm vụ' là khẩu hiệu khắc sâu trong tim các chiến sĩ lái xe Đoàn 559.",
    category: "Khẩu hiệu hành động"
  },
  {
    id: 105,
    question: "Tập thơ nổi tiếng 'Bài thơ về tiểu đội xe không kính' của Phạm Tiến Duật viết về lực lượng nào?",
    options: [
      "A. Những người chiến sĩ lái xe trên đường Trường Sơn",
      "B. Bộ đội công binh rà phá bom mìn",
      "C. Lực lượng pháo thủ phòng không",
      "D. Thanh niên xung phong đào hầm"
    ],
    correct: 0,
    explanation: "Nhà thơ Phạm Tiến Duật từng trực tiếp sống và chiến đấu trên tuyến đường Trường Sơn, sáng tác nên bài thơ bất hủ về hình ảnh những chiếc xe không kính và khí thế hiên ngang của các chiến sĩ.",
    category: "Văn học Lịch sử"
  }
];

/**
 * CÂU HỎI MÔN ĐỊA LÝ
 */
export const GEOGRAPHY_QUIZ: QuizItem[] = [
  {
    id: 201,
    question: "Dãy núi Trường Sơn kéo dài qua hai vùng địa lý lớn nào của nước ta?",
    options: [
      "A. Trường Sơn Bắc và Trường Sơn Nam",
      "B. Hoàng Liên Sơn và Tây Bắc",
      "C. Đông Bắc và Tây Bắc",
      "D. Đông Nam Bộ và Tây Nguyên"
    ],
    correct: 0,
    explanation: "Dãy núi Trường Sơn trải dài dọc theo biên giới phía Tây nước ta, chia làm 2 bộ phận chính: Trường Sơn Bắc (từ sông Cả đến đèo Hải Vân) và Trường Sơn Nam (từ đèo Hải Vân đến Nam Bộ).",
    category: "Địa hình"
  },
  {
    id: 202,
    question: "Hiện tượng thời tiết đặc trưng gây khô nóng vào mùa hè ở sườn Đông Trường Sơn là gì?",
    options: [
      "A. Gió phơn Tây Nam (Gió Lào)",
      "B. Gió mùa Đông Bắc",
      "C. Sương mù bao phủ",
      "D. Mưa rào bão tuyết"
    ],
    correct: 0,
    explanation: "Khi gió mùa Tây Nam vượt qua dãy Trường Sơn, hơi ẩm đọng lại ở sườn Tây (Lào), sang sườn Đông (Việt Nam) trở nên rất khô và nóng, gọi là hiện tượng phơn.",
    category: "Khí hậu"
  },
  {
    id: 203,
    question: "Đỉnh núi cao nhất của dải núi Trường Sơn Nam là đỉnh núi nào?",
    options: [
      "A. Đỉnh Ngọc Linh (2.598m)",
      "B. Đỉnh Phan-xi-păng",
      "C. Đỉnh Tây Con Lĩnh",
      "D. Đỉnh Ba Vì"
    ],
    correct: 0,
    explanation: "Khối núi Ngọc Linh nằm trên ranh giới tỉnh Kon Tum và Quảng Nam là khối núi cao nhất của dải Trường Sơn Nam (2.598m).",
    category: "Đỉnh núi"
  },
  {
    id: 204,
    question: "Loại đất đai phì nhiêu nổi tiếng bao phủ rộng lớn ở vùng cao nguyên Trường Sơn Nam (Tây Nguyên) là loại đất nào?",
    options: [
      "A. Đất đỏ ba-zan (Basalt)",
      "B. Đất phù sa sông cổ",
      "C. Đất cát biển",
      "D. Đất mặn vùng ven biển"
    ],
    correct: 0,
    explanation: "Đất đỏ bazan màu mỡ trên các cao nguyên rộng lớn ở Tây Nguyên rất thích hợp phát triển cây công nghiệp dài ngày như cà phê, hồ tiêu, cao su, trà.",
    category: "Thổ nhưỡng"
  }
];

/**
 * CÂU HỎI MÔN TIẾNG ANH
 */
export const ENGLISH_QUIZ: QuizItem[] = [
  {
    id: 301,
    question: "Choose the correct English word for 'Chiếc gậy hành quân / walking stick':",
    options: [
      "A. Walking stick / Cane",
      "B. Wooden sword",
      "C. Iron shield",
      "D. Bamboo ladder"
    ],
    correct: 0,
    explanation: "'Walking stick' or 'cane' refers to a stick used to assist in walking, especially during long treks or hiking.",
    category: "Vocabulary"
  },
  {
    id: 302,
    question: "Fill in the blank: 'The soldiers marched ________ the Truong Son Mountain Range during the war.'",
    options: [
      "A. across",
      "B. under",
      "C. inside",
      "D. behind"
    ],
    correct: 0,
    explanation: "'March across' means to walk in a military formation across a region or geographical obstacle.",
    category: "Grammar"
  },
  {
    id: 303,
    question: "What is the synonym of 'BRAVE' in English?",
    options: [
      "A. Courageous / Heroic",
      "B. Fearful",
      "C. Hesitant",
      "D. Weak"
    ],
    correct: 0,
    explanation: "'Courageous' and 'heroic' are close synonyms of 'brave' (dũng cảm, anh hùng).",
    category: "Synonym"
  },
  {
    id: 304,
    question: "Identify the correct passive sentence: 'Musician Pham Tuyen composed the song Truong Son Stick in 1967.'",
    options: [
      "A. The song Truong Son Stick was composed by musician Pham Tuyen in 1967.",
      "B. The song Truong Son Stick is composed by musician Pham Tuyen.",
      "C. Musician Pham Tuyen was composed by the song in 1967.",
      "D. The song Truong Son Stick had composed Pham Tuyen in 1967."
    ],
    correct: 0,
    explanation: "Past simple passive formula: Object + was/were + V3/ed + by Subject.",
    category: "Passive Voice"
  }
];

/**
 * CÂU HỎI MÔN TOÁN HỌC & LOGIC
 */
export const MATH_QUIZ: QuizItem[] = [
  {
    id: 401,
    question: "Một đoàn bộ đội hành quân qua dãy núi dài 120 km. Mỗi ngày đoàn đi được 20 km. Hỏi đoàn mất bao nhiêu ngày để hoàn thành?",
    options: [
      "A. 6 ngày",
      "B. 5 ngày",
      "C. 7 ngày",
      "D. 8 ngày"
    ],
    correct: 0,
    explanation: "Thời gian = Quãng đường / Vận tốc = 120 / 20 = 6 ngày.",
    category: "Toán Thực Tế"
  },
  {
    id: 402,
    question: "Tính nhanh tổng chuỗi số sau: S = 1 + 2 + 3 + ... + 10",
    options: [
      "A. 55",
      "B. 50",
      "C. 60",
      "D. 45"
    ],
    correct: 0,
    explanation: "Công thức tính tổng dãy số cách đều: (Số đầu + Số cuối) × Số số hạng / 2 = (1 + 10) × 10 / 2 = 55.",
    category: "Toán Logic"
  },
  {
    id: 403,
    question: "Nếu 3 chiếc gậy tre có thể làm xong trong 6 giờ, hỏi 6 chiếc gậy tre làm với năng suất tương tự mất bao nhiêu giờ?",
    options: [
      "A. 12 giờ",
      "B. 6 giờ",
      "C. 3 giờ",
      "D. 9 giờ"
    ],
    correct: 0,
    explanation: "Số gậy tăng gấp 2 lần (6/3 = 2), thời gian làm tăng tương ứng 2 lần = 6 × 2 = 12 giờ.",
    category: "Tỉ Lệ Thuận"
  }
];

/**
 * DANH SÁCH MÔN HỌC & CHỦ ĐỀ MẶC ĐỊNH
 */
export const DEFAULT_SUBJECTS: SubjectTopic[] = [
  {
    id: 'ngu-van-chiec-gay-truong-son',
    name: 'Chiếc Gậy Trường Sơn',
    subjectCategory: 'Ngữ Văn',
    iconEmoji: '🪖',
    badgeText: 'Lớp 11 - Văn Học',
    description: 'Tác phẩm, bối cảnh lịch sử, ý nghĩa nghệ thuật và giá trị biểu tượng của ca khúc Chiếc gậy Trường Sơn.',
    questions: QUIZ_DATA,
  },
  {
    id: 'lich-su-duong-truong-son',
    name: 'Đường Trường Sơn Huyền Thoại',
    subjectCategory: 'Lịch Sử',
    iconEmoji: '📜',
    badgeText: 'Lịch Sử THPT',
    description: 'Tìm hiểu lịch sử mở đường Hồ Chí Minh (1959-1975), mốc sự kiện 559 và các anh hùng lực lượng vũ trang.',
    questions: HISTORY_QUIZ,
  },
  {
    id: 'dia-ly-truong-son-viet-nam',
    name: 'Địa Lý Dãy Trường Sơn & VN',
    subjectCategory: 'Địa Lý',
    iconEmoji: '🗺️',
    badgeText: 'Địa Lý Việt Nam',
    description: 'Đặc điểm địa hình Trường Sơn Bắc - Nam, khí hậu gió phơn Tây Nam và thổ nhưỡng Tây Nguyên.',
    questions: GEOGRAPHY_QUIZ,
  },
  {
    id: 'tieng-anh-thpt-quiz',
    name: 'English Grammar & Vocabulary',
    subjectCategory: 'Tiếng Anh',
    iconEmoji: '🇬🇧',
    badgeText: 'B1 / B2 Level',
    description: 'Luyện tập từ vựng chủ đề lịch sử, ngữ pháp câu bị động, trạng từ và giới từ chỉ chuyển động.',
    questions: ENGLISH_QUIZ,
  },
  {
    id: 'toan-hoc-tu-duy-logic',
    name: 'Tư Duy Toán Học & Logic',
    subjectCategory: 'Toán Học',
    iconEmoji: '🧮',
    badgeText: 'Toán & Logic',
    description: 'Bài tập tính nhanh, bài toán thực tế hành quân và giải quyết vấn đề bằng tư duy toán học.',
    questions: MATH_QUIZ,
  },
];

export const RANK_TITLES = [
  { minAccuracy: 0, title: "Tân Binh Học Tập 🎒", stars: 1, message: "Cố gắng lên! Hãy ôn tập kĩ lại các kiến thức bài học để đạt điểm số cao hơn nhé!" },
  { minAccuracy: 60, title: "Học Viên Quật Cường 🪖", stars: 2, message: "Rất tốt! Bạn đã nắm chắc kiến thức cơ bản và hoàn thành bài kiểm tra thành công!" },
  { minAccuracy: 90, title: "Trạng Nguyên Xuất Sắc 🎖️", stars: 3, message: "Xuất sắc tuyệt vời! Bạn sở hữu hiểu biết sâu sắc và tinh thần học tập vượt trội!" }
];
