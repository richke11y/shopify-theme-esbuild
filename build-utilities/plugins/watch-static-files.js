const chokidar = require('chokidar');

const { copyStaticFile } = require('../functions/copy-static-file.js');
const { deleteStaticFile } = require('../functions/delete-static-file.js');

module.exports = (config) => ({

	name: 'watch-static-files',

	setup(build) {

		if (config.mode === 'production') return;

		console.log('Watching static files...');

		const watcher = chokidar.watch(config.staticFileDirs);

		watcher.on('add', async (filePath) => await copyStaticFile(config.outputDir, filePath, 'Added'));

		watcher.on('change', async (filePath) => await copyStaticFile(config.outputDir, filePath, 'Changed'));

		watcher.on('unlink', async (filePath) => await deleteStaticFile(config.outputDir, filePath));

		watcher.on('error', (error) => console.error('Static file watcher error:', error));

	}

});