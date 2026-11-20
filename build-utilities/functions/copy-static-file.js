const fs = require('node:fs/promises');

const { outputFilePath } = require('./output-file-path.js');

const copyStaticFile = async (outputFileDir, filePath, action) => {

	console.log(`${action}: ${filePath}`);

	const outputPath = outputFilePath(outputFileDir, filePath);

	await fs.copyFile(filePath, outputPath);

};

module.exports = { copyStaticFile };