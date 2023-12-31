import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './src/lang/**/*.json'],
	theme: {
		extend: {
			fontFamily: {
				sans: "'DarkerGrotesque', sans-serif",
				mont: "'Montserrat', sans-serif",
			},
			animation: {
				rotation: 'spin 500s linear infinite',
			},
			screens: {
				xs: "480px"
			}
		},
	},
	plugins: [plugin(({ addComponents }) => {
		addComponents({
			'.stack': {
				display: 'grid',
				'& > *': {
					gridColumn: '1 / -1',
					gridRow: '1 / -1'
				}
			},
		});
	})],
};