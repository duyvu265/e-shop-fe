import { useState, useEffect } from "react";
import { FaLock, FaCookieBite, FaUserShield, FaHandshake, FaShieldAlt, FaInfoCircle } from "react-icons/fa";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    {
      id: "introduction",
      title: "Giới thiệu",
      icon: <FaInfoCircle className="text-2xl" />,
      content: "Chào mừng bạn đến với Chính sách bảo mật của chúng tôi. Tài liệu này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng dịch vụ của chúng tôi."
    },
    {
      id: "data-collection",
      title: "Thu thập thông tin",
      icon: <FaUserShield className="text-2xl" />,
      content: "Chúng tôi thu thập thông tin bạn cung cấp trực tiếp cho chúng tôi, bao gồm tên, địa chỉ email, địa chỉ giao hàng và thông tin thanh toán khi bạn thực hiện giao dịch."
    },
    {
      id: "cookies",
      title: "Sử dụng Cookies",
      icon: <FaCookieBite className="text-2xl" />,
      content: "Chúng tôi sử dụng cookies để cải thiện trải nghiệm duyệt web của bạn, phân tích lưu lượng truy cập trên trang web và cá nhân hóa nội dung. Bạn có thể điều chỉnh cài đặt cookies qua trình duyệt của mình."
    },
    {
      id: "security",
      title: "Bảo mật dữ liệu",
      icon: <FaLock className="text-2xl" />,
      content: "Chúng tôi thực hiện các biện pháp bảo mật mạnh mẽ để bảo vệ thông tin cá nhân của bạn khỏi việc truy cập trái phép, tiết lộ hoặc lạm dụng."
    },
    {
      id: "third-party",
      title: "Tiết lộ cho bên thứ ba",
      icon: <FaHandshake className="text-2xl" />,
      content: "Chúng tôi có thể chia sẻ thông tin của bạn với các bên thứ ba đáng tin cậy giúp chúng tôi vận hành trang web, tiến hành các giao dịch kinh doanh hoặc cung cấp dịch vụ cho bạn."
    },
    {
      id: "compliance",
      title: "Tuân thủ pháp lý",
      icon: <FaShieldAlt className="text-2xl" />,
      content: "Bằng cách sử dụng trang web của chúng tôi, bạn đồng ý với chính sách bảo mật của chúng tôi. Chúng tôi có quyền cập nhật chính sách này và các thay đổi sẽ được đăng trên trang này."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Chính sách bảo mật</h1>
          <p className="text-lg text-gray-600">Cập nhật lần cuối: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Navigation Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <nav className="sticky top-8 space-y-2" aria-label="Chính sách bảo mật Navigation">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
                    activeSection === section.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {section.icon}
                  <span>{section.title}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="mt-8 lg:mt-0 lg:col-span-3">
            <div className="prose prose-blue max-w-none">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="mb-12 scroll-mt-8 opacity-0 animate-fade-in"
                >
                  <div className="bg-white rounded-xl shadow-sm p-8 transition-transform duration-300 hover:transform hover:scale-[1.01]">
                    <div className="flex items-center space-x-3 mb-4">
                      {section.icon}
                      <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{section.content}</p>
                  </div>
                </section>
              ))}

              {/* Disclaimer */}
              <div className="mt-12 p-6 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-500 text-center">
                  Bằng cách tiếp tục sử dụng trang web của chúng tôi, bạn xác nhận rằng bạn đã đọc và hiểu Chính sách bảo mật này.
                  Chúng tôi có quyền sửa đổi chính sách này bất kỳ lúc nào mà không cần thông báo trước.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;
