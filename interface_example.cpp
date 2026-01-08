//
// Created by nived on 09-01-2026.
//
#include <iostream>
using namespace std;

class PaymentMethod {
public:
    virtual void pay(int amount) = 0;
    virtual ~PaymentMethod() = default;
};

class CardPayment : public PaymentMethod {
public:
    void pay(int amount) override {
        cout << "Card payment: " << amount << endl;
    }
};

class CheckoutService {
    PaymentMethod& payment;
public:
    CheckoutService(PaymentMethod& p) : payment(p) {}

    void checkout(int amount) {
        payment.pay(amount); // dynamic dispatch
    }
};
