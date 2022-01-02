module.exports = {
	mode: 'jit',
	purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		container: {
			center: true
		},
		extend: {
			colors: {
				gray: {
					50: '#fafafa',
					300: '#d4d4d8',
					400: '#a1a1aa',
					600: '#52525b',
					700: '#242526',
					800: '#191a1b',
					900: '#131214'
				},
				chain: {
					ethereum: '#627eea',
					polygon: '#8247e5',
					optimism: '#ff3856',
					arbitrum: '#28a0f0'
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
