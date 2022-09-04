const fs = require('fs');

module.exports = (config) => ({

	name: 'clean-assets-dir',
	setup() {

		console.log('Clean Directory ./assets');

		fs.readdir(config.outputDir, (err, files) => {

			if (err) throw err;

			for (const file of files) {

				fs.rm(`${config.outputDir}${file}`, (err) => {

					if (err) throw err;

				});

			}

		});

	}

});