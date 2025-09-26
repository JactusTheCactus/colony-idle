import * as pug from "pug";
import * as fs from "fs";
function writeFile(path, content) {
	fs.writeFile(path, content, err => {
		if (err) {
			console.error("Error writing file (asynchronous with callback):", err);
		}
	});
}
function compilePug(inputPug, outputHtml = "", type = "html") {
	writeFile(
		`${outputHtml ? outputHtml : inputPug}.${type}`,
		pug.compileFile(`${inputPug}.pug`)({}),
	);
}
compilePug("README", undefined, "md");
compilePug("index");
