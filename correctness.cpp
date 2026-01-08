//
// Created by nived on 09-01-2026.
//
// state_time_demo.cpp
// Same concepts as Java file

#include <stdexcept>

namespace StateTime {
//bad code
class Counter {
    int value{0};
public:
    void increment() { value++; }
    int get() const { return value; }
};
    //good code

class Counter2 {
    const int value;
public:
    explicit Counter2(int v) : value(v) {}
    Counter2 incremented() const {
        return Counter2(value + 1);
    }
};

/* ================================
   2. TEMPORAL COUPLING
   ================================ */

class ResourceBad {
    bool initialized{false};
public:
    void init() { initialized = true; }
    void use() {
        if (!initialized) throw std::logic_error("invalid");
        // logic
    }
};

class ResourceGood {
public:
    ResourceGood() {
        // born valid
    }
    void use() {
        // safe
    }
};

/* TOCTOU */
//bad code
class Account {
public:
    int balance{0};
};
//good code
class Account2 {
    int balance;
public:
    explicit Account2(int initial) {
        if (initial < 0) throw std::invalid_argument("bad");
        balance = initial;
    }

    void withdraw(int amount) {
        if (amount <= 0) throw;
        if (balance < amount) throw;
        balance -= amount;
    }
};

/* ================================
   4. INVARIANTS
   ================================ */

class BalanceBad {
public:
    int balance;
    void setBalance(int b) { balance = b; }
};

class BalanceGood {
    int balance;
public:
    explicit BalanceGood(int b) {
        if (b < 0) throw;
        balance = b;
    }
};

/* ================================
   5. PARTIAL CONSTRUCTION
   ================================ */

class UserBad {
public:
    std::string email;
    std::string role;
};

class UserGood {
    const std::string email;
    const std::string role;
public:
    UserGood(std::string e, std::string r) : email(e), role(r) {
        if (e.empty() || r.empty()) throw;
    }
};

/* ================================
   6. STATE MACHINES
   ================================ */

enum class OrderState { CREATED, PAID, SHIPPED };

class OrderGood {
    OrderState state{OrderState::CREATED};
public:
    void pay() {
        if (state != OrderState::CREATED) throw;
        state = OrderState::PAID;
    }
};

}
