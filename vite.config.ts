import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    svgr({
      include: "**/*.svg?react",
    }),
    VitePWA({
      registerType: "autoUpdate", // 서비스 워커 자동 업데이트
      includeAssets: ["favicon.svg", "*.png"],
      manifest: {
        name: "Cryptoss",
        short_name: "Cryptoss",
        description: "가상화폐 시세 퀵 열람 서비스",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/cryptoss-logo.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // 빌드 시에 정적 자산을 자동 프리캐싱
        globPatterns: ["**/*.{js,css,html,svg,png}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.cryptoss-five.vercel\.app\/.*\/json$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 하루
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-stylesheets",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
