const fs = require('node:fs');
const path = require('node:path');

module.exports = (config) => ({

    name: 'clean-assets-dir',

    setup() {

        console.log(`Cleaning directory ${config.outputDir}`);

        fs.mkdirSync(config.outputDir, { recursive: true });

        for (const file of fs.readdirSync(config.outputDir)) {

            fs.rmSync(path.join(config.outputDir, file), {
                recursive: true,
                force: true
            });

        }

    }

});
