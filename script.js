function any(arr) {
	return arr.some(i => i);
}
function all(arr) {
	return arr.every(i => i);
}
class BigNumber {
	mantissa;
	exponent;
	value;
	constructor(mantissa = 0, exponent = 0) {
		if (mantissa === 0) {
			this.mantissa = 0;
			this.exponent = 0;
		} else {
			this.exponent =
				Math.floor(Math.log10(Math.abs(mantissa))) + exponent;
			this.mantissa =
				mantissa /
				Math.pow(10, Math.floor(Math.log10(Math.abs(mantissa))));
		}
		this.value = [this.mantissa, this.exponent];
		this.normalize();
	}
	normalize() {
		if (this.mantissa === 0) {
			this.exponent = 0;
			return;
		}
		while (Math.abs(this.mantissa) >= 10) {
			this.mantissa /= 10;
			this.exponent++;
		}
		while (Math.abs(this.mantissa) < 1 && this.mantissa !== 0) {
			this.mantissa *= 10;
			this.exponent--;
		}
	}
	assign(other) {
		this.mantissa = other.mantissa;
		this.exponent = other.exponent;
	}
	add(other) {
		const bigger = other.exponent > this.exponent ? other : this;
		const smaller = other.exponent > this.exponent ? this : other;
		const diff = bigger.exponent - smaller.exponent;
		if (this.exponent === other.exponent) {
			return new BigNumber(this.mantissa + other.mantissa, this.exponent);
		} else if (diff > 15) {
			return new BigNumber(bigger.mantissa, bigger.exponent);
		} else {
			return new BigNumber(
				bigger.mantissa + smaller.mantissa / Math.pow(10, diff),
				bigger.exponent,
			);
		}
	}
	subtract(other) {
		const bigger = other.exponent > this.exponent ? other : this;
		const smaller = other.exponent > this.exponent ? this : other;
		const diff = bigger.exponent - smaller.exponent;
		if (this.exponent === other.exponent) {
			return new BigNumber(this.mantissa - other.mantissa, this.exponent);
		} else if (diff > 15) {
			return new BigNumber(bigger.mantissa, bigger.exponent);
		} else {
			return new BigNumber(
				bigger.mantissa - smaller.mantissa / Math.pow(10, diff),
				bigger.exponent,
			);
		}
	}
	increase(other) {
		this.assign(this.add(other));
	}
	decrease(other) {
		this.assign(this.subtract(other));
	}
	multiply(other) {
		return new BigNumber(
			this.mantissa * other.mantissa,
			this.exponent + other.exponent,
		);
	}
	greater(other) {
		return any([
			this.exponent > other.exponent,
			all([
				this.exponent === other.exponent,
				this.mantissa > other.mantissa,
			]),
		]);
	}
	lesser(other) {
		return any([
			this.exponent < other.exponent,
			all([
				this.exponent === other.exponent,
				this.mantissa < other.mantissa,
			]),
		]);
	}
	toString() {
		if (this.exponent < 3) {
			return Math.round(
				this.mantissa * Math.pow(10, this.exponent),
			).toString();
		}
		return [this.mantissa.toFixed(2), this.exponent].join("e");
	}
	exists() {
		return this.greater(new BigNumber());
	}
}
const doc = document.body;
function append(child) {
	doc.appendChild(child);
}
function getTime(s = 0, m = 0, h = 0) {
	let n = 0;
	n += h;
	n *= 60;
	n += m;
	n *= 60;
	n += s;
	n *= 1000;
	return n;
}
function appendEl(parent, child) {
	parent.appendChild(child);
}
const resources = {
	wood: {
		amount: new BigNumber(),
		rate: new BigNumber(1),
		element: document.createElement("div"),
		name: "Wood",
		icon: "&#x1fab5;",
		upgradeText: "Hire Forester",
		upgradeIcon: "&#x1FA93;",
	},
	stone: {
		amount: new BigNumber(),
		rate: new BigNumber(1),
		element: document.createElement("div"),
		name: "Stone",
		icon: "&#x1faa8;",
		upgradeText: "Hire Miner",
		upgradeIcon: "&#x26CF;",
	},
	food: {
		amount: new BigNumber(),
		rate: new BigNumber(1),
		element: document.createElement("div"),
		name: "Food",
		icon: "&#x1f356;",
		upgradeText: "Hire Hunter",
		upgradeIcon: "&#x1F3F9;",
	},
	colonists: {
		amount: new BigNumber(),
		rate: new BigNumber(),
		element: document.createElement("div"),
		name: "Colonists",
		icon: "&#x1f9cd;",
		upgradeText: "Birth Colonist",
		upgradeIcon: "&#x1f476;",
	},
};
function runResource(resource, first) {
	resource.amount.increase(resource.rate);
	resource.element.innerHTML = [
		resource.name,
		[
			`${resource.amount.toString()}${resource.icon}`,
			resource.rate.mantissa ? ` ${resource.rate.toString()}/s` : "",
		].join(""),
	].join(": ");
	document.querySelector("#resources")?.appendChild(resource.element);
	if (first) {
		const main = document.querySelector("#main");
		const upgrade = document.createElement("button");
		upgrade.id = resource.name;
		upgrade.innerHTML = resource.upgradeIcon + resource.upgradeText;
		const parent = document.createElement("div");
		parent.appendChild(upgrade);
		main?.appendChild(parent);
		document
			.getElementById(resource.name)
			?.addEventListener("click", function () {
				if (resource.rate.exists()) {
					if (resources.colonists.amount.exists()) {
						resources.colonists.amount.decrease(new BigNumber(1));
						resource.rate.increase(new BigNumber(1));
					}
				} else {
					resource.amount.increase(new BigNumber(1));
				}
			});
	}
}
function run(first = false) {
	[
		resources.wood,
		resources.stone,
		resources.food,
		resources.colonists,
	].forEach(i => {
		runResource(i, first);
	});
}
document.addEventListener("DOMContentLoaded", () => {
	run(true);
	setInterval(run, getTime(1));
});
