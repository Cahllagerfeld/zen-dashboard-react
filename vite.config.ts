import { defineConfig } from "vitest/config";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svgr(), react()],
	test: {
		setupFiles: "./tests/setup.ts",
		include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
		environment: "jsdom"
	},
	resolve: {
		alias: {
			"@": "/src"
		}
	}
});
