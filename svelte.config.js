import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import seqPreprocessor from 'svelte-sequential-preprocessor'
import { preprocessThrelte } from '@threlte/preprocess'

const config = {
	// …
	preprocess: seqPreprocessor([preprocess(), preprocessThrelte()]),

	kit: {
		adapter: adapter(),
		alias: { 'lib/': './src/routes/lib/' }
	},
}

export default config