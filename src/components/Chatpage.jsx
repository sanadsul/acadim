import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaArrowLeft,
  FaArrowRight,
  FaCog,
  FaInfoCircle,
  FaHome,
  FaSearch,
  FaBookmark,
  FaSpinner,
  FaChevronDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Turn } from "hamburger-react";
import { FiSend } from "react-icons/fi";
// import "../chatpage.css"; // استيراد ملف التنسيق CSS الخارجي

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSidebarButton, setShowSidebarButton] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiActive, setApiActive] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setApiError(null); // Reset error before new request
    setLoading(true);
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    try {
      setApiActive(true);
      const API_KEY = "AIzaSyC9LICqluNie-IlO4wvY91WqszQkrrytog"; // استخراج مفتاح API من متغيرات البيئة
      if (!API_KEY) {
        throw new Error("API key is missing. Please provide Gemini API key.");
      }
      // استبدال الرابط بنقطة نهاية API الخاصة بـ Gemini 1.5 Flash
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
          API_KEY,
        {
          contents: [
            {
              parts: [{ text: input }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status != 200) {
        throw new Error(`API Request failed with status ${response.status}`);
      }

      const botMessage =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "لم يتم الحصول على رد من البوت";

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, sender: "bot" },
      ]);
    } catch (error) {
      console.error("API Error:", error);
      setApiError(error.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: `حدث خطأ: ${
            error.message || "مشكلة في الاتصال بالخادم"
          }، الرجاء المحاولة مرة أخرى.`,
          sender: "bot",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
      setApiActive(false);
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const handleScroll = () => {
        setShowScrollButton(
          chatContainer.scrollTop + chatContainer.clientHeight <
            chatContainer.scrollHeight
        );
      };
      chatContainer.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => chatContainer.removeEventListener("scroll", handleScroll);
    }
  }, [messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      setShowSidebarButton(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      dir=""
      className="chat-page min-h-screen flex"
      style={{ backgroundColor: "#f0f8ff" }}
    >
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="chat-content flex-1 flex flex-col">
        <div className="chat-container container mx-auto p-10">
          {showSidebarButton && (
            <div className="md:hidden flex justify-start mb-5">
              <button
                onClick={toggleSidebar}
                className=" focus:outline-none p-2"
              >
                {isSidebarOpen ? (
                  <FaArrowRight className="text-2xl text-blue-500" />
                ) : (
                  <FaArrowLeft className="text-2xl text-blue-500" />
                )}
              </button>
            </div>
          )}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
                محادثة الذكاء الاصطناعي
              </span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full -z-10 "></div>
            </h1>
            <p className="w-10/12 md:w-8/12 mx-auto text-gray-600 leading-relaxed md:text-lg mt-4">
              <span className="font-medium tracking-wide">
                تفاعل مع الذكاء الاصطناعي بطريقة سهلة وممتعة. اطرح أسئلتك واحصل
                على إجابات دقيقة وسريعة. استكشف إمكانيات الذكاء الاصطناعي الآن!
              </span>
            </p>
          </div>
          <div
            ref={chatContainerRef}
            className=" bg-white  border-gray-300 rounded-md p-4 mb-1 flex flex-col relative"
          >
            {showScrollButton && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-500 focus:outline-none"
              >
                <FaChevronDown className="text-lg" />
              </button>
            )}
            {messages.map((message, index) => (
              <div
                dir="ltr"
                key={index}
                className={`message-container mb-1 flex ${
                  message.sender === "user" ? "justify-end" : "justify-end"
                }`}
              >
                <div
                  className={`message rounded-lg p-3 text-lg mt-2 mb-10 max-w-[100%] md:max-w-[70%]  ${
                    message.sender === "user"
                      ? "bg-blue-200/80 text-gray-800 ml-2"
                      : "bg-g text-gray-800 mr-2"
                  } ${message.error ? "text-red-600" : ""}`}
                >
                  {message.text}
                </div>
                {/* <div className="ml-1 flex items-center">
                  {message.sender === "user" ? (
                    <FaUser className="text-lg text-blue-500" />
                  ) : (
                    <FaRobot className="text-lg text-blue-500" />
                  )}
                </div> */}
              </div>
            ))}
            {loading && (
              <div className="flex justify-center">
                <div className="flex items-center">
                  <FaSpinner className="animate-spin  text-blue-500 mr-2" />
                  <span className="font-medium text-gray-600">
                    جارٍ التحميل...
                  </span>
                </div>
              </div>
            )}
            {apiError && !loading && (
              <div className="text-center text-red-600 font-medium mt-4">
                {apiError}
              </div>
            )}
          </div>
          <div className=" fixed bottom-0 left-0 right-0 p-4">
            <div className="flex bg-gray-200 rounded-3xl items-center space-x-2 max-w-3xl mx-auto">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // منع السلوك الافتراضي
                    if (input.trim() !== "") {
                      sendMessage(); // إرسال الرسالة إذا لم تكن فارغة
                    }
                  }
                  // إذا تم الضغط على Shift + Enter، لن نفعل شيئًا لأننا نريد أن نسمح بإضافة سطر جديد
                }}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 m-1 bg-gray-200 border-gray-200 rounded-3xl p-3 resize-none"
                rows="1" // ضبط ارتفاع الحقل
              />

              {/* زر تحميل الصورة */}
              {/* <input
                type={extractedText ? "" : "file"}
                accept={"image/*"}
                onChange={extractedText ? null : handleImageUpload}
                onClick={
                  extractedText
                    ? () => toast.warning("لديك صورة تم تحميلها مسبقاً")
                    : null
                }
                className="hidden"
                id="upload-image"
              />
              <label
                htmlFor="upload-image"
                title={
                  extractedText ? "تم تحميل صورة بالفعل" : "قم بتحميل صورة"
                }
                className={
                  extractedText
                    ? "bg-gray-400 rounded-full p-2 cursor-not-allowed"
                    : "bg-[#08333C] text-white rounded-full p-2 cursor-pointer hover:bg-cyan-900"
                }
              >
                <FiImage size={18} />
              </label> */}

              <button
                onClick={sendMessage}
                title={input === "" ? "الرسالة بدون محتوى" : "إرسال الرساله"}
                disabled={input === "" || input.trim() === ""}
                className={`rounded-full p-2 focus:outline-none focus:ring-2 focus:caret-cyan-900 focus:ring-offset-2 
        ${
          input === "" || input.trim() === ""
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#08333C] text-white hover:bg-cyan-900"
        }`}
              >
                <FiSend size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`hidden
       fixed top-0 left-0 h-full bg-white shadow-md z-50 transition-transform duration-300  ${
         isOpen ? "translate-x-0" : "-translate-x-full"
       } md:translate-x-0 md:w-64 `}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 pb-0 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">قائمة التصفح</h2>
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-col flex-grow p-4">
          <Link
            to="/"
            className="flex items-center p-2 rounded-md hover:bg-blue-100 text-gray-700 mb-2"
          >
            <FaHome className="mr-2 text-lg" />
            الرئيسية
          </Link>
          <Link
            to="/search"
            className="flex items-center p-2 rounded-md hover:bg-blue-100 text-gray-700 mb-2"
          >
            <FaSearch className="mr-2 text-lg" />
            البحث
          </Link>
          <Link
            to="/chat"
            className="flex items-center p-2 rounded-md hover:bg-blue-100 text-gray-700 mb-2"
          >
            <FaRobot className="mr-2 text-lg" />
            الدردشة
          </Link>
          <Link
            to="/bookmark"
            className="flex items-center p-2 rounded-md hover:bg-blue-100 text-gray-700 mb-2"
          >
            <FaBookmark className="mr-2 text-lg" />
            المفضلة
          </Link>

          <Link
            to="/profile"
            className="flex items-center p-2 rounded-md hover:bg-blue-100 text-gray-700 mb-2"
          >
            <FaUser className="mr-2 text-lg" />
            الملف الشخصي
          </Link>
          <Link
            to="/settings"
            className="flex items-center p-2 rounded-md hover:bg-blue-100 text-gray-700 mb-2"
          >
            <FaCog className="mr-2 text-lg" />
            الإعدادات
          </Link>
          <Link
            to="/about"
            className="flex items-center p-2 rounded-md hover:bg-blue-100 text-gray-700 mb-2"
          >
            <FaInfoCircle className="mr-2 text-lg" />
            حول
          </Link>
        </nav>
        {/* Footer */}
        <div className="p-4 mt-auto border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            جميع الحقوق محفوظة © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
