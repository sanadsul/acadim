import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, FileType2, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import {
  faSearch,
  faFileAlt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

function No() {
  const [searchName, setSearchName] = useState("");
  const [searchTerms, setSearchTerms] = useState([""]);
  const [searchTermsUsed, setSearchTermsUsed] = useState([]);
  const [pdfFiles, setPdfFiles] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleSearchTermsChange = (e, index) => {
    const newTerms = [...searchTerms];
    newTerms[index] = e.target.value;
    setSearchTerms(newTerms);
  };

  const handleAddSearchTerm = () => {
    setSearchTerms([...searchTerms, ""]);
  };

  const handleRemoveSearchTerm = (index) => {
    if (searchTerms.length > 1) {
      const newTerms = [...searchTerms];
      newTerms.splice(index, 1);
      setSearchTerms(newTerms);
    }
  };

  const handleFileChange = (e) => {
    setPdfFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    setSearchTermsUsed(searchTerms);

    const formData = new FormData();
    formData.append("searchName", searchName);
    const joinedSearchTerms = searchTerms
      .filter((term) => term.trim() !== "")
      .join(",");
    formData.append("searchTerms", joinedSearchTerms);

    if (pdfFiles) {
      for (let i = 0; i < pdfFiles.length; i++) {
        formData.append("pdfFiles", pdfFiles[i]);
      }
    }
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/search",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("تم استخراج البحث بنجاح!");
      setTimeout(() => navigate("/searches"), 2000);

      let parsedResults;
      try {
        parsedResults = JSON.parse(response.data[0].summary);
      } catch (e) {
        parsedResults = response.data;
      }
      if (Array.isArray(parsedResults)) {
        setResults(
          parsedResults.map((item) => ({
            title: item.العنوان,
            summary: item.summary,
            page: item["رقم الصفحة"] || "not found",
          }))
        );
      } else {
        setResults([
          {
            title: searchTerms,
            summary: response.data?.summary,
            page: response.data?.page || "not found",
            fileName: response.data?.fileName || "not found",
          },
        ]);
      }
    } catch (err) {
      if (err?.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("حدث خطأ أثناء البحث.");
      }
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 6px 15px rgba(0, 123, 255, 0.4)" },
    tap: { scale: 0.98 },
  };

  const errorVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      dir="rtl"
      className="min-h-screen flex flex-col bg-gray-100 text-gray-800"
      style={{ backgroundColor: "#f0f8ff" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ToastContainer position="top-center" />
      <div className="container mx-auto p-6 md:p-10">
        <div className="flex justify-between items-center mb-8 md:mb-8">
          <div className="text-center items-center justify-center flex ">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
                مستكشف الأبحاث
              </span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full -z-10"></div>
            </h1>
            <p className="w-full md:w-10/12 mx-auto text-gray-600 leading-relaxed md:text-lg mt-2 md:mt-4">
              <span className="font-medium tracking-wide">
                أدخل مصطلحات البحث وقم بتحميل ملفات PDF لتحليلها واستخراج
                المعلومات المطلوبة.
              </span>
            </p>
          </div>
          <div className="flex space-x-2 md:space-x-4 s">
            <Link
              to="/searches"
              className={`px-4 py-2  md:px-6 md:py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium hover:bg-gradient-to-l transition duration-300 shadow-md hover:scale-105 flex items-center ${
                location.pathname === "/searches"
                  ? "opacity-70 cursor-default pointer-events-none"
                  : ""
              }`}
            >
              <FontAwesomeIcon icon={faFileAlt} className="mr-2 ml-2" />
              <span className="text-sm md:text-base">سجل الأبحاث</span>
            </Link>
          </div>
        </div>
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-3xl p-6 md:p-10 space-y-6 md:space-y-8 relative overflow-hidden"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative z-10">
            <label
              htmlFor="searchName"
              className="block text-base md:text-lg font-medium text-gray-700 mb-2"
            >
              اسم البحث:
            </label>
            <div className="relative">
              <input
                type="text"
                id="searchName"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base md:text-lg px-4 py-3 md:py-4 pr-12 text-gray-800"
                value={searchName}
                onChange={handleSearchNameChange}
                placeholder="أدخل اسم البحث"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="h-5 w-5 md:h-6 md:w-6 text-gray-400"
                />
              </div>
            </div>
          </div>
          <div className="relative z-10">
            <label
              htmlFor="searchTerms"
              className="block text-base md:text-lg font-medium text-gray-700 mb-2"
            >
              عناوين البحث:
            </label>
            {searchTerms.map((term, index) => (
              <div key={index} className="flex items-center mb-2 relative">
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base md:text-lg px-4 py-3 md:py-4 pr-12 text-gray-800"
                  value={term}
                  onChange={(e) => handleSearchTermsChange(e, index)}
                  placeholder={`عنوان البحث ${index + 1}`}
                />
                {searchTerms.length > 1 && (
                  <button
                    type="button"
                    className="absolute inset-y-0 left-0 flex items-center pl-3 focus:outline-none"
                    onClick={() => handleRemoveSearchTerm(index)}
                  >
                    <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
                  </button>
                )}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search className="h-5 w-5 md:h-6 md:w-6 text-gray-400" />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSearchTerm}
              className="mt-2 text-blue-500 hover:text-blue-700 font-medium transition duration-200 flex items-center"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              إضافة عنوان آخر
            </button>
          </div>
          <div className="relative z-10">
            <label
              htmlFor="pdfFiles"
              className="block text-base md:text-lg font-medium text-gray-700 mb-2"
            >
              ملفات PDF:
            </label>
            <div className="relative">
              <input
                type="file"
                id="pdfFiles"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base md:text-lg text-gray-800"
                onChange={handleFileChange}
                multiple
                accept=".pdf"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FileType2 className="h-5 w-5 md:h-6 md:w-6 text-gray-400" />
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              اختر ملف PDF أو عدة ملفات
            </p>
          </div>
          <motion.div className="relative z-10">
            <motion.button
              type="submit"
              disabled={loading}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="inline-flex items-center px-6 py-2 md:px-8 md:py-3 border border-transparent text-base md:text-lg font-medium rounded-3xl shadow-sm text-white bg-gradient-to-r from-blue-500 to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 animate-spin h-5 w-5 md:h-6 md:w-6" />
                  جار استخراج...
                </div>
              ) : (
                "استخراج النتائج"
              )}
            </motion.button>
          </motion.div>
          <AnimatePresence>
            {error && (
              <motion.p
                className="text-red-500 text-base mt-3"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </motion.div>
  );
}

export default No;
