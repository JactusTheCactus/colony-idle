import json,yaml,re
def stringify(obj):
	return yaml.dump(obj,sort_keys=False).strip()
def listToBullets(arr):
	return "\n".join(list(map(lambda x: f"- {x}",arr)))
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
		listToBullets(data["theme"]),
		"## Genres",
		listToBullets(data["genres"]),
		"## Software",
		listToBullets(data["software"]),
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
	print(data)
	f.write(data)