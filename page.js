import * as pug from "pug";
import * as fs from "fs";
const args = process.argv.slice(2);
function writeFile(path, content) {
	fs.writeFile(path, content, err => {
		if (err) {
			console.error(
				"Error writing file (asynchronous with callback):",
				err,
			);
		}
	});
}
function compilePug(file) {
	writeFile(file, pug.compileFile(`${file.split(".")[0]}.pug`)({}));
}
args.map(i => {
	compilePug(i);
});
