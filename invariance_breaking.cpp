#include <iostream>
using namespace std;

class Order {
protected:
    bool paid = false;

public:
    virtual void ship() {
        if (!paid) throw runtime_error("Not paid");
        cout << "Shipped\n";
    }
};

class TestOrder : public Order {
public:
    void ship() override {
        cout << "Shipped\n"; // bypasses rule
    }
};

int main() {
    Order* o = new TestOrder();
    o->ship(); // unpaid order shipped
}
