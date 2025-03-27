import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-charts": ["react-chartjs-2", "chart.js"],
          "vendor-ui": [
            "@headlessui/react",
            "@heroicons/react",
            "lucide-react",
          ],
          "vendor-motion": ["framer-motion"],
        },
      },
    },
    // Optionally increase the warning limit if needed
    chunkSizeWarningLimit: 600,
  },
});
