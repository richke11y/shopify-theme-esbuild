const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, './src/js/templates');

let paths = {
	'bundle.theme': `${__dirname}/src/js/layout/theme.js`
};

const inputFilePaths = (directoryPath) => {

	const files = fs.readdirSync(directoryPath);

	// console.log(files);

	files.forEach((file) => {

		let fileDirPath = '';

		if (fs.statSync(`${directoryPath}/${file}`).isDirectory()) {

			console.log(`${directoryPath}/${file}`);
			console.log(fs.readdirSync(`${directoryPath}/${file}`));

		} else {

			fileDirPath = `${directoryPath}/${file}`;
			const fileExt = path.extname(file);
			const fileName = path.basename(fileDirPath, fileExt);
		
			paths[`bundle.${fileName}`] = fileDirPath;

		}

	});

	return paths

}

const filePaths = inputFilePaths(directoryPath);

console.log(filePaths);



// fs.readdir(directoryPath, (error, files) => {

// 	let paths = {};

// 	if (error) {

// 		return console.log(error);

// 	}

// 	files.forEach((file) => {

// 		const fileDirPath = `${directoryPath}/${file}`;
// 		const fileExt = path.extname(file);
// 		const fileName = path.basename(fileDirPath, fileExt);
	
// 		paths[`bundle.${fileName}`] = fileDirPath;

// 	});

// 	console.log(paths);

// });