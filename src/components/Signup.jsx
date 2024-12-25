import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { User, Eye, EyeOff } from "lucide-react";

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
    <div className="relative w-full">
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
const AuthButton = ({ type, onClick, children }) => (
  <motion.button
    type={type}
    onClick={onClick}
    className="w-full justify-center items-center text-center bg-blue-700 text-white p-2.5 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-500 mt-4 transition hover:scale-102 duration-300 font-bold"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0 }}
  >
    {children}
  </motion.button>
);

const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [username, setusername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmpassword) {
        return toast.error("كلمة المرور غير متطابقة");
      }
      const response = await fetch("http://localhost:5005/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();
      if (response.status === 400) {
        return toast.error(data.message);
      }
      toast.success(data.message);
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("خطأ في الاتصال بالشبكة");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        className="max-w-md z-10 mx-auto w-full flex justify-center items-center border-gray-200 border-[1px] bg-white shadow-xl hover:scale-102 transition-all duration-300 p-6 md:p-8 rounded-2xl"
        dir="rtl"
      >
        {/* Form Section */}
        <div className="w-full">
          <motion.h2
            className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 text-center text-blue-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            إنشاء حساب
          </motion.h2>
          <form onSubmit={handleSubmit} className="space-y-4" dir="ltr">
            <InputField
              id="email"
              label="البريد الإلكتروني"
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              icon={<User size={20} />}
            />
            <InputField
              id="username"
              label="اسم المستخدم"
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
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
            <InputField
              id="confirmpassword"
              label="تأكيد كلمة المرور"
              type={showPassword ? "text" : "password"}
              value={confirmpassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
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
              لديك حساب؟{" "}
              <Link
                to="/login"
                className="text-blue-500 font-bold hover:underline"
              >
                تسجيل الدخول
              </Link>
            </motion.p>
            <AuthButton type="submit">إنشاء الحساب</AuthButton>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
