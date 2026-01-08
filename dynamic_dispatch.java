abstract class Payment {
    abstract void pay(int amount);
}

class CardPayment extends Payment {
    void pay(int amount) {
        System.out.println("Card payment");
    }
}

public class dynamic_dispatch {
    public static void main(String[] args) {
        Payment p = new CardPayment();
        p.pay(100); // runtime dispatch
    }
}
