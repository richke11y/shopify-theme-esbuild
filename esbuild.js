const esbuild = require('esbuild');
const sassPlugin = require('esbuild-plugin-sass');
const { entryFilePaths } = require('./entry-file-paths.js');

let config = {

	mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
	entryPoints: entryFilePaths(),
	outputDir: './assets',
	minify: process.env.NODE_ENV === 'development' ? false : true,
	sourcemap: process.env.NODE_ENV === 'development' ? true : false,
	watch: process.env.NODE_ENV === 'development' ? true : false,
	legalComments: process.env.NODE_ENV === 'development' ? 'inline' : 'none',
	format: 'esm'

}

esbuild.build({

	entryPoints: config.entryPoints,
	outdir: config.outputDir,
	bundle: true,
	watch: config.watch,
	minify: config.minify,
	format: config.format,
	sourcemap: config.sourcemap,
	logLevel: 'info',
	legalComments: config.legalComments,
	plugins: [
		sassPlugin()
	],
	loader: {
		'.eot': 'file',
		'.woff': 'file',
		'.woff2': 'file',
		'.svg': 'file',
		'.ttf': 'file',
		'.png':'file',
	 },

})
.catch(() => process.exit(1));