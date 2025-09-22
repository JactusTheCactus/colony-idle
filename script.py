import json,yaml
with open("data.yaml", "r") as f:
	data = yaml.safe_load(f)
del data["config"]
with open(f"data.json", "w") as f:
	json.dump(data,f,indent="\t")
if not getattr(data,"title",None):
	data["title"] = " ".join([
		data["theme"],
		"/".join(data["genres"])
	])
with open(f"README.md", "w") as f:
	print(data)
	data = yaml.dump(data,sort_keys=False)
	print(data)
	f.write("\n".join([
		"```yaml",
		data.strip(),
		"```",
	]))