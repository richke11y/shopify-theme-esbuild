const fs = require('fs');
const { outputFilePath } = require('./output-file-path.js');

const deleteStaticFile = (outputFileDir, filePath) => {

	fs.rm(outputFilePath(outputFileDir, filePath), (err) => {

		if (err) throw err;

		console.log(`Deleted: ${outputFilePath(outputFileDir, filePath)}`);

	});

};

module.exports = { deleteStaticFile };