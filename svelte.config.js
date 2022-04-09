import node from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({
		scss: {
			prependData: '@import "src/app.scss";'
		},
		postcss: {
			plugins: [autoprefixer],
		},
	}),
	kit: {
		adapter: node(),
		vite: {
			css: {
				preprocessorOptions: {
					scss: {
						additionalData: `@import "src/app.scss";`,
					}
				}
			},
			optimizeDeps: {
				entries: []
			},
		},
	},
	onwarn: (warning, handler) => {
		const { code } = warning;
		if (code === 'css-unused-selector') return;
		handler(warning);
	},
}

export default config;