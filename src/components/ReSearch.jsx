import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { List, Search, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchListItem = ({ search, formatDate }) => (
  <motion.tr
    key={search._id}
    className="hover:bg-gray-50 transition-colors "
    // whileHover={{ backgroundColor: "#f0f9ff" }}
  >
    <td className="px-6 py-4  text-right text-gray-800">{search.searchName}</td>
    <td className="px-6 py-4   text-right text-gray-600 flex items-center gap-1">
      <Clock className="size-3 inline-block text-gray-500" />
      {formatDate(search.createdAt)}
    </td>
    <td className="px-6 py-4   text-right text-gray-600">
      {search?.searchTerms?.length > 0
        ? Array.isArray(search.searchTerms) && search.searchTerms.length > 0
          ? search.searchTerms[0].split(",").length // تقسيم أول عنصر في المصفوفة
          : "بدون بيانات"
        : "بدون"}
    </td>
    <td className="px-6 py-4   text-right text-gray-600">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full hover:bg-gradient-to-l transition duration-300 font-medium flex items-center"
      >
        <Link
          to={`/searches/${search._id}`}
          className="flex items-center"
          style={{ display: "flex", alignItems: "center" }}
        >
          عرض
          <Search className="size-4 mr-1" />
        </Link>
      </motion.button>
    </td>
  </motion.tr>
);

const SearchesList = () => {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const fetchSearches = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token"); // Use token if needed
      const response = await axios.get("http://localhost:3000/searches", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSearches(response.data);
    } catch (err) {
      console.error("Error fetching searches:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("حدث خطأ أثناء جلب عمليات البحث.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSearches();
  }, [fetchSearches]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
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
              عمليات البحث السابقة
            </span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full -z-10"></div>
          </h1>
          <p className="w-full md:w-8/12 mx-auto text-gray-600 leading-relaxed md:text-lg mt-4">
            <span className="font-medium tracking-wide">
              استعرض عمليات البحث السابقة التي قمت بها. يمكنك عرض نتائج كل عملية
              والرجوع إليها في أي وقت.
            </span>
          </p>
        </div>

        <motion.div
          className=" bg-white rounded-2xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {error && <p className="text-red-500 mb-4 p-4">{error}</p>}
          {loading ? (
            <div className="flex justify-center items-center p-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : searches.length === 0 ? (
            <p className="text-gray-700 text-center p-10">
              لا توجد عمليات بحث سابقة.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      اسم البحث
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      تاريخ الإنشاء
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      عدد المصطلحات
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      عرض النتائج
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searches.map((search) => (
                    <SearchListItem
                      key={search._id}
                      search={search}
                      formatDate={formatDate}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SearchesList;
