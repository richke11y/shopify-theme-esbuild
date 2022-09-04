const path = require('path');

const outputFilePath = (outputDir, filePath) => {

	const fileExt = path.extname(filePath);
	const fileName = path.basename(filePath, fileExt);

	return `${outputDir}${fileName}${fileExt}`;

};

module.exports = { outputFilePath };