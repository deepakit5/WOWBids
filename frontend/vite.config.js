import path from "path";
import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Set to true to expose it to the network
    port: 5173, // You can change this to any port you want
  },
});

// import { defineConfig } from 'vite'

// export default defineConfig({
//   server: {
//     host: true, // Set to true to expose it to the network
//     port: 3000, // You can change this to any port you want
//   },
// })
