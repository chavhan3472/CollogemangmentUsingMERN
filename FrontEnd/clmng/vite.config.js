// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: process.env.PORT || 5173, // Render ka dynamic port
//     host: true, // external network access allow
//   },
// });
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: process.env.PORT || 5173,
//     host: true,
//   },
//   preview: {
//     allowedHosts: ["collogemangmentusingmern-2.onrender.com"],
//   },
// });
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: process.env.PORT || 5173,
//     host: true,
//     allowedHosts: ["frontend-w1es.onrender.com"], // live URL allow karo
//   },
//   preview: {
//     allowedHosts: ["frontend-w1es.onrender.com"], // preview ke liye bhi
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173, // local dev ke liye
    host: true,
    // allowedHosts remove kar do, dev me local access ke liye enough
  },
  preview: {
    port: process.env.PORT || 4173, // Render dynamic port
    strictPort: false, // agar port busy hai toh alternate port use ho
    // allowedHosts remove kar do, Render automatically handle karta hai
  },
});
