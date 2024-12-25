import React, { useState } from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { Avatar } from "@mui/material";
import {
  BookCheck,
  ScanSearchIcon,
  Notebook,
  BookKey,
  Star,
  StarHalf,
  ArrowRight,
  BookA,
} from "lucide-react";
import { useLanguage, getText } from "./language/Language"; // استيراد useLanguage و getText

const Home = () => {
  const { language } = useLanguage(); // استخدام useLanguage
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="text-yellow-500 inline-block"
          size={20}
        />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="text-yellow-500 inline-block"
          size={20}
        />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="text-gray-300 inline-block"
          size={20}
        />
      );
    }
    return stars;
  };

  const avatarStyle = {
    width: 40,
    height: 40,
    marginRight: 10,
  };

  return (
    <div
      className="bg-gradient-to-br from-gray-100 to-gray-50 relative"
      dir="rtl"
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
      <div className="relative z-10">
        {/* Hero Section */}
        <section
          className="flex flex-col md:flex-row justify-between items-center p-6 mt-10 md:p-12 lg:p-20"
          style={{ fontFamily: "sans-serif" }}
        >
          {/* Text Section */}
          <div className="w-full md:w-1/2">
            <motion.h1
              className="font-bold text-gray-800 text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 transition-all duration-300 relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative z-10 bg-blue-100 rounded-lg px-4 py-2 inline-block shadow-md">
                {getText("hero_title", language)}
                <span className="absolute top-0 left-0 w-full h-full bg-blue-100 opacity-25 rounded-lg -z-10"></span>
              </span>
            </motion.h1>
            <motion.p
              className="text-gray-700 text-base md:text-lg lg:text-xl transition-all duration-300 mt-4 leading-relaxed mb-6 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typewriter
                options={{
                  strings: [
                    getText("hero_description_1", language),
                    getText("hero_description_2", language),
                    getText("hero_description_3", language),
                  ],
                  autoStart: true,
                  pauseFor: 5000,
                  cursor: "🔵",
                  loop: true,
                  delay: 13,
                  startDelay: 50000,
                  deleteSpeed: 2,
                }}
              />
              <style>
                {`
                                .Typewriter__cursor {
                                color: #007bff;
                                font-size: 1rem;
                                }
                                `}
              </style>
            </motion.p>
            <motion.button
              className="mt-2 text-base md:text-lg lg:text-xl bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 px-8 md:px-10 py-2 md:py-2.5 shadow-md font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to="/pub">
                {" "}
                {getText("search_articles_button", language)}
              </Link>
            </motion.button>
          </div>
          {/* Image Section */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Image placeholder */}
            {/* <img
                            src="/hero.svg"
                            alt="Hero Image"
                            className="w-full md:max-w-[80%] max-h-[400px]"
                        /> */}
          </motion.div>
        </section>

        {/* Services Section */}
        <motion.section
          className="mt-20 py-16 bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              {getText("services_section_title", language)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ServiceCard
                icon={<BookCheck className="text-blue-600 size-14" />}
                title={getText("service_1_title", language)}
                description={getText("service_1_description", language)}
              />
              <ServiceCard
                icon={<ScanSearchIcon className="text-blue-600 size-14" />}
                title={getText("service_2_title", language)}
                description={getText("service_2_description", language)}
              />
              <ServiceCard
                icon={<Notebook className="text-blue-600 size-14" />}
                title={getText("service_3_title", language)}
                description={getText("service_3_description", language)}
              />
              <ServiceCard
                icon={<BookKey className="text-blue-600 size-14" />}
                title={getText("service_4_title", language)}
                description={getText("service_4_description", language)}
              />
            </div>
          </div>
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section
          className="mt-20 py-16 bg-gradient-to-br from-sky-50 to-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              {getText("why_choose_us_section_title", language)}
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-start gap-8">
              <FeatureCard
                icon={<ScanSearchIcon className="text-blue-600 size-14" />}
                title={getText("feature_1_title", language)}
                description={getText("feature_1_description", language)}
              />
              <FeatureCard
                icon={<Notebook className="text-blue-600 size-14" />}
                title={getText("feature_2_title", language)}
                description={getText("feature_2_description", language)}
              />
              <FeatureCard
                icon={<BookA className="text-blue-600 size-14" />}
                title={getText("feature_3_title", language)}
                description={getText("feature_3_description", language)}
              />
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          className="mt-20 py-16 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              {getText("testimonials_section_title", language)}
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <TestimonialCard
                rating={4.5}
                text={getText("testimonial_1_text", language)}
                name={getText("testimonial_1_name", language)}
                avatarSrc="https://randomuser.me/api/portraits/men/22.jpg"
                avatarStyle={avatarStyle}
                renderStars={renderStars}
              />
              <TestimonialCard
                rating={4.5}
                text={getText("testimonial_2_text", language)}
                name={getText("testimonial_2_name", language)}
                avatarSrc="https://randomuser.me/api/portraits/men/22.jpg"
                avatarStyle={avatarStyle}
                renderStars={renderStars}
              />
              <TestimonialCard
                rating={5}
                text={getText("testimonial_3_text", language)}
                name={getText("testimonial_3_name", language)}
                avatarSrc="https://randomuser.me/api/portraits/women/44.jpg"
                avatarStyle={avatarStyle}
                renderStars={renderStars}
              />
            </div>
          </div>
        </motion.section>

        {/* Contact Us Section */}
        <motion.section
          className="mt-20 py-16 bg-blue-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              {getText("contact_us_section_title", language)}
            </h2>
            <p className="text-gray-700 text-lg mb-8">
              {getText("contact_us_description", language)}
            </p>
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder={getText("name_placeholder", language)}
                  className="border-gray-300 rounded-full px-6 py-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder={getText("email_placeholder", language)}
                  className="border-gray-300 rounded-full px-6 py-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder={getText("message_placeholder", language)}
                  className="border-gray-300 rounded-2xl px-6 py-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
                <motion.button
                  type="submit"
                  className="bg-blue-600 text-white px-12 py-3 rounded-full hover:bg-blue-700 transition duration-300 text-xl font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {getText("send_message_button", language)}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          className="mt-20 py-16 bg-gradient-to-br from-gray-100 to-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              {getText("newsletter_section_title", language)}
            </h2>
            <p className="text-gray-700 text-lg mb-8">
              {getText("newsletter_description", language)}
            </p>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder={getText("email_input_placeholder", language)}
                className="border-gray-300 rounded-l-full px-6 py-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500 md:w-1/3"
              />
              <motion.button
                className="bg-blue-600 text-white px-8 py-3 rounded-r-full hover:bg-blue-700 transition duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                {getText("subscribe_button", language)}
              </motion.button>
            </div>
          </div>
        </motion.section>
        {/* Partners Section */}
        <motion.section
          className="mt-20 py-16 bg-blue-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              {getText("partners_section_title", language)}
            </h2>
            <p className="text-gray-700 text-lg mb-8">
              {getText("partners_description", language)}
            </p>
            <div className="flex flex-wrap justify-center gap-12">
              <PartnerLogo
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"
                alt={getText("google_logo", language)}
                name={getText("google_name", language)}
              />
              <PartnerLogo
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
                alt={getText("amazon_logo", language)}
                name={getText("amazon_name", language)}
              />
              <PartnerLogo
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Microsoft_logo.svg/2560px-Microsoft_logo.svg.png"
                alt={getText("microsoft_logo", language)}
                name={getText("microsoft_name", language)}
              />
              <PartnerLogo
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/IBM_logo.svg/2560px-IBM_logo.svg.png"
                alt={getText("ibm_logo", language)}
                name={getText("ibm_name", language)}
              />
            </div>
          </div>
        </motion.section>

        {/* Discover More Section */}
        <motion.section
          className="mt-20 py-16 bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              {getText("discover_more_section_title", language)}
            </h2>
            <p className="text-gray-700 text-lg mb-8">
              {getText("discover_more_description", language)}
            </p>
            <div className="flex justify-center items-center space-x-6">
              <motion.button
                className="bg-blue-600 text-white px-10 py-3 rounded-full hover:bg-blue-700 transition duration-300 font-medium flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <Link to="/pub" className="flex items-center">
                  <span className="mr-2">
                    {getText("search_articles_link", language)}
                  </span>
                  <ArrowRight className="text-white size-5" />
                </Link>
              </motion.button>
              <motion.button
                className="bg-gray-200 text-gray-700 px-10 py-3 rounded-full hover:bg-gray-300 transition duration-300 font-medium flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <Link to="/about" className="flex items-center">
                  <span className="mr-2">
                    {getText("about_us_link", language)}
                  </span>
                  <ArrowRight className="text-gray-700 size-5" />
                </Link>
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title, description }) => (
  <motion.div
    className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md transition duration-300 hover:shadow-xl"
    whileHover={{ scale: 1.05 }}
  >
    <div className="flex items-center justify-center h-12 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
    <p className="text-gray-600 text-base text-left">{description}</p>
  </motion.div>
);

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    className="flex flex-col items-center  p-6 bg-white rounded-2xl shadow-md transition duration-300 hover:shadow-xl w-full md:w-1/3"
    whileHover={{ scale: 1.05 }}
  >
    <div className="flex items-center justify-center h-12 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
    <p className="text-gray-600 text-base text-left">{description}</p>
  </motion.div>
);

const TestimonialCard = ({
  rating,
  text,
  name,
  avatarSrc,
  avatarStyle,
  renderStars,
}) => (
  <motion.div
    className="bg-white p-8 rounded-2xl shadow-md w-full md:w-1/3"
    whileHover={{ scale: 1.05 }}
  >
    <div className="flex items-center justify-center mb-2">
      {renderStars(rating)}
    </div>
    <p className="text-gray-700 italic text-lg mb-4">{text}</p>
    <div className="flex items-center mt-4">
      <Avatar style={avatarStyle} alt={name} src={avatarSrc} />
      <h4 className="text-gray-600 font-semibold">{name}</h4>
    </div>
  </motion.div>
);

const PartnerLogo = ({ src, alt, name }) => (
  <motion.div
    className="bg-white p-4 rounded-2xl shadow-md transition duration-300 hover:shadow-xl w-40 h-40 flex justify-center items-center group relative overflow-hidden"
    whileHover={{ scale: 1.05 }}
  >
    <img
      src={src}
      alt={alt}
      className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:opacity-25"
    />
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-50 bg-opacity-75 backdrop-blur-sm">
      <p className="text-gray-800 text-lg font-semibold">{name}</p>
    </div>
  </motion.div>
);

export default Home;
