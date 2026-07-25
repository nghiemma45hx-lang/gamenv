import { QuizItem } from './types';

/**
 * MẢNG DỮ LIỆU CÂU HỎI TRẮC NGHIỆM - CHIẾC GẬY TRƯỜNG SƠN
 * Giáo viên và người dùng có thể chỉnh sửa trực tiếp mảng này
 * hoặc sử dụng giao diện Quản lý câu hỏi (Teacher Editor) trong ứng dụng.
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

export const RANK_TITLES = [
  { minAccuracy: 0, title: "Tân Binh Trường Sơn 🎒", stars: 1, message: "Cố gắng lên! Hãy ôn tập kĩ lại các kiến thức bài học để vượt qua đèo dốc Trường Sơn nhé!" },
  { minAccuracy: 60, title: "Chiến Sĩ Quật Cường 🪖", stars: 2, message: "Rất tốt! Bạn đã nắm chắc kiến thức cơ bản và hành quân kiên cường qua tuyến đường gian nguy!" },
  { minAccuracy: 90, title: "Anh Hùng Dãy Trường Sơn 🎖️", stars: 3, message: "Xuất sắc tuyệt vời! Bạn sở hữu hiểu biết sâu sắc, tinh thần vượt khó và là tấm gương Anh hùng Trường Sơn!" }
];
