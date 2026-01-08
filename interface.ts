interface PaymentMethod {
    pay(amount: number): void;
}

class CardPayment implements PaymentMethod {
    pay(amount: number) {
        console.log("Card payment:", amount);
    }
}

class CheckoutService {
    constructor(private payment: PaymentMethod) {}

    checkout(amount: number) {
        this.payment.pay(amount);
    }
}
