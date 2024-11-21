import React, { useState } from "react";
import { FiPhone, FiMail, FiMessageSquare, FiHelpCircle, FiChevronDown, FiChevronUp } from "react-icons/fi";

const HelpCenter = () => {
  const [openSection, setOpenSection] = useState(null);

  const faqs = [
    {
      question: "Làm thế nào để tôi theo dõi đơn hàng của mình?",
      answer: "Bạn có thể theo dõi đơn hàng bằng cách đăng nhập vào tài khoản của mình và truy cập vào mục 'Lịch sử Đơn hàng'. Tại đó, bạn sẽ thấy các cập nhật theo thời gian thực về đơn hàng của mình."
    },
    {
      question: "Chính sách đổi trả của các bạn là gì?",
      answer: "Chúng tôi cung cấp chính sách đổi trả trong vòng 30 ngày đối với tất cả các sản phẩm chưa sử dụng và còn nguyên bao bì. Vui lòng tham khảo trang đổi trả của chúng tôi để biết thêm chi tiết."
    },
    {
      question: "Làm sao tôi có thể thay đổi địa chỉ giao hàng?",
      answer: "Bạn có thể cập nhật địa chỉ giao hàng trước khi xác nhận đơn hàng trong quá trình thanh toán. Đối với các đơn hàng đã được đặt, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi."
    },
    {
      question: "Các bạn có cung cấp dịch vụ vận chuyển quốc tế không?",
      answer: "Có, chúng tôi vận chuyển đến hầu hết các quốc gia trên toàn cầu. Chi phí vận chuyển và thời gian giao hàng thay đổi tùy vào địa điểm. Kiểm tra chính sách vận chuyển của chúng tôi để biết thêm chi tiết."
    }
  ];

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Trung tâm Hỗ trợ</h1>
          <p className="text-lg text-gray-600">Chúng tôi có thể hỗ trợ bạn như thế nào hôm nay?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <div className="text-blue-600 mb-4">
              <FiPhone className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Hỗ trợ qua điện thoại</h3>
            <p className="text-gray-600 mb-4">Có mặt 24/7 để giải đáp các thắc mắc gấp</p>
            <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-700 font-medium">
              +1 (234) 567-890
            </a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <div className="text-blue-600 mb-4">
              <FiMail className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Hỗ trợ qua email</h3>
            <p className="text-gray-600 mb-4">Chúng tôi sẽ phản hồi trong vòng 24 giờ</p>
            <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-700 font-medium">
              support@example.com
            </a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <div className="text-blue-600 mb-4">
              <FiMessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Trò chuyện trực tiếp</h3>
            <p className="text-gray-600 mb-4">Trò chuyện với đội ngũ hỗ trợ của chúng tôi</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">Bắt đầu trò chuyện</button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FiHelpCircle className="text-blue-600" />
              Câu hỏi thường gặp
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6">
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  {openSection === index ? (
                    <FiChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openSection === index && (
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Vẫn cần trợ giúp? Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn 24/7
          </p>
          <button className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Liên hệ đội ngũ hỗ trợ
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
