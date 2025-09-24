class BigNumber {
    mantissa;
    exponent;
    constructor(mantissa = 0, exponent = 0) {
        if (mantissa === 0) {
            this.mantissa = 0;
            this.exponent = 0;
        }
        else {
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
    add(other) {
        if (this.exponent === other.exponent) {
            return new BigNumber(this.mantissa + other.mantissa, this.exponent);
        }
        let bigger = this;
        let smaller = other;
        if (other.exponent > this.exponent) {
            bigger = other;
            smaller = this;
        }
        let diff = bigger.exponent - smaller.exponent;
        if (diff > 15) {
            return new BigNumber(bigger.mantissa, bigger.exponent);
        }
        return new BigNumber(bigger.mantissa + smaller.mantissa / Math.pow(10, diff), bigger.exponent);
    }
    multiply(other) {
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
;
const doc = document.body;
function append(child) {
    doc.appendChild(child);
}
;
function getTime(s = 0, m = 0, h = 0, d = 0) {
    let n = 0;
    n = (n + d) * 24;
    n = (n + h) * 60;
    n = (n + m) * 60;
    n = (n + s) * 1000;
    return n;
}
let n = new BigNumber();
const count = document.createElement("p");
const rateEl = document.createElement("code");
const rate = new BigNumber(1);
function run() {
    n = n.add(rate);
    rateEl.innerHTML = `${rate.toString()}/s`;
    doc.appendChild(rateEl);
    count.innerHTML = n.toString();
    doc.appendChild(count);
}
setInterval(run, getTime(1));
