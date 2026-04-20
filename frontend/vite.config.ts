import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
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
