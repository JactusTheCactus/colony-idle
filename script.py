import json,yaml
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
		"```yaml",
		yaml
			.dump(
				data,
				sort_keys = False
			)
			.strip(),
		"```",
	])
	f.write(data)