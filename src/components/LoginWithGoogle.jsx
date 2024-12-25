import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginWithGoogle = () => {
  const history = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const userDataString = urlParams.get("userData");

    try {
      const userData = userDataString ? JSON.parse(userDataString) : null;
      if (token && userData) {
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));
        history("/profile");
      } else {
        history("/login");
      }
    } catch (error) {
      console.error("Error during processing user data:", error);
      history("/login");
    }
  }, [history]);

  return <div>جاري التحقق</div>;
};

export default LoginWithGoogle;
