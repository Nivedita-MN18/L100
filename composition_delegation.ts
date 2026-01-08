type DiscountPolicy = (amount: number) => number;

class Billing {
    constructor(private discount: DiscountPolicy) {}

    bill(amount: number) {
        return this.discount(amount);
    }
}

const festiveDiscount = (amt: number) => amt * 0.8;
console.log(new Billing(festiveDiscount).bill(1000));
