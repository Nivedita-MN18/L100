//
// Created by nived on 07-01-2026.
//
#include <iostream>
using namespace std;

class Payment {
public:
    void pay(int amount) {
        cout << "Base payment\n";
    }
};

class CardPayment : public Payment {
public:
    void pay(int amount) {
        cout << "Card payment\n";
    }
};

int main() {
    Payment* p = new CardPayment();
    p->pay(100);   // Base payment (static dispatch)
}



