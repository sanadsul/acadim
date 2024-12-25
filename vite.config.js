import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { commonjs } from '@vitejs/plugin-commonjs'; // استيراد إضافة commonjs

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    commonjs() // إضافة إضافة commonjs هنا
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
