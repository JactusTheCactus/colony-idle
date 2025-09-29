function capitalize(str) {
	return str.length > 1 ?
			[str.charAt(0).toUpperCase(), str.slice(1).toLowerCase()].join("")
		:	str.toUpperCase();
}
function join(arr, joinerMain = ", ", joinerFinal = ", ") {
	const last = arr.pop();
	const joined = [arr.join(joinerMain), last].join(joinerFinal);
	return joined;
}
function and(arr) {
	return join(arr, ", ", " & ");
}
function or(arr) {
	return join(arr, " / ", " / ");
}
const lang = {};
lang.cascadic = [
	"A",
	"B",
	"C",
	"D",
	"D_",
	"E",
	"E_",
	"F",
	"G",
	"H",
	"I",
	"I_",
	"J",
	"K",
	"L",
	"M",
	"N",
	"N_",
	"O",
	"O_",
	"P",
	"R",
	"S",
	"S_",
	"T",
	"T_",
	"U",
	"U_",
	"U__",
	"V",
	"W",
	"Y",
	"Z",
	"Z_",
];
lang.stratic = [];
[
	"B",
	"C",
	"D",
	"D_",
	"F",
	"G",
	"H",
	"J",
	"K",
	"L",
	"M",
	"N",
	"N_",
	"P",
	"R",
	"S",
	"S_",
	"T",
	"T_",
	"V",
	"W",
	"X",
	"Y",
	"Z",
	"Z_",
].forEach(c => {
	["", "A", "E", "E_", "I", "I_", "O", "O_", "U", "U_"].forEach(v => {
		lang.stratic.push(c + v);
	});
});
const uni = [
	{
		_: "\u0301",
		d: "\u00F0",
		n: "\u014B",
		t: "\u00FE",
	},
	{
		_: "\u030C",
	},
];
const native = {
	stratic: "s_ra'tik",
	cascadic: "kaskadik",
};
function toUnicode(str) {
	return str
		.replace(/(\w)(_{1,2})/g, (match, letter, variant) => {
			let out =
				uni[variant.length - 1][letter.toLowerCase()] ||
				[letter, uni[variant.length - 1]["_"]].join("");
			if (/\p{Lu}/u.test(letter)) {
				return out.toUpperCase();
			} else {
				return out.toLowerCase();
			}
		})
		.normalize("NFC");
}
Object.entries(lang).forEach(([k, v]) => {
	console.log(
		[
			`# ${capitalize(k)} \`[${capitalize(toUnicode(native[k]))}]\``,
			and(
				v.map(i => {
					const reg = toUnicode(i);
					return `\`${capitalize(reg)}\``;
				}),
			),
			null,
		].join("\n"),
	);
});
[
	[
		"For both scripts, diacritics create separate letters, not variants",
		"(since latin alphabet variants just add diacritics onto characters to make new ones, unlike cyrillic variants, which, generally, make entirely new symbols)",
	],
	[
		`${and("T D".split(/\s+/).map(i => `\`${i}_\``))} are separate phonemes, differing in voicing`,
		`(${and("\u03B8 d_".split(/\s+/).map(i => `\`/${i}/\``))})`,
	],
	"`'` is the Emphasis mark, and follows the emphasized syllable, though is absent from `Cascadic`",
	[
		"`Stratic` is an Abugida, with each `CV` pair listed",
		'(`X` is the `"Null Consonant"`, hence why it\'s absent from `Cascadic`, an alphabet)',
	],
	`\`Cascadic\` is an Alphabet, with each Letter (${or(["C", "V"].map(i => `\`${i}\``))}) pair listed`,
	"`Stratic` consonants have no inherent value",
	"`U__` is absent from `Stratic`, as the dialect does not have the sound, but the `Cascadic` dialect does",
	[
		"Numerals in both scripts are `base-12`",
		`(${and(Array.from({length: 12}, (_, i) => i).map(i => `\`${i}\``))})`,
	],
	`\`Stratic\` is ${and("blocky horizontal written_in_stone".split(/\s+/).map(i => capitalize(i).replace(/_/g, " ")))}`,
	,
	`\`Cascadic\` is ${and("curved vertical carved_along_the_wood_grain".split(/\s+/).map(i => capitalize(i).replace(/_/g, " ")))}`,
`\`Cascadic\` has ${and("solo initial medial final".split(/\s+/g))} letter forms`
].forEach((n, i) => {
	if (n instanceof Array) {
		n = n.join(" ");
	}
	console.log(`${i + 1}. ${toUnicode(n).replace(/^(.*?)\.?$/g, "$1.")}`);
});
