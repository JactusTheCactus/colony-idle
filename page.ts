import * as pug from "pug";
import * as fs from "fs";
const args: string[] = process.argv.slice(2);
function writeFile(path: string, content: string) {
	fs.writeFile(path, content, (err: any) => {
		if (err) {
			console.error("Error writing file:", err);
		}
	});
}
function compilePug(file: string) {
	writeFile(
		file,
		pug.compileFile(
			[file.split(".")[0], "pug"].join("."),
		)({}),
	);
}
args.map(compilePug);
