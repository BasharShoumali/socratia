import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite"; // <-- Import the plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- Add it here
  ],

  server: {
    // Configure the development server
    port: 3000,
    open: true,
  },
  envPrefix: "VITE_", // Prefix for environment variables
});
