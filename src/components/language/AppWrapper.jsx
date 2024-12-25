import React from "react";
import { LanguageProvider } from "./Language"; // استيراد LanguageProvider من language.js

const AppWrapper = ({ children }) => {
  return <LanguageProvider>{children}</LanguageProvider>;
};

export default AppWrapper;
