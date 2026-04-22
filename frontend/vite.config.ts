import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // During local dev, /predict and /health are forwarded to the Flask API.
      // Production uses VITE_API_BASE_URL set in .env.production.
      "/predict": {
        target: "http://localhost:5003",
        changeOrigin: true,
      },
      "/health": {
        target: "http://localhost:5003",
        changeOrigin: true,
      },
    },
  },
});
