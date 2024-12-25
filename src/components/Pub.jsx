import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { LucideLoader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Skeleton from "../components/Skelton";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBookJournalWhills,
  faCalendarAlt,
  faFileAlt,
  faUserFriends,
  faArrowRight,
  faArrowLeft,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

function Pub() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const [query, setQuery] = useState("");
  const [allArticles, setAllArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [expandedStates, setExpandedStates] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedYear, setSelectedYear] = useState("الكل");
  const [availableYears, setAvailableYears] = useState([]);
  const isFirstRender = useRef(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const cleanText = (text) => {
    if (!text) return "";
    return text.replace(
      /[^a-zA-Z0-9\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+/g,
      " "
    );
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSkeletonLoading(true);
    setArticles([]);
    setAllArticles([]);

    try {
      let url = `https://api-research.vercel.app/api/search?q=${query}`;
      if (selectedYear !== "الكل") {
        url += `&year=${selectedYear}`;
      }
      const response = await axios.get(url);
      setAllArticles(response.data.data);
      setTotal(response.data.total);
      setPage(1);
      setTotalPages(Math.ceil(response.data.total / pageSize));
      isFirstRender.current = false;
      const years = new Set();

      setAvailableYears([...years].sort((a, b) => b - a));
    } catch (error) {
      console.error("Error fetching data:", error);
      setArticles([]);
      setAllArticles([]);
    } finally {
      setSkeletonLoading(false);
    }
  };

  useEffect(() => {
    if (!isFirstRender.current && allArticles.length > 0) {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedArticles = allArticles.slice(startIndex, endIndex);
      setArticles(paginatedArticles);
      setExpandedStates(new Array(paginatedArticles.length).fill(false));
    } else if (isFirstRender.current) {
      setArticles([]);
    }
  }, [page, allArticles, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const toggleExpanded = (index) => {
    setExpandedStates((prevStates) =>
      prevStates.map((state, idx) => (idx === index ? !state : state))
    );
  };
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const visiblePages = 3; // Number of visible pages around current page

    // Always show first page
    pages.push(1);

    // Show "..." if the current page is far from the first
    if (page > visiblePages + 1) {
      pages.push("...");
    }

    // Show pages around the current one
    for (
      let i = Math.max(2, page - visiblePages);
      i <= Math.min(totalPages - 1, page + visiblePages);
      i++
    ) {
      pages.push(i);
    }

    // Show "..." if the current page is far from the last
    if (page < totalPages - visiblePages) {
      pages.push("...");
    }

    // Always show the last page if there is more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages.map((pageNumber, index) => {
      if (pageNumber === "...") {
        return (
          <button
            key={index}
            onClick={() =>
              handlePageChange(page < totalPages / 2 ? 1 : totalPages)
            }
            className={`px-3 py-2 mx-1 rounded-md text-gray-700 hover:bg-blue-200 transition-colors duration-300`}
          >
            ...
          </button>
        );
      }
      return (
        <button
          key={index}
          onClick={() => handlePageChange(pageNumber)}
          className={`px-3 py-2 mx-1 rounded-md  ${
            page === pageNumber
              ? "bg-blue-700 text-white font-bold"
              : "bg-blue-100 text-gray-700 hover:bg-blue-200 transition-colors duration-300"
          }`}
        >
          {pageNumber}
        </button>
      );
    });
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col bg-gray-100 text-gray-800 "
      style={{ backgroundColor: "#f0f8ff" }}
    >
      <div className="container mx-auto p-6 md:p-10">
        {/* Header with gradient underline */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2 relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
              البحث عن المقالات العلمية
            </span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full -z-10"></div>
          </h1>
          <p className="w-full md:w-8/12 mx-auto text-gray-600 leading-relaxed md:text-lg mt-4">
            <span className="font-medium tracking-wide">
              اكتشف ملايين المقالات العلمية بسرعة وسهولة. نوفر لك أدوات بحث
              متطورة لتحصل على المعلومات الدقيقة التي تحتاجها. ابدأ رحلتك في
              عالم المعرفة الآن!
            </span>
            <span className="font-medium tracking-wide">
              : محرك بحث ذكي: ابحث عن الأبحاث العلمية والمقالات والمصادر ذات
              الصلة باستخدام الكلمات المفتاحية أو العبارات، وسيقوم الذكاء
              الاصطناعي بتحليل وتفسير طلبك بدقة.
            </span>
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col items-center gap-4 mb-10 mt-6 relative"
        >
          <div className="w-full flex justify-center gap-4 max-w-2xl relative">
            <div className="relative flex items-center w-3/5">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="أدخل مصطلح البحث..."
                className="border border-blue-300 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md text-gray-700 w-full pr-10"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
              </div>
            </div>
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className={`border border-blue-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md text-gray-700 w-2/5 max-w-[150px] sm:max-w-[200px] md:max-w-[300px] ${
                availableYears.length === 0 ? "hidden" : ""
              }`}
            >
              <option value="الكل">كل السنوات</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-full hover:bg-gradient-to-l transition duration-300 shadow-lg flex items-center font-medium hover:scale-105"
          >
            <span className="mr-2">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            البحث
          </button>
        </form>

        {/* Articles Display */}
        <div className="flex flex-col md:text-lg">
          {skeletonLoading && (
            <div className="flex flex-col gap-4">
              {Array(pageSize)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-xl shadow-md relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <Skeleton rows={3} />
                    <Skeleton rows={3} cols={2} width="45%" height="0.8rem" />
                    <Skeleton rows={2} cols={3} width="30%" height="0.8rem" />
                    <Skeleton width="20%" height="1.2rem" />
                    <div className="absolute top-0 left-0 w-full h-full bg-blue-50 opacity-25 rounded-xl pointer-events-none"></div>
                  </div>
                ))}
            </div>
          )}

          {Array.isArray(articles) &&
            articles.map((article, index) => (
              <div
                key={index}
                className={`bg-white p-5 rounded-xl shadow-md relative hover:shadow-xl transition-shadow duration-300 overflow-hidden border-b-2 border-gray-200`}
              >
                <div className="flex flex-col space-y-3">
                  <Link
                    to={article.link}
                    className="text-2xl text-gray-800 font-bold hover:text-blue-600 transition-colors duration-300"
                  >
                    {cleanText(article.title.trim())}
                  </Link>
                  {Array.isArray(article.fullText) &&
                    article.fullText.join(" ").length > 0 && (
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="text-blue-500 font-medium underline hover:text-blue-700 transition duration-200"
                      >
                        {expandedStates[index] ? "عرض أقل" : "عرض المزيد"}
                      </button>
                    )}
                  <div className="text-gray-600 space-y-2 mt-2 ">
                    <div
                      className={`flex items-center ${
                        article.journal === undefined ? "hidden" : ""
                      }`}
                    >
                      <span className="font-medium text-blue-500 mr-1">
                        <FontAwesomeIcon
                          icon={faBookJournalWhills}
                          className="mr-1 ml-2"
                        />
                        المجلة:
                      </span>
                      <p
                        key={article.journal}
                        className="bg-blue-50 rounded-md px-2 py-1 text-gray-700 lowercase"
                      >
                        {article.journal || "غير معروف"}
                      </p>
                    </div>
                    <div className="flex items-center  ">
                      <span className="font-medium text-blue-500 mr-1">
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className="mr-1 ml-2"
                        />
                        تاريخ النشر:
                      </span>
                      <p className="bg-blue-50 rounded-md px-2 py-1 text-gray-700">
                        {`${article.year || "غير معروف"}`}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-blue-500 mr-1">
                        <FontAwesomeIcon
                          icon={faFileAlt}
                          className="mr-1 ml-2"
                        />
                        نوع النشر:
                      </span>
                      <p className="bg-blue-50 rounded-md  px-2 py-1 text-gray-700">
                        {article.publicationType || "مجلة"}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-blue-500 mr-1">
                        <FontAwesomeIcon
                          icon={faUserFriends}
                          className="mr-1 ml-2"
                        />
                        المؤلفين:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {article.authors &&
                          article.authors.map((author, index) => (
                            <span
                              key={index}
                              className="bg-blue-50 rounded-md px-2 py-1 text-gray-700 text-xs"
                            >
                              {author || "غير معروف"}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full bg-blue-50 opacity-25 rounded-xl pointer-events-none"></div>
                  {article.link ? (
                    <div className="flex justify-center md:justify-end mt-4">
                      <button
                        onClick={() => window.open(article.link, "_blank")}
                        title="رابط المقالة الرسمي"
                        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 duration-300 mt-3 text-white py-2 px-6 rounded-full hover:bg-gradient-to-l transition duration-300 font-medium flex items-center"
                      >
                        <FontAwesomeIcon
                          icon={faExternalLinkAlt}
                          className="mr-2"
                        />
                        رابط المقالة الرسمي
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center mt-4">غير متوفر</p>
                  )}
                </div>
              </div>
            ))}
          {Array.isArray(articles) &&
            articles.length === 0 &&
            !skeletonLoading && (
              <p className="text-center text-gray-500 text-lg mt-8">
                لم يتم العثور على نتائج
              </p>
            )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && articles.length > 0 && (
          <div
            dir="ltr"
            className="flex justify-center mt-10 space-x-3 md:space-x-4 flex-wrap"
          >
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300 flex items-center`}
            >
              <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
              السابق
            </button>
            <div dir="ltr" className="flex flex-wrap justify-center">
              {renderPageNumbers()}
            </div>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed  transition-colors duration-300 flex items-center`}
            >
              التالي
              <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pub;
