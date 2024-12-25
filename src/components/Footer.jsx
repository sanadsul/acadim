import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa"; // استيراد الأيقونات

const Footer = () => {
  return (
    <footer
      dir="rtl"
      className="bg-gray-900/95 text-gray-300 py-7 mt-5 shadow-inner"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-20 flex flex-col md:flex-row justify-between items-start">
        {/* القسم الأول: معلومات الشركة والشعار */}
        <div className="mb-10 md:mb-0 md:w-1/3">
          <h4 className="text-3xl font-bold mb-5 text-white">
            <span className="text-blue-500">الأكاديمية</span> الرقمية
          </h4>
          <p className="text-gray-400 leading-relaxed text-lg">
            منصة متكاملة لدعم الباحثين والعلماء. نوفر لك الأدوات والموارد
            اللازمة لنجاح رحلتك البحثية.
          </p>
        </div>

        {/* القسم الثاني: روابط سريعة */}
        <div className="mb-10 md:mb-0 md:w-1/4">
          <h5 className="text-xl font-semibold mb-5 text-gray-200">
            روابط سريعة
          </h5>
          <ul className="text-gray-400">
            <li className="mb-3">
              <Link
                to="/"
                className="hover:text-blue-400 transition-colors duration-300 block text-lg"
              >
                الرئيسية
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/pub"
                className="hover:text-blue-400 transition-colors duration-300 block text-lg"
              >
                البحث عن المقالات
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/about"
                className="hover:text-blue-400 transition-colors duration-300 block text-lg"
              >
                من نحن
              </Link>
            </li>
          </ul>
        </div>

        {/* القسم الثالث: تواصل معنا */}
        <div className="md:w-1/4">
          <h5 className="text-xl font-semibold mb-5 text-gray-200">
            تواصل معنا
          </h5>
          <ul className="text-gray-400">
            <li className="mb-3">
              <a
                href="mailto:info@academiya.com"
                className="hover:text-blue-400 transition-colors duration-300 block text-lg"
              >
                info@academiya.com
              </a>
            </li>
            <li className="text-lg">+1 123-456-7890</li>
          </ul>
          <div className="mt-6 flex gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              aria-label="Facebook"
            >
              <FaFacebookF className="text-2xl" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              aria-label="Twitter"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-2 text-gray-500 border-t border-gray-700 pt-2">
        <p className="text-lg">
          © {new Date().getFullYear()} الأكاديمية الرقمية. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
