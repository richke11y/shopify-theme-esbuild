const fs = require('fs');
const path = require('path');

function getAllFiles(directoryPaths) {

	const filePathsArray = [];

	directoryPaths.forEach((directoryPath) => {

		const dirFiles = fs.readdirSync(directoryPath, { 
			recursive: true, 
			withFileTypes: true 
		});

        dirFiles.forEach((file) => {

            if (!file.isFile()) return;

            const filePath = path.join(file.parentPath, file.name);

            filePathsArray.push(filePath);

        });

	});

	return filePathsArray;

}

const entryPointPaths = (entryPointDirs) => {

	const entryPointsObject = {};
	const filePathsArray = getAllFiles(entryPointDirs);

	filePathsArray.forEach((filePath) => {

		const fileExt = path.extname(filePath);
		const fileName = path.basename(filePath, fileExt);
		const parentDir = path.basename(path.dirname(filePath));

		const bundleFileName = `${parentDir}.bundle.${fileName}`;

		entryPointsObject[bundleFileName] = filePath;

	});

	return entryPointsObject;

};

module.exports = { entryPointPaths };