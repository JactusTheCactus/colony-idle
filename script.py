import json,yaml,re
def stringify(obj):
	return yaml.dump(obj,sort_keys=False).strip()
def listToBullets(arr):
	return "\n".join(list(map(lambda x: f"- {x}",arr)))
with open("data.yaml", "r") as f:
	data = yaml.safe_load(f)
del data["config"]
with open(f"data.json", "w") as f:
	json.dump(data,f,indent="\t")
with open(f"README.md", "w") as f:
	data = "\n".join([
		f"# {data['title']}",
		", ".join(list(map(
			lambda x: f"`#{x}`",
			sorted(data["genres"])
		))),
		"## Theme",
		"\n".join(list(map(
			lambda x: f"- `{x}`",
			data["theme"]
		))),
		"## Software",
		"\n".join([
			"|"+"|".join([
				k
				for k,v
				in data["software"].items()
			])+"|",
			"|"+"|".join([
				":-:"
				for k,v
				in data["software"].items()
			])+"|",
			"|"+"|".join([
				v
				for k,v
				in data["software"].items()
			])+"|"
		]),
		"## Concept",
		re.sub(
			r":(?: null)?$",
			"",
			re.sub(
				r"(\t|^)([^\t])",
				r"\1- \2",
				re.sub(
					r" {2}",
					"\t",
					stringify(data["concept"])
				),
				flags=re.M
			),
			flags=re.M
		)
	])
	f.write(data)