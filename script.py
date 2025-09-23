import json,yaml,re
def stringify(obj):
	return yaml.dump(obj,sort_keys=False).strip()
def sortObj(d):
	if isinstance(d, dict):
		return {str(k).capitalize(): sortObj(v) for k, v in sorted(d.items())}
	elif isinstance(d, list):
		return [sortObj(i) for i in d]
	else:
		return d
def h(level:int,label:str):
	levels = {
		1: "=",
		2: "-"
	}
	return "\n".join([
		"",
		label,
		levels[level] * len(label)
	])
with open("data.yaml", "r") as f:
	data = yaml.safe_load(f)
with open(f"data.json", "w") as f:
	json.dump(data,f,indent="\t")
with open(f"README.md", "w") as f:
	data = "\n".join([
		h(1, data["title"]),
		h(2, "Genres"),
		",\n".join(list(map(
			lambda x: f"`#{x.capitalize()}`",
			sorted(data["genres"])
		))),
		h(2, "Software"),
		"\n".join([
			"|" + "|".join([
				k
				for k in
				data["software"].keys()
			]) + "|",
			"|" + "|".join([
				":-:"
				for i in
				range(len(data["software"]))
			]) + "|",
			"|" + "|".join([
				data["software"][k] if data["software"][k] else "`N/A`"
				for k in
				data["software"].keys()
			]) + "|"
		]),
		h(2, "Gameplay"),
		re.sub(
			r":(?: null)?$",
			r"",
			re.sub(
				r"(\t|^)([^\t])",
				r"\1- \2",
				re.sub(
					r" {2}",
					"\t",
					re.sub(
						r"'?(.*?)'?",
						r"\1",
						stringify(sortObj(data["concept"]))
					)
				),
				flags=re.M
			),
			flags=re.M
		)
	]).strip()
	f.write(data)