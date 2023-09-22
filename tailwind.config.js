import { zenmlPreset } from "@zenml-io/react-component-library";

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@zenml-io/react-component-library/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			fontFamily: {
				Rubik: ["Rubik", "sans-serif"]
			}
		}
	},
	presets: [zenmlPreset],
	plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")]
};
