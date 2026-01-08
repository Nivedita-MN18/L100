//
// Created by nived on 09-01-2026.
//
// encapsulation_demo.cpp

#include <stdexcept>
#include <string>

namespace Encapsulation {

    /* PRIVATE ≠ ENCAPSULATED */
//bad code
    class User1 {
        bool active;
        std::string role;
    public:
        void setActive(bool a) { active = a; }
        void setRole(const std::string& r) { role = r; }
    };
//good code
    class User2 {
        bool active{false};
        std::string role{"USER"};
    public:
        void activate() { active = true; }

        void promote() {
            if (!active) throw std::logic_error("invalid");
            role = "ADMIN";
        }
    };

    /* ================================
       2. SETTERS
       ================================ */

    class AccountBad {
    public:
        int balance;
        void setBalance(int b) { balance = b; }
    };

    class AccountGood {
        int balance;
    public:
        explicit AccountGood(int b) {
            if (b < 0) throw;
            balance = b;
        }
    };

    /* ================================
       3. DATA vs BEHAVIOR
       ================================ */

    class OrderBad {
    public:
        bool paid;
        bool shipped;
    };

    enum class OrderState { CREATED, PAID, SHIPPED };

    class OrderGood {
        OrderState state{OrderState::CREATED};
    public:
        void pay() { /* logic */ }
        void ship() { /* logic */ }
    };

    /* ================================
       4. GOD OBJECT
       ================================ */

    class OrderManager {
    public:
        void validate(OrderGood&) {}
    };

    class Order {
    public:
        void validate() {}
    };

    /* ================================
       5. MISUSE RESISTANCE
       ================================ */

    class Admin {};

    class Mailer {
    public:
        void send(Admin&) {}
    };

}
