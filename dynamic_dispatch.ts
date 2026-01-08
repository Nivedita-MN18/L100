interface Payment {
    pay(amount: number): void;
}

class CardPayment implements Payment {
    pay(amount: number) {
        console.log("Card payment");
    }
}

function checkout(p: Payment) {
    p.pay(100);
}

checkout(new CardPayment());
