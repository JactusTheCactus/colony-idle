import json,yaml
with open("data.yaml", "r") as f:
	data = yaml.safe_load(f)
del data["config"]
with open(f"data.json", "w") as f:
	json.dump(data,f,indent="\t")
data = yaml.dump(data,sort_keys=False)
if not data.title:
	data.title = data.title if data.title else "".join([
	data.theme,
	data.genres[0]
])
with open(f"README.md", "w") as f:
	f.write("\n".join([
		"```yaml",
		data.strip(),
		"```",
	]))