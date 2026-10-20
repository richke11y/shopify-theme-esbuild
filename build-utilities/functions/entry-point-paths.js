const fs = require('fs');
const path = require('path');

const entryPointPaths = (root) => {

	let entryPointsObj = {};

	const getAllFiles = (directoryPaths, arrayFilePaths) => {

		arrayFilePaths = arrayFilePaths || []

		directoryPaths.forEach((directoryPath) => {

			let array = [];

			const dirFiles = fs.readdirSync(directoryPath, { recursive: true });

			for (let i = 0; i < dirFiles.length; i++) {

				const file = dirFiles[i];
				const filePath = `${directoryPath}/${file}`

				if (fs.statSync(filePath).isDirectory()) continue;

				array.push(filePath);

			}

			// console.log(array);

			arrayFilePaths = arrayFilePaths.concat(array);

		});

		// console.log(arrayFilePaths);
	
		return arrayFilePaths;
	
	}

	const arrayFilePaths = getAllFiles([
		`${root}/src/js/templates`,
		`${root}/src/js/sections`,
		`${root}/src/js/web-components`
	], []);

	// const getAllFiles = (dirPath, arrayFilePaths) => {

	// 	const files = fs.readdirSync(dirPath)
	  
	// 	arrayFilePaths = arrayFilePaths || []
	
	// 	files.forEach((file) => {
	
	// 		if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
	
	// 			arrayFilePaths = getAllFiles(`${dirPath}/${file}`, arrayFilePaths);
	
	// 		} else {
	
	// 			arrayFilePaths.push(path.join(`${dirPath}/${file}`));
	
	// 		}
		
	// 	});

	// 	console.log(arrayFilePaths);

	// 	return arrayFilePaths;
	
	// }

	// const arrayFilePaths = getAllFiles(`${root}/src/js/templates`, []);

	arrayFilePaths.forEach((filePath) => {

		const fileExt = path.extname(filePath);
		const fileName = path.basename(filePath, fileExt);
		const bundleFileName = `bundle.${fileName}`;
	
		entryPointsObj[bundleFileName] = filePath;
	
	});

	return entryPointsObj;

}

module.exports = { entryPointPaths };