import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarClock, List, FileText } from "lucide-react";

const SearchResultItem = ({ terms, result }) => {
  const parseSummary = (summary) => {
    if (!summary) return [];

    const lines = summary.split("\n").filter((line) => line.trim() !== "");
    const items = [];
    let currentItem = {};

    for (const line of lines) {
      if (
        line.startsWith("- Title: ") ||
        line.startsWith("- العنوان: ") ||
        line.startsWith("Title: ") ||
        line.startsWith("العنوان: ")
      ) {
        if (currentItem.title) {
          items.push(currentItem);
          currentItem = {};
        }
        const titlePrefix =
          line.startsWith("- Title: ") || line.startsWith("Title: ")
            ? "- Title: " || "Title: "
            : "- العنوان: " || "العنوان: ";
        currentItem.title = line.substring(titlePrefix.length).trim();
      } else if (
        line.startsWith("- Summary: ") ||
        line.startsWith("- الملخص: ") ||
        line.startsWith("Summary: ") ||
        line.startsWith("الملخص: ")
      ) {
        const summaryPrefix =
          line.startsWith("- Summary: ") || line.startsWith("Summary: ")
            ? "- Summary: " || "Summary: "
            : "- الملخص: " || "الملخص: ";
        currentItem.summary = line.substring(summaryPrefix.length).trim();
      } else if (
        line.startsWith("- Page: ") ||
        line.startsWith("- رقم الصفحة: ") ||
        line.startsWith("Page: ") ||
        line.startsWith("رقم الصفحة: ")
      ) {
        const pagePrefix =
          line.startsWith("- Page: ") || line.startsWith("Page: ")
            ? "- Page: " || "Page: "
            : "- رقم الصفحة: " || "رقم الصفحة: ";
        currentItem.page = line.substring(pagePrefix.length).trim();
      }
    }
    if (currentItem.title) {
      items.push(currentItem);
    }
    return items;
  };

  const parsedSummary = parseSummary(result?.summary);
  const isArabic =
    parsedSummary.length > 0
      ? parsedSummary[0].title.charCodeAt(0) >= 1536 &&
        parsedSummary[0].title.charCodeAt(0) <= 1791
      : false;

  return (
    <motion.div
      className="mb-8 p-6 rounded-lg transition-shadow duration-300 relative bg-white  border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-blue-50 opacity-10 pointer-events-none rounded-lg"></div>

      <div className="text-gray-700 leading-relaxed">
        {parsedSummary.length > 0
          ? parsedSummary.map((item, index) => (
              <div
                key={index}
                className={`mb-6 border p-3 rounded-lg text-xl ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                {item.title && (
                  <h4 className="font-semibold text-gray-900 mb-2 ">
                    {item.title}
                  </h4>
                )}
                {item.summary && (
                  <p
                    className="text-gray-700  text-xl"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {item.summary}
                  </p>
                )}
                {item.page && (
                  <span className="text-gray-500 block mt-2 text-sm">
                    <span className="mr-1">
                      {isArabic ? "الصفحة:" : "Page:"}
                    </span>{" "}
                    {item.page}
                  </span>
                )}
              </div>
            ))
          : result?.summary && (
              <p
                className="text-gray-700 text-base"
                style={{ whiteSpace: "pre-line" }}
              >
                {result.summary}
              </p>
            )}
        {result?.fileName && (
          <span className="text-gray-500 block mt-3  items-center gap-1 text-sm">
            <FileText className="size-3" />
            {result.fileName}
          </span>
        )}
      </div>
    </motion.div>
  );
};

const SearchDetails = () => {
  const { id } = useParams();
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchSearch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/searches/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSearch(response.data);
    } catch (err) {
      console.error("Error fetching search details:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("حدث خطأ أثناء جلب تفاصيل البحث.");
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);

  const formatDate = (dateString) => {
    if (!dateString) return "غير متاح";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    try {
      return new Date(dateString).toLocaleDateString("ar-SA", options);
    } catch (e) {
      console.error("Error formatting date:", e);
      return "غير متاح";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="p-8 bg-white rounded-2xl shadow-md max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-red-500 mb-4">{error}</p>
      </motion.div>
    );
  }

  if (!search) {
    return (
      <motion.div
        className="p-8 bg-white rounded-2xl shadow-md max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-gray-700">لم يتم العثور على تفاصيل البحث.</p>
      </motion.div>
    );
  }

  const terms = Array.isArray(search.searchTerms)
    ? search.searchTerms.length > 0
      ? search.searchTerms[0].split(",").map((term) => term.trim())
      : []
    : [];
  const isArabicSearch =
    search.searchName.charCodeAt(0) >= 1536 &&
    search.searchName.charCodeAt(0) <= 1791;

  return (
    <motion.div
      dir={isArabicSearch ? "rtl" : "ltr"}
      className="min-h-screen text-gray-800"
      style={{ backgroundColor: "#f0f8ff" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto p-6 md:p-10">
        <div className="text-center mb-8">
          <h1
            className={`text-4xl md:text-5xl font-extrabold text-gray-800 mb-2 relative inline-block ${
              isArabicSearch ? "text-right" : "text-left"
            }`}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
              تفاصيل البحث
            </span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full -z-10"></div>
          </h1>
          <p
            className={`w-full md:w-8/12 mx-auto text-gray-600 leading-relaxed md:text-lg mt-4 ${
              isArabicSearch ? "text-right" : "text-left"
            }`}
          >
            <span className="font-medium tracking-wide">
              استعرض تفاصيل عملية البحث التي قمت بها واستكشف النتائج التي تم
              العثور عليها.
            </span>
          </p>
        </div>
        <motion.button
          onClick={() => navigate("/searches")}
          className="flex items-center mb-6 text-gray-700 hover:text-gray-900 transition-colors duration-200 group focus:outline-none"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <ArrowLeft className="size-5 group-hover:mr-1 transition-all duration-200" />
          <span className="mr-2">عودة إلى قائمة عمليات البحث</span>
        </motion.button>
        <motion.div
          className="p-6 rounded-lg shadow-md bg-white border border-gray-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2
            className={`text-3xl font-semibold text-gray-800 mb-4 relative pb-1 before:absolute before:bottom-0 ${
              isArabicSearch ? "before:right-0" : "before:left-0"
            } before:w-40 before:h-[2px] before:bg-blue-500 inline-block`}
          >
            معلومات البحث
          </h2>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium text-lg">
                  اسم البحث:
                </span>
                <span className="text-gray-800 text-lg font-semibold">
                  {search.searchName}
                </span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <span className="text-gray-700 font-medium flex items-center gap-1">
                  <CalendarClock className="size-4" /> تاريخ الإنشاء:
                </span>
                <span className="text-gray-600">
                  {formatDate(search?.createdAt)}
                </span>
              </div>
            </div>
            <div className="flex items-center mb-3 gap-2 flex-wrap">
              <span className="text-gray-700 font-medium flex items-center gap-1 text-lg">
                <List className="size-4" /> مصطلحات البحث:
              </span>
              <div className="flex flex-wrap mt-2">
                {terms?.map((term, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full mr-2 mb-2 text-sm inline-flex items-center justify-center whitespace-nowrap"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="p-6 rounded-lg  bg-white  border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2
            className={`text-3xl font-semibold text-gray-800 mb-4 relative pb-1 before:absolute before:bottom-0 ${
              isArabicSearch ? "before:right-0" : "before:left-0"
            } before:w-1/5 before:h-[2px] before:bg-blue-500 inline-block`}
          >
            نتائج البحث
          </h2>
          {search.results && search.results.length > 0 ? (
            <div>
              {search.results.map((result, index) => (
                <SearchResultItem key={index} terms={terms} result={result} />
              ))}
            </div>
          ) : (
            <div className="p-5 rounded-lg bg-gray-100 text-center">
              <p className="text-gray-700 text-lg">لم يتم العثور على نتائج.</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SearchDetails;
