const fs = require('fs');
const path = require('path');

const entryPointPaths = (root) => {

	let entryPointsObj = {
		'bundle.theme': `${root}/src/js/layout/theme.js`
	};

	const getAllFiles = (dirPath, arrayFilePaths) => {
	
		const files = fs.readdirSync(dirPath)
	  
		arrayFilePaths = arrayFilePaths || []
	
		files.forEach((file) => {
	
			if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
	
				arrayFilePaths = getAllFiles(`${dirPath}/${file}`, arrayFilePaths);
	
			} else {
	
				arrayFilePaths.push(path.join(`${dirPath}/${file}`));
	
			}
		
		});

		return arrayFilePaths;
	
	}

	const arrayFilePaths = getAllFiles(`${root}/src/js/templates`, []);

	arrayFilePaths.forEach((filePath) => {

		const fileExt = path.extname(filePath);
		const fileName = path.basename(filePath, fileExt);
		const bundleFileName = `bundle.${fileName}`;
	
		entryPointsObj[bundleFileName] = filePath;
	
	});

	return entryPointsObj;

}

module.exports = { entryPointPaths };