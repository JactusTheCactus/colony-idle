class BigNumber {
	mantissa: number;
	exponent: number;
	constructor(mantissa: number = 0, exponent: number = 0) {
		if (mantissa === 0) {
			this.mantissa = 0;
			this.exponent = 0;
		} else {
			this.exponent = Math.floor(Math.log10(Math.abs(mantissa))) + exponent;
			this.mantissa = mantissa / Math.pow(10, Math.floor(Math.log10(Math.abs(mantissa))));
		}
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
	add(other: BigNumber) {
		if (this.exponent === other.exponent) {
			return new BigNumber(this.mantissa + other.mantissa, this.exponent);
		}
		let bigger: BigNumber = this;
		let smaller: BigNumber = other;
		if (other.exponent > this.exponent) {
			bigger = other;
			smaller = this;
		}
		let diff = bigger.exponent - smaller.exponent;
		if (diff > 15) {
			return new BigNumber(bigger.mantissa, bigger.exponent);
		}
		return new BigNumber(
			bigger.mantissa + smaller.mantissa / Math.pow(10, diff),
			bigger.exponent
		);
	}
	multiply(other: BigNumber) {
		return new BigNumber(this.mantissa * other.mantissa, this.exponent + other.exponent);
	}
	toString() {
		if (this.exponent < 3) {
			return Math.round(this.mantissa * Math.pow(10, this.exponent)).toString();
		}
		return [
			this.mantissa.toFixed(2),
			this.exponent
		].join("e");
	}
}
const doc = document.body;
function append(child: HTMLElement) {
	doc.appendChild(child)
}
function getTime(s: number = 0, m: number = 0, h: number = 0) {
	let n: number = 0;
	n += h;
	n *= 60;
	n += m;
	n *= 60;
	n += s;
	n *= 1000;
	return n
}
function appendEl(parent: HTMLElement, child: HTMLElement) {
	parent.appendChild(child)
}
function navAppend(el: HTMLElement) {
	document.querySelector("#resources")?.appendChild(el)
}
type Resource = {
	amount: BigNumber;
	rate: BigNumber;
	element: HTMLTableCellElement;
	name: string;
};
const resources: Record<string, Resource> = {
	wood: {
		amount: new BigNumber(0),
		rate: new BigNumber(1),
		element: document.createElement("td"),
		name: "Wood"
	},
	stone: {
		amount: new BigNumber(0),
		rate: new BigNumber(1),
		element: document.createElement("td"),
		name: "Stone"
	},
	food: {
		amount: new BigNumber(0),
		rate: new BigNumber(1),
		element: document.createElement("td"),
		name: "Food"
	},
};
function runResource(resource: Resource, first: boolean) {
	resource.amount = resource.amount.add(resource.rate);
	resource.element.innerHTML = [
		resource.name,
		[
			resource.amount.toString(),
			resource.rate.toString() + "/s"
		].join(" | ")
	].join(": ");
	navAppend(resource.element);
	if (first) {
		const main = document.querySelector("#main");
		if (main instanceof HTMLElement) {
			main.style.height = `${window.innerHeight}`
		};
		const upgrade = document.createElement("button");
		upgrade.innerText = `Upgrade ${resource.name}`;
		main?.appendChild(upgrade);
	}
}
function run(first: boolean = false) {
	[
		runResource(resources.wood, first),
		runResource(resources.stone, first),
		runResource(resources.food, first)
	].forEach(i => i)
	document.querySelectorAll("#resources *").forEach(i => {
		if (i instanceof HTMLElement) {
			i.style.textAlign = "center"
		};
	})
}
document.addEventListener('DOMContentLoaded', () => {
	run(true);
	setInterval(run, getTime(1));
});