const fs = require('fs');
const { copyStaticFile } = require('../functions/copy-static-file.js');

module.exports = (config) => ({

	name: 'copy-static-files',
	setup(build) {

		build.onEnd(() => {

			if (config.mode === 'development') return;

			console.log('Copying static files...');

			const staticFilePaths = [];

			config.staticFileDirs.forEach((path) => {

				fs.readdirSync(path).forEach((file) => staticFilePaths.push(`${path}${file}`));

			});

			staticFilePaths.forEach((filePath) => copyStaticFile(config.outputDir, filePath));

		});

	}

});