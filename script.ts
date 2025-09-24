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
function getTime(
	s: number = 0,
	m: number = 0,
	h: number = 0,
	d: number = 0
) {
	let n: number = 0;
	n = (n + d) * 24;
	n = (n + h) * 60;
	n = (n + m) * 60;
	n = (n + s) * 1000;
	return n
}
let wood = new BigNumber(0);
let stone = new BigNumber(0);
let food = new BigNumber(0);
let woodRate = new BigNumber(1);
let stoneRate = new BigNumber(1);
let foodRate = new BigNumber(1);
let woodCount = document.createElement("div");
let stoneCount = document.createElement("div");
let foodCount = document.createElement("div");
function run() {
	wood = wood.add(woodRate);
	stone = stone.add(stoneRate);
	food = food.add(foodRate);
	woodCount.innerHTML = `Wood: ${wood.toString()}`;
	stoneCount.innerHTML = `Stone: ${stone.toString()}`;
	foodCount.innerHTML = `Food: ${food.toString()}`;
	append(woodCount);
	append(stoneCount);
	append(foodCount);
}
setInterval(run, getTime(1));