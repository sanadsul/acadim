import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2Icon } from "lucide-react";

const Icon = () => (
  <CheckCircle2Icon
    strokeWidth={2.5}
    className="h-6 w-6"
    style={{ color: "#2ec946" }}
  />
);

const InputField = ({ id, label, type, value, onChange }) => (
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
    </div>
  </div>
);

const AuthButton = ({ type, onClick, children }) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`w-full max-w-md justify-center items-center text-center p-2.5 rounded-lg  transition hover:scale-105 duration-75 font-bold flex gap-3  bg-blue-700 text-white hover:bg-blue-500`}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0 }}
    >
      {children}
    </motion.button>
  );
};

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (!storedUserData) {
      navigate("/login");
    }
    try {
      const userData = JSON.parse(storedUserData);
      setUserData(userData);
      setUsername(userData.username);
    } catch (e) {
      console.log("Error parsing userData", e);
      navigate("/login");
    }
  }, [navigate]);

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...userData, username: data.username })
        );
        setUserData({ ...userData, username: data.username });
      } else {
        console.log("Error updating profile", data);
      }
    } catch (e) {
      console.error("Error updating profile", e);
    }
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  if (!userData) {
    return <div>جاري التحميل...</div>;
  }

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

      {/* Container for Profile Form */}
      <div
        className="max-w-md z-10 mx-auto w-full  justify-center items-center border-gray-200 border-[1px] bg-white shadow-md hover:scale-102 transition-all duration-300 p-6 md:p-8 rounded-2xl"
        dir="rtl"
      >
        <motion.h2
          className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 text-center text-blue-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          الملف الشخصي
        </motion.h2>

        <div className="flex items-center mb-6">
          <motion.img
            src={userData.profileImage}
            alt="صورة المستخدم"
            className="w-20 h-20 rounded-full mr-6 shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <div>
            <motion.p
              className="text-lg font-semibold text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {userData.username}
            </motion.p>
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {userData.email}
            </motion.p>
          </div>
        </div>
        <div className="space-y-4" dir="ltr">
          <InputField
            id="username"
            label="الاسم"
            type="text"
            value={username}
            onChange={handleChange}
          />
          <AuthButton type="button" onClick={handleUpdateProfile}>
            تعديل
          </AuthButton>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
