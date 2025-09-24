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
    subtract(other) {
        if (this.exponent === other.exponent) {
            return new BigNumber(this.mantissa - other.mantissa, this.exponent);
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
        return new BigNumber(bigger.mantissa - smaller.mantissa / Math.pow(10, diff), bigger.exponent);
    }
    increase(other) {
        const added = this.add(other);
        this.mantissa = added.mantissa;
        this.exponent = added.exponent;
    }
    decrease(other) {
        const subtracted = this.subtract(other);
        this.mantissa = subtracted.mantissa;
        this.exponent = subtracted.exponent;
    }
    multiply(other) {
        return new BigNumber(this.mantissa * other.mantissa, this.exponent + other.exponent);
    }
    greater(other) {
        return this.exponent > other.mantissa ? true : this.mantissa > other.mantissa;
    }
    lesser(other) {
        return this.exponent < other.mantissa ? true : this.mantissa < other.mantissa;
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
        upgradeIcon: "&#x1FA93;"
    },
    stone: {
        amount: new BigNumber(),
        rate: new BigNumber(1),
        element: document.createElement("div"),
        name: "Stone",
        icon: "&#x1faa8;",
        upgradeText: "Hire Miner",
        upgradeIcon: "&#x26CF;"
    },
    food: {
        amount: new BigNumber(),
        rate: new BigNumber(1),
        element: document.createElement("div"),
        name: "Food",
        icon: "&#x1f356;",
        upgradeText: "Hire Hunter",
        upgradeIcon: "&#x1F3F9;"
    },
    colonists: {
        amount: new BigNumber(),
        rate: new BigNumber(),
        element: document.createElement("div"),
        name: "Colonists",
        icon: "&#x1f9cd;",
        upgradeText: "Birth Colonist",
        upgradeIcon: "&#x1f476;"
    }
};
function runResource(resource, first) {
    resource.amount.increase(resource.rate);
    resource.element.innerHTML = [
        resource.name,
        [
            `${resource.amount.toString()}${resource.icon}`,
            resource.rate.mantissa
                ? ` ${resource.rate.toString()}/s`
                : ""
        ].join("")
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
        document.getElementById(resource.name)?.addEventListener("click", function () {
            if (resource.rate.mantissa) {
                if (resources.colonists.amount.greater(new BigNumber())) {
                    resource.rate.increase(new BigNumber(1));
                    resources.colonists.amount.decrease(new BigNumber(1));
                }
            }
            else {
                resource.amount.increase(new BigNumber(1));
            }
            ;
        });
    }
}
function run(first = false) {
    [
        resources.wood,
        resources.stone,
        resources.food,
        resources.colonists
    ].forEach(i => {
        runResource(i, first);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    run(true);
    setInterval(run, getTime(1));
});
