interface PaymentMethod {
    void pay(int amount);
}
class CardPayment2 implements PaymentMethod {
    public void pay(int amount) {
//logic
    }
}

class UpiPayment implements PaymentMethod {
    public void pay(int amount) {
//logic    }
}

class CheckoutService {
    private final PaymentMethod payment;

    CheckoutService(PaymentMethod payment) {
        this.payment = payment;
    }

    void checkout(int amount) {
        payment.pay(amount); // polymorphism
    }
}
