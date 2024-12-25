import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2Icon } from "lucide-react";
import { Lock, User, Eye, EyeOff } from "lucide-react";

// أيقونة التحقق
const Icon = () => (
  <CheckCircle2Icon
    strokeWidth={2.5}
    className="h-6 w-6"
    style={{ color: "#2ec946" }}
  />
);

// أيقونة الدائرة
const CircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

// مكون حقل الإدخال مع الأيقونة
const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  icon,
  showPasswordToggle,
  showPassword,
  onTogglePassword,
}) => (
  <div className="flex flex-col justify-start items-end relative">
    <motion.label
      htmlFor={id}
      className="block text-sm md:text-base mb-1 font-medium text-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {label}
    </motion.label>
    <div className="relative w-full max-w-md">
      <motion.input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="mt-1 block w-full py-2 px-3 pr-10 rounded-md bg-gray-50 border border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <div className="absolute inset-y-0 right-2 flex items-center">
        {showPasswordToggle ? (
          <button
            type="button"
            onClick={onTogglePassword}
            className="text-gray-500 focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        ) : (
          <div className="pointer-events-none text-gray-500">{icon}</div>
        )}
      </div>
    </div>
  </div>
);

// مكون زر تسجيل الدخول
const AuthButton = ({ type, onClick, children, icon, google }) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`w-full max-w-md justify-center items-center text-center p-2.5 rounded-lg  transition hover:scale-105 duration-75 font-bold flex gap-3  ${
        google
          ? "bg-gray-50 border-[1px] border-blue-500 text-gray-800 hover:bg-gradient-to-t from-red-100 to-green-100 hover:scale-105 duration-75 rounded-xl"
          : "bg-blue-700 text-white hover:bg-blue-500"
      }`}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0 }}
    >
      {icon}
      {children}
    </motion.button>
  );
};

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setMessage(data.message);
      if (data.token || data.userData) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify(data.userData));
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <motion.div
      className="m-6 md:m-10 lg:m-14 mx-auto flex items-center justify-center min-h-screen bg-gray-50 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Shapes */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div
          className="absolute top-1/4 left-1/4 w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-sky-300 rounded-full  blur-xl animate-pulse"
          style={{ transform: "translate(-50%, -50%)" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/5 w-[120px] h-[120px] md:w-[150px] md:h-[150px] bg-rose-300 rounded-full  blur-xl animate-pulse"
          style={{ transform: "translate(-50%, -50%)" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-[140px] h-[140px] md:w-[180px] md:h-[180px] bg-amber-300 rounded-full  blur-xl animate-pulse"
          style={{ transform: "translate(-50%, -50%)" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[120px] h-[120px] md:w-[150px] md:h-[150px] bg-emerald-300 rounded-full  blur-xl animate-pulse"
          style={{ transform: "translate(-50%, -50%)" }}
        ></div>
        <div
          className="absolute top-1/5 right-1/3 w-[100px] h-[100px] md:w-[120px] md:h-[120px] bg-indigo-300 rounded-full  blur-xl animate-pulse"
          style={{ transform: "translate(-50%, -50%)" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/5 w-[140px] h-[140px] md:w-[170px] md:h-[170px] bg-orange-300 rounded-full blur-xl animate-pulse"
          style={{ transform: "translate(-50%, -50%)" }}
        ></div>
      </motion.div>

      {/* Container for Content and Form */}
      <div
        className="max-w-md z-10 mx-auto w-full  justify-center items-center border-gray-200 border-[1px] bg-white shadow-md hover:scale-102 transition-all duration-300 p-6 md:p-8 rounded-2xl"
        dir="rtl"
      >
        {/* Form Section - Right Side */}
        <div className="w-full">
          <motion.h2
            className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 text-center text-blue-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            تسجيل الدخول
          </motion.h2>
          <form onSubmit={handleSubmit} className="space-y-4" dir="ltr">
            {/* Email Field */}
            <InputField
              id="username"
              label="البريد الإلكتروني"
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              icon={<User size={20} />}
            />
            {/* Password Field */}
            <InputField
              id="password"
              label="كلمة المرور"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={togglePasswordVisibility}
            />
            <motion.p
              className="text-sm text-gray-600 mt-2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              ليس لديك حساب؟{" "}
              <Link
                to="/signup"
                className="text-blue-500 font-bold hover:underline"
              >
                إنشاء حساب
              </Link>
            </motion.p>
            <div className="flex flex-col gap-2 justify-center items-center mt-2">
              <AuthButton type="submit" icon={<Lock size={20} />}>
                تسجيل الدخول
              </AuthButton>
              <h1>أو</h1>
              <AuthButton
                type="button"
                onClick={handleGoogleLogin}
                icon={
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                    alt="Google Logo"
                    className="w-5 h-5"
                  />
                }
                google
              >
                تسجيل الدخول بواسطة جوجل
              </AuthButton>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
