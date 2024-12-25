import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Pub from "./components/Pub";
import { Navbar2 } from "./components/Navbar2";
import AppWrapper from "./components/language/AppWrapper";
import ArticleView from "./components/ArticleView";
import ChatPage from "./components/Chatpage";
import No from "./components/No";
import SearchesList from "./components/ReSearch";
import SearchDetails from "./components/SearchDetails";
import LoginWithGoogle from "./components/LoginWithGoogle";

// const location = useLocation(); // استخدم useLocation للحصول على المسار الحالي

function App() {
  return (
    <AppWrapper>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50">
          <div className=" " dir="">
            <Navbar2 />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/*" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/loginwithgoogle"
                element={<LoginWithGoogle />}
              />{" "}
              {/* إضافة مسار لصفحة LoginWithGoogle */}
              <Route path="/pub" element={<Pub />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/searches" element={<SearchesList />} />
              <Route path="/searches/:id" element={<SearchDetails />} />
              <Route path="/search" element={<No />} />
            </Routes>
          </div>
        </div>
        <Footer />
        {/* {location.pathname !== "/account" && <Footer />} */}
      </Router>
    </AppWrapper>
  );
}

export default App;
