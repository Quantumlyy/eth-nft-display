module.exports = {
	purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'media', // or 'media' or 'class'
	theme: {
		container: {
			center: true
		},
		colors: {
			dark: {
				segment: '#272727',
				DEFAULT: '#303030',
				text: '#ccc'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
