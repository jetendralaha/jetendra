import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Project site: repo is "jetendra", served at
// https://jetendralaha.github.io/jetendra/ , so the base path is "/jetendra/".
export default defineConfig({
  base: "/jetendra/",
  plugins: [react()],
});
