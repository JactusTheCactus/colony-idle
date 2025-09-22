import json,yaml
def stringify(obj):
	return yaml.dump(obj,sort_keys=False).strip()
with open("data.yaml", "r") as f:
	data = yaml.safe_load(f)
del data["config"]
if not getattr(data,"title",None):
	data["title"] = " ".join([
		data["theme"],
		"/".join(data["genres"])
	])
with open(f"data.json", "w") as f:
	json.dump(data,f,indent="\t")
with open(f"README.md", "w") as f:
	data = "\n".join([
		"# " + data["title"],
		"## Theme",
		data["theme"],
		"## Genres",
		"\n".join(list(map(
			lambda x: f"- {x}",data["genres"]
		))),
		"## Software",
		"\n".join(list(map(
			lambda x: f"- {x}",data["software"]
		))),
		stringify({
			k: v for k, v in data.items() if k not in [
				"title",
				"theme",
				"genres",
				"software"
			]
		}),
	])
	print(data)
	f.write(data)