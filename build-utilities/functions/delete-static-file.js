const fs = require('node:fs/promises');

const { outputFilePath } = require('./output-file-path.js');

const deleteStaticFile = async (outputFileDir, filePath) => {

	console.log(`Deleted: ${filePath}`);

	const outputPath = outputFilePath(outputFileDir, filePath);

	await fs.rm(outputPath, { force: true });

	console.log(`Deleted: ${outputPath}`);

};

module.exports = { deleteStaticFile };