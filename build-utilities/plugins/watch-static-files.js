const chokidar = require('chokidar');
const { copyStaticFile } = require('../functions/copy-static-file.js');
const { deleteStaticFile } = require('../functions/delete-static-file.js');

module.exports = (config) => ({

	name: 'watch-static-files',
	setup(build) {

		if (config.mode === 'production') return;

		console.log('Watch Static Files...');

		const watcher = chokidar.watch(config.staticFileDirs);

		watcher.on('add', (filePath) => {

			console.log(`Added: ${filePath}`);

			copyStaticFile(config.outputDir, filePath);
		
		});

		watcher.on('change', (filePath) => {

			console.log(`Changed: ${filePath}`);

			copyStaticFile(config.outputDir, filePath);
		
		});

		watcher.on('unlink', (filePath) => { 

			console.log(`Deleted: ${filePath}`);

			deleteStaticFile(config.outputDir, filePath);
		
		});

	}

});