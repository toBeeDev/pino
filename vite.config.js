import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["@react-three/fiber", "@react-three/drei", "three"],
          animation: ["gsap", "@gsap/react"],
          scroll: ["lenis", "react-scroll"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  assetsInclude: ["**/*.glb", "**/*.gltf"],
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
});
