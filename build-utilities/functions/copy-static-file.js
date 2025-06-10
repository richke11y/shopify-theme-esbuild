const fs = require('fs');
const { outputFilePath } = require('./output-file-path.js');

const copyStaticFile = (outputFileDir, filePath) => {

	fs.copyFile(filePath, outputFilePath(outputFileDir, filePath), (err) => {

		if (err) throw err;

		// console.log(`Copied: ${filePath} >>> ${outputFilePath(outputFileDir, filePath)}`);

	});

};

module.exports = { copyStaticFile };