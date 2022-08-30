const esbuild = require('esbuild');
const sassPlugin = require('esbuild-plugin-sass');

let config = {

	mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
	entryPoints: {
		'bundle.theme': './src/js/layout/theme.js',
		'bundle.account': './src/js/templates/customers/account.js',
		'bundle.activate_account': './src/js/templates/customers/activate_account.js',
		'bundle.addresses': './src/js/templates/customers/addresses.js',
		'bundle.login': './src/js/templates/customers/login.js',
		'bundle.order': './src/js/templates/customers/order.js',
		'bundle.register': './src/js/templates/customers/register.js',
		'bundle.reset_password': './src/js/templates/customers/reset_password.js',
		'bundle.404': './src/js/templates/404.js',
		'bundle.article': './src/js/templates/article.js',
		'bundle.blog': './src/js/templates/blog.js',
		'bundle.cart': './src/js/templates/cart.js',
		'bundle.cart': './src/js/templates/challenge.js',
		'bundle.collection': './src/js/templates/collection.js',
		'bundle.gift_card': './src/js/templates/gift_card.js',
		'bundle.index': './src/js/templates/index.js',
		'bundle.list-collections': './src/js/templates/list-collections.js',
		'bundle.page': './src/js/templates/page.js',
		'bundle.password': './src/js/templates/password.js',
		'bundle.product': './src/js/templates/product.js',
		'bundle.search': './src/js/templates/search.js'
	},
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