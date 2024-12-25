import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Divide as Hamburger } from "hamburger-react";
import {
  AcademicCapIcon,
  HomeIcon,
  SearchCircleIcon,
} from "@heroicons/react/solid";
import { Book, User2, UserPlus2, UsersRound } from "lucide-react";
import { motion } from "framer-motion";
import { faUserCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LanguageDropdown from "../components/language/LanguageDropdown"; // استيراد LanguageDropdown من language/LanguageDropdown.jsx
import { useLanguage, getText } from "../components/language/Language"; // استيراد useLanguage و getText من language/language.js

const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    className="flex items-center font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 px-4 rounded-lg"
    onClick={onClick}
  >
    {children}
  </Link>
);

const MobileMenu = ({ isOpen, setOpen, isLoggedIn, handleLogout }) => {
  const { language } = useLanguage();
  const handleLinkClick = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={`md:hidden absolute top-16 left-0 right-0 z-40 bg-white shadow-md rounded-b-2xl border-t border-gray-200 transition-all duration-300 ${
        isOpen ? "block" : "hidden"
      }`}
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col mt-2">
          <NavLink to="/search" onClick={handleLinkClick}>
            <HomeIcon className="w-5 h-5 ml-2 text-gray-500" />
            {getText("summarize_articles", language)}
          </NavLink>
          <NavLink to="/pub" onClick={handleLinkClick}>
            <SearchCircleIcon className="w-5 h-5 ml-2 text-gray-500" />
            {getText("search_articles", language)}
          </NavLink>
          <NavLink to="/create-course" onClick={handleLinkClick}>
            <Book className="w-5 h-5 ml-2 text-gray-500" />
            {getText("writing_assistant", language)}
          </NavLink>
          <NavLink to="/sea" onClick={handleLinkClick}>
            <AcademicCapIcon className="w-5 h-5 ml-2 text-gray-500" />
            {getText("learning_assistant", language)}
          </NavLink>
          <NavLink to="/my-courses" onClick={handleLinkClick}>
            <UsersRound className="w-5 h-5 ml-2 text-gray-500" />
            {getText("instant_translation", language)}
          </NavLink>
        </div>
        {isLoggedIn ? (
          <div className="flex flex-col mt-4 items-center justify-center">
            <button
              onClick={() => {
                handleLogout();
                handleLinkClick();
              }}
              className="flex items-center font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 px-4 rounded-lg"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 ml-2" />
              {getText("logout", language)}
            </button>
            <button
              onClick={() => {
                navigate("/dashboard");
                handleLinkClick();
              }}
              className="flex items-center font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 px-4 rounded-lg"
            >
              <FontAwesomeIcon icon={faUserCog} className="w-5 h-5 ml-2" />
              {getText("dashboard", language)}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center mt-4">
            <NavLink to="/login" onClick={handleLinkClick}>
              <User2 className="w-[20px]  mr-2 " />
              {getText("login", language)}
            </NavLink>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Navbar2 = () => {
  const [isOpen, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { language } = useLanguage();
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    const storeduser = localStorage.getItem("userData");
    const userData = JSON.parse(storeduser);
    setUserdata(userData);
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUsername(decodedToken.username || getText("user", language));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [language]);
  const handleLogout = () => {
    localStorage.clear();

    setIsLoggedIn(false);
    navigate("/login");
  };

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
    <nav className="bg-white text-base shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Hamburger Menu */}
          <div className="md:hidden">
            <Hamburger
              color="#3b82f6"
              size={24}
              duration={0.4}
              toggled={isOpen}
              toggle={setOpen}
            />
          </div>

          {/* Mobile Logo (Centered) */}
          <Link
            to="/"
            className="md:hidden flex items-center text-2xl font-bold text-gray-800 ml-auto"
            onClick={() => setOpen(false)}
          >
            <span className="text-2xl  font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 ml-2">
              {getText("digital", language)}
            </span>
            <span className="text-2xl ml-1 font-bold text-gray-800">
              {getText("academic", language)}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex w-full items-center justify-between flex-row-reverse">
            {/* Desktop Logo (Right) */}
            <Link
              to="/"
              className="flex items-center  text-2xl font-bold text-gray-800"
              onClick={() => setOpen(false)}
            >
              <span className="text-2xl  font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 ml-2">
                <span className="text-2xl ml-1 font-bold text-gray-800">
                  {getText("academic", language)}
                </span>
                {getText("digital", language)}
              </span>
            </Link>

            {/* Main Navigation Links (Right) */}
            <div className="flex space-x-4 ml-6">
              {isLoggedIn && (
                <>
                  <NavLink to="/search" onClick={() => setOpen(false)}>
                    {getText("summarize_articles", language)}
                  </NavLink>
                  <NavLink to="/pub" onClick={() => setOpen(false)}>
                    {getText("search_articles", language)}
                  </NavLink>
                </>
              )}
              <NavLink to="/create-course" onClick={() => setOpen(false)}>
                {getText("writing_assistant", language)}
              </NavLink>
              <NavLink to="/sea" onClick={() => setOpen(false)}>
                {getText("learning_assistant", language)}
              </NavLink>
              <NavLink to="/my-courses" onClick={() => setOpen(false)}>
                {getText("instant_translation", language)}
              </NavLink>
            </div>

            {/* Auth Buttons (Left) */}
            <div className="flex space-x-4">
              {/* Language Dropdown */}
              <LanguageDropdown />
              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center text-gray-700 font-semibold  focus:outline-none hover:text-blue-600 transition duration-300 py-2 px-4 rounded-lg"
                  >
                    <img
                      src={
                        userdata?.profileImage ||
                        ` https://cdn-icons-png.flaticon.com/512/149/149071.png`
                      }
                      alt="avatar"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    {username}
                  </button>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full mt-2 right-0 bg-white shadow-md rounded-md w-48 z-50 border border-gray-200 ${
                      isDropdownOpen ? "block" : "hidden"
                    }`}
                    dir="rtl"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-300 flex items-center"
                    >
                      <FontAwesomeIcon
                        icon={faUserCog}
                        className="w-4 h-4 ml-2"
                      />
                      {getText("dashboard", language)}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-300 flex items-center"
                    >
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="w-4 h-4 ml-2"
                      />
                      {getText("logout", language)}
                    </button>
                  </motion.div>
                </div>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="flex items-center font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300 py-2 px-4 rounded-lg"
                  >
                    <UserPlus2 className="w-5 h-5 mr-2" />
                    {getText("signup", language)}
                  </Link>
                  <NavLink to="/login">
                    <User2 className="w-5 h-5 mr-2 text-gray-500" />
                    {getText("login", language)}
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        setOpen={setOpen}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
    </nav>
  );
};

export { Navbar2 };
