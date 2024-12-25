import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage, getText } from "./Language"; // استيراد useLanguage و getText من language.js

const LanguageDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { language, changeLanguage } = useLanguage();

  const handleDropdownClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDropdownClick);
    return () => {
      document.removeEventListener("mousedown", handleDropdownClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center text-gray-700 font-semibold  focus:outline-none hover:text-blue-600 transition duration-300 py-2 px-4 rounded-lg"
      >
        {language === "ar" ? "العربية" : "English"}
      </button>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={`absolute top-full mt-2 right-0 bg-white shadow-md rounded-md w-32 z-50 border border-gray-200 ${
          isDropdownOpen ? "block" : "hidden"
        }`}
        dir="rtl"
      >
        <button
          onClick={() => {
            changeLanguage("ar");
            setIsDropdownOpen(false);
          }}
          className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-300 w-full text-right`}
        >
          {getText("ar", language)}
        </button>
        <button
          onClick={() => {
            changeLanguage("en");
            setIsDropdownOpen(false);
          }}
          className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-300 w-full text-right`}
        >
          {getText("en", language)}
        </button>
      </motion.div>
    </div>
  );
};

export default LanguageDropdown;
