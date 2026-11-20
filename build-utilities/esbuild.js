const path = require('node:path');
const esbuild = require('esbuild');
const sassPlugin = require('esbuild-plugin-sass');
const { entryPointPaths } = require('./functions/entry-point-paths.js');
const cleanAssetsDir = require('./plugins/clean-assets-dir.js');
const copyStaticFiles = require('./plugins/copy-static-files.js');
const watchStaticFiles = require('./plugins/watch-static-files.js');

const projectRoot = path.resolve(__dirname, '..');
const isProduction = process.env.NODE_ENV === 'production';

const config = {
	entryPointDirs: [
		path.join(projectRoot, 'src', 'js', 'templates'),
		path.join(projectRoot, 'src', 'js', 'sections'),
		path.join(projectRoot, 'src', 'js', 'web-components'),
		path.join(projectRoot, 'src', 'css')
	],
	legalComments: isProduction ? 'eof' : 'inline',
	minify: isProduction,
	mode: isProduction ? 'production' : 'development',
	outputDir: path.join(projectRoot, 'assets/'),
	sourcemap: !isProduction,
	staticFileDirs: [
		path.join(projectRoot, 'src', 'fonts'),
		path.join(projectRoot, 'src', 'img'),
		path.join(projectRoot, 'src', 'svg'),
	],
	watch: !isProduction
};

const settings = {
	bundle: true,
	entryPoints: entryPointPaths(config.entryPointDirs),
	format: 'esm',
	legalComments: config.legalComments,
	loader: {
		'.eot': 'file',
		'.png': 'file',
		'.svg': 'file',
		'.ttf': 'file',
		'.woff': 'file',
		'.woff2': 'file'
	},
	logLevel: 'info',
	minify: config.minify,
	outdir: config.outputDir,
	plugins: [
		cleanAssetsDir(config),
		copyStaticFiles(config),
		watchStaticFiles(config),
		sassPlugin()
	],
	sourcemap: config.sourcemap,
	watch: config.watch
};

esbuild.build(settings).catch(() => process.exit(1));