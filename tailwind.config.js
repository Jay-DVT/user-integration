/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

	theme: {
		extend: {
			colors: {
				primary: "#00bfb2",
				secondary: "#30669a",
			},
		},
	},
	plugins: [],
};
