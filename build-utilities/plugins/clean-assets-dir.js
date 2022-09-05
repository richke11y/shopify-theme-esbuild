const fs = require('fs');

module.exports = (config) => ({

	name: 'clean-assets-dir',
	setup() {

		fs.readdir(config.outputDir, (err, files) => {

			if (err) throw err;

			console.log(`Cleaning directory ${config.outputDir}`);

			for (const file of files) {

				fs.rm(`${config.outputDir}${file}`, (err) => {

					if (err) throw err;

				});

			}

		});

	}

});