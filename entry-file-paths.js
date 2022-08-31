const fs = require('fs');
const path = require('path');

const entryFilePaths = () => {

	let entryPointPathsObj = {
		'bundle.theme': './src/js/layout/theme.js'
	};
	
	const getAllFiles = (dirPath, arrayFilePaths) => {
	
		const files = fs.readdirSync(dirPath)
	  
		arrayFilePaths = arrayFilePaths || []
	
		files.forEach((file) => {
	
			if (fs.statSync(dirPath + "/" + file).isDirectory()) {
	
				arrayFilePaths = getAllFiles(dirPath + "/" + file, arrayFilePaths)
	
			} else {
	
				arrayFilePaths.push(path.join(__dirname, dirPath, "/", file))
	
			}
		
		});
	  
		return arrayFilePaths;
	
	}
	
	const arrayFilePaths = getAllFiles('./src/js/templates', []);
	
	arrayFilePaths.forEach((filePath) => {

		const fileExt = path.extname(filePath);
		const fileName = path.basename(filePath, fileExt);
		const bundleFileName = `bundle.${fileName}`;
	
		entryPointPathsObj[bundleFileName] = filePath;
	
	});

	return entryPointPathsObj;

}

module.exports = { entryFilePaths };