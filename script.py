import json
import yaml
import re
def stringify(obj):
	return yaml.dump(obj,sort_keys=False).strip()
def sortObj(obj):
	if isinstance(obj,dict):
		return {str(k).capitalize(): sortObj(v) for k, v in sorted(obj.items())}
	elif isinstance(obj,list):
		return [sortObj(i) for i in sorted(obj)]
	elif isinstance(obj,str):
		return obj.capitalize()
	else:
		return obj
def h(level:int,label:str):
	levels = ["=","-"]
	return "".join(list(map(
		lambda x: "\n"+x,
		[
			label,
			levels[level-1] * len(label)
		]
	)))
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
				(
					", ".join([
						f"{k} `[*.{v}]`"
						for k,v in
						data["software"][k].entries()
					])
					if isinstance(data["software"][k],list) else
					data["software"][k]
				)
				if data["software"][k] else
				"`N/A`"
				for k in
				data["software"].keys()
			]) + "|"
		]),
		h(2, "Gameplay"),
		re.sub(
			r":(?: null)?$",
			r"",
			re.sub(
				r"(- )+",
				r"\1",
				re.sub(
					r"(\t|^)([^\t])",
					r"\1- \2",
					re.sub(
						r" {2}",
						"\t",
						re.sub(
							r"'?(.*?)'?",
							r"\1",
							re.sub(
								r"(- )",
								r"\t\1",
								stringify(sortObj(data["concept"]))
							)
						)
					),
					flags=re.M
				)
			),
			flags=re.M
		)
	]).strip()
	f.write(data)