import json,yaml,re
def stringify(obj):
	return yaml.dump(obj,sort_keys=False).strip()
with open("data.yaml", "r") as f:
	data = yaml.safe_load(f)
del data["config"]
if not getattr(data,"title",None):
	data["title"] = " ".join([
		data["theme"][0],
		data["genres"][0]
	])
with open(f"data.json", "w") as f:
	json.dump(data,f,indent="\t")
with open(f"README.md", "w") as f:
	data = "\n".join([
		"# " + data["title"],
		"## Theme",
		"\n".join(list(map(
			lambda x: f"- {x}",data["theme"]
		))),
		"## Genres",
		"\n".join(list(map(
			lambda x: f"- {x}",data["genres"]
		))),
		"## Software",
		"\n".join(list(map(
			lambda x: f"- {x}",data["software"]
		))),
		"## Concept",
		"```yml",
		re.sub(
			r"\s*null\s*$",
			"",
			stringify(
				data["concept"],
				flags=re.M
			)
		),
		"```"
	])
	print(data)
	f.write(data)