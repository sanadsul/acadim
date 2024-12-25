import React, { useState, useEffect, createContext, useContext } from "react";

// Context لادارة اللغة
const LanguageContext = createContext();

// Provider لتوفير اللغة
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "ar"
  );

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  return useContext(LanguageContext);
};

// دالة للحصول على النص بناءً على اللغة
const getText = (key, language) => {
  const translations = {
    ar: {
      digital: "الرقمية",
      academic: "الأكاديمية",
      summarize_articles: "تلخيص المقالات",
      search_articles: "البحث عن المقالات",
      writing_assistant: "مساعد الكتابة",
      learning_assistant: "مساعد التعلم",
      instant_translation: "مساعد الترجمة الفورية",
      logout: "تسجيل الخروج",
      dashboard: "لوحة التحكم",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      user: "مستخدم",
      welcome_message: "مرحبا بك في الصفحة الرئيسية",
      home_description: "هذا هو وصف الصفحة الرئيسية.",
      hero_title: "استكشف آفاقًا جديدة مع أكاديميا الذكية",
      hero_description_1:
        "مساعد يعتمد على الذكاء الاصطناعي لمساعدة الباحثين في كتابة الأبحاث العلمية، لا يلغي دور الباحث و لكن يساعد في كتابة البحث سواء رسالة ماجستير أو دكتوراه أو أي بحث علمي في أقل وقت و بأقل مجهود.",
      hero_description_2:
        "نافذتك إلى عالم الأبحاث! أكثر من 320 مليون مقال علمي بانتظارك لاكتشاف أسرار الكون. نحن نقدم لك أدوات قوية للوصول إلى المعرفة التي تحتاجها بكل سهولة ويسر.",
      hero_description_3:
        "دعنا نلهم فضولك العلمي ونساعدك على تحقيق أهدافك البحثية. اكتشف عالمًا جديدًا من المعرفة العلمية المتاحة لك الآن.",
      search_articles_button: "البحث عن المقالات",
      services_section_title: "خدماتنا",
      service_1_title: "تلخيص المقالات والأبحاث",
      service_1_description:
        "احصل على ملخصات دقيقة ووافية لأي مقال أو بحث علمي، مما يوفر وقتك وجهدك.",
      service_2_title: "تحليل النصوص والمحتوى الأكاديمي",
      service_2_description:
        "نحلل النصوص الأكاديمية بعمق لاستخلاص الأفكار الرئيسية والاتجاهات البحثية.",
      service_3_title: "مساعدة في إعداد الأبحاث العلمية",
      service_3_description:
        "نقدم لك المساعدة في جميع مراحل إعداد البحث، من اختيار الموضوع إلى كتابة النتائج.",
      service_4_title: "اقتراح مصادر ومراجع موثوقة",
      service_4_description:
        "نساعدك في العثور على المصادر والمراجع الأكاديمية الموثوقة والحديثة لدعم بحثك.",
      why_choose_us_section_title: "لماذا تختار أكاديميا الذكية؟",
      feature_1_title: "دقة وسرعة فائقة",
      feature_1_description:
        "نستخدم أحدث تقنيات الذكاء الاصطناعي لتحليل البيانات بدقة وسرعة لا مثيل لها. نضمن لك الحصول على نتائج موثوقة في أقل وقت ممكن. هذه الميزة توفر لك الكثير من الوقت والجهد في عملية البحث العلمي.",
      feature_2_title: "دعم شامل للباحثين",
      feature_2_description:
        "نقدم لك مجموعة متكاملة من الأدوات والخدمات التي تغطي جميع مراحل البحث العلمي، من استكشاف المصادر إلى كتابة النتائج. سواء كنت طالبًا أو باحثًا، فإننا نوفر لك الدعم الذي تحتاجه لتحقيق أهدافك.",
      feature_3_title: "مصادر موثوقة",
      feature_3_description:
        "نوفر لك الوصول إلى ملايين المقالات العلمية من مصادر موثوقة ومعتمدة عالميًا. يمكنك الاعتماد على مصادرنا لبناء بحثك العلمي على أساس قوي ومتين.",
      testimonials_section_title: "ماذا يقول المستخدمون؟",
      testimonial_1_text:
        "أكاديميا الذكية ساعدتني كثيرًا في إنجاز بحثي في وقت قياسي. أنصح بها كل باحث.",
      testimonial_1_name: "- أحمد، طالب دراسات عليا",
      testimonial_2_text:
        "أكاديميا الذكية ساعدتني كثيرًا في إنجاز بحثي في وقت قياسي. أنصح بها كل باحث.",
      testimonial_2_name: "- أحمد، طالب دراسات عليا",
      testimonial_3_text:
        "خدمة تلخيص المقالات رائعة وموفرة للوقت. لم أعد أضيع ساعات في قراءة الأبحاث الطويلة.",
      testimonial_3_name: "- فاطمة، باحثة علمية",
      contact_us_section_title: "تواصل معنا",
      contact_us_description:
        "هل لديك أي أسئلة أو استفسارات؟ لا تتردد في التواصل معنا.",
      name_placeholder: "اسمك",
      email_placeholder: "بريدك الإلكتروني",
      message_placeholder: "رسالتك",
      send_message_button: "أرسل رسالتك",
      newsletter_section_title: "انضم إلى قائمتنا البريدية",
      newsletter_description:
        "كن على اطلاع دائم بآخر التحديثات والأخبار والمقالات العلمية. انضم إلى قائمتنا البريدية لتصلك كل جديد.",
      email_input_placeholder: "أدخل بريدك الإلكتروني",
      subscribe_button: "اشترك الآن",
      partners_section_title: "شركاؤنا",
      partners_description:
        "نحن فخورون بالتعاون مع هذه المؤسسات الرائدة لدعم البحث العلمي والابتكار.",
      google_logo: "شعار جوجل",
      google_name: "جوجل",
      amazon_logo: "شعار أمازون",
      amazon_name: "أمازون",
      microsoft_logo: "شعار مايكروسوفت",
      microsoft_name: "مايكروسوفت",
      ibm_logo: "شعار أي بي أم",
      ibm_name: "أي بي أم",
      discover_more_section_title: "اكتشف المزيد",
      discover_more_description:
        "استكشف مجموعتنا المتنوعة من الخدمات والأدوات التي تساعدك في رحلتك البحثية.",
      search_articles_link: "ابحث عن المقالات",
      about_us_link: " تعرف علينا",
      ar: "العربية",
      en: "English",
    },
    en: {
      digital: "Digital",
      academic: "Academic",
      summarize_articles: "Summarize Articles",
      search_articles: "Search Articles",
      writing_assistant: "Writing Assistant",
      learning_assistant: "Learning Assistant",
      instant_translation: "Instant Translation",
      logout: "Logout",
      dashboard: "Dashboard",
      login: "Login",
      signup: "Sign Up",
      user: "User",
      welcome_message: "Welcome to the Home Page",
      home_description: "This is the description of the Home page.",
      hero_title: "Explore New Horizons with Smart Academia",
      hero_description_1:
        "An AI-powered assistant to help researchers write scientific papers. It does not replace the researcher's role but helps in writing the research, whether a master's thesis, a doctoral dissertation, or any scientific research, in less time and with less effort.",
      hero_description_2:
        "Your gateway to the world of research! Over 320 million scientific articles are waiting for you to discover the secrets of the universe. We provide you with powerful tools to access the knowledge you need with ease.",
      hero_description_3:
        "Let us inspire your scientific curiosity and help you achieve your research goals. Discover a new world of scientific knowledge available to you now.",
      search_articles_button: "Search for Articles",
      services_section_title: "Our Services",
      service_1_title: "Summarizing Articles and Research",
      service_1_description:
        "Get accurate and comprehensive summaries of any article or scientific research, saving your time and effort.",
      service_2_title: "Analyzing Texts and Academic Content",
      service_2_description:
        "We analyze academic texts in depth to extract key ideas and research trends.",
      service_3_title: "Assistance in Preparing Scientific Research",
      service_3_description:
        "We offer assistance in all stages of research preparation, from choosing the topic to writing the results.",
      service_4_title: "Suggesting Reliable Sources and References",
      service_4_description:
        "We help you find reliable and up-to-date academic sources and references to support your research.",
      why_choose_us_section_title: "Why Choose Smart Academia?",
      feature_1_title: "Superior Accuracy and Speed",
      feature_1_description:
        "We use the latest artificial intelligence technologies to analyze data with unmatched accuracy and speed. We guarantee you reliable results in the shortest possible time. This feature saves you a lot of time and effort in the scientific research process.",
      feature_2_title: "Comprehensive Support for Researchers",
      feature_2_description:
        "We offer you an integrated set of tools and services that cover all stages of scientific research, from exploring sources to writing results. Whether you are a student or a researcher, we provide you with the support you need to achieve your goals.",
      feature_3_title: "Reliable Sources",
      feature_3_description:
        "We provide you with access to millions of scientific articles from reliable and globally recognized sources. You can rely on our sources to build your scientific research on a strong and solid foundation.",
      testimonials_section_title: "What Users Say?",
      testimonial_1_text:
        "Smart Academia helped me a lot in completing my research in record time. I recommend it to every researcher.",
      testimonial_1_name: "- Ahmed, Graduate Student",
      testimonial_2_text:
        "Smart Academia helped me a lot in completing my research in record time. I recommend it to every researcher.",
      testimonial_2_name: "- Ahmed, Graduate Student",
      testimonial_3_text:
        "The article summarizing service is great and time-saving. I no longer waste hours reading long papers.",
      testimonial_3_name: "- Fatima, Scientific Researcher",
      contact_us_section_title: "Contact Us",
      contact_us_description:
        "Do you have any questions or inquiries? Do not hesitate to contact us.",
      name_placeholder: "Your Name",
      email_placeholder: "Your Email",
      message_placeholder: "Your Message",
      send_message_button: "Send Your Message",
      newsletter_section_title: "Join Our Mailing List",
      newsletter_description:
        "Stay up to date with the latest updates, news, and scientific articles. Join our mailing list to receive everything new.",
      email_input_placeholder: "Enter your email",
      subscribe_button: "Subscribe Now",
      partners_section_title: "Our Partners",
      partners_description:
        "We are proud to cooperate with these leading institutions to support scientific research and innovation.",
      google_logo: "Google Logo",
      google_name: "Google",
      amazon_logo: "Amazon Logo",
      amazon_name: "Amazon",
      microsoft_logo: "Microsoft Logo",
      microsoft_name: "Microsoft",
      ibm_logo: "IBM Logo",
      ibm_name: "IBM",
      discover_more_section_title: "Discover More",
      discover_more_description:
        "Explore our diverse range of services and tools that help you in your research journey.",
      search_articles_link: "Search for Articles",
      about_us_link: "Learn About Us",
    },
  };
  return translations[language]?.[key] || key;
};

export { LanguageProvider, useLanguage, getText };
