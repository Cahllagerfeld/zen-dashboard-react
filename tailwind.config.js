import { zenmlPreset } from "@zenml-io/react-component-library";

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "var(--primary)",
					light: "var(--primary-light)",
					lighter: "var(--primary-lighter)",
					lightest: "var(--primary-lightest)"
				},
				secondary: {
					DEFAULT: "var(--secondary)",
					light: "var(--secondary-light)",
					dark: "var(--secondary-dark)"
				},
				tertiary: {
					DEFAULT: "var(--tertiary)",
					light: "var(--tertiary-light)",
					dark: "var(--tertiary-dark)"
				},
				neutral: {
					50: "var(--neutral-50)",
					100: "var(--neutral-100)",
					200: "var(--neutral-200)",
					300: "var(--neutral-300)",
					400: "var(--neutral-400)",
					500: "var(--neutral-500)",
					600: "var(--neutral-600)",
					700: "var(--neutral-700)",
					800: "var(--neutral-800)",
					900: "var(--neutral-900)",
					950: "var(--neutral-950)"
				},
				theme: {
					background: "var(--background)",
					"background-offset": "var(--background-offset)",
					text: "var(--text)",
					"text-important": "var(--text-important)",
					inactive: "var(--inactive)"
				},
				success: "var(--success)",
				warning: "var(--warning)",
				error: "var(--error)",
				info: "var(--info)"
			},
			boxShadow: {
				default: "var(--shadow-default)",
				sharper: "var(--shadow-sharper)"
			},
			fontFamily: {
				Rubik: ["Rubik", "sans-serif"]
			}
		}
	},
	presets: [zenmlPreset],
	plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")]
};
