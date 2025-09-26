import * as pug from "pug";
import * as fs from "fs";
function writeFile(path: string, content: string) {
	fs.writeFile(path, content, (err: any) => {
		if (err) {
			console.error("Error writing file (asynchronous with callback):", err);
		}
	});
}
function compilePug(inputPug: string, outputHtml: string = "", type: string = "html") {
	writeFile(
		`${outputHtml ? outputHtml : inputPug}.${type}`,
		pug.compileFile(`${inputPug}.pug`)({}),
	);
}
compilePug("README", undefined, "md");
compilePug("index");
