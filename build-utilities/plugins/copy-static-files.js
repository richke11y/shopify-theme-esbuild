const fs = require('node:fs');
const path = require('node:path');

const { copyStaticFile } = require('../functions/copy-static-file.js');

module.exports = (config) => ({

    name: 'copy-static-files',

    setup(build) {

        build.onEnd(async () => {

            if (config.mode === 'development') return;

            console.log('Copying static files...');

            const staticFilePaths = [];

            config.staticFileDirs.forEach((directory) => {

                fs.readdirSync(directory, { withFileTypes: true })
                    .filter((file) => file.isFile())
                    .forEach((file) => staticFilePaths.push(path.join(directory, file.name)));

            });

            await Promise.all(
                staticFilePaths.map((filePath) => copyStaticFile(config.outputDir, filePath))
            );

        });

    }

});