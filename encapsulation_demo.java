// EncapsulationDemo.java
// Covers: Encapsulation vs Information Hiding, Setters, Invariants,
// Behavioral vs Data Encapsulation, Demeter, Responsibility Leakage,
// Ask vs Inspect, God Objects, Dependency Cycles, Misuse-Resistant APIs

public class EncapsulationDemo {

    /* INFORMATION HIDING ≠ ENCAPSULATION
        */

    // bad code: private fields + public setters (not encapsulated)
    static class User {
        private boolean active;
        private String role;

        void setActive(boolean a) { active = a; }
        void setRole(String r) { role = r; }
    }
    // GOOD: controls correctness
    static class User2 {
        private boolean active = false;
        private String role = "USER";

        void activate() {
            active = true;
        }
        void promoteAdmin() {
            if (!active) throw new IllegalStateException();
            role = "ADMIN";
        }
    }

    /* =====================================================
       2. SETTERS DESTROY ENCAPSULATION
       ===================================================== */

    // Bad code
    static class Account1 {
        private int balance;
        void setBalance(int b) {
            balance = b; // invariant broken
        }
    }
    // Good code
    static class Account2 {
        private int balance;

        Account2(int initial) {
            if (initial < 0) throw new IllegalArgumentException();
            balance = initial;
        }
        void withdraw(int amount) {
            // enforce invariant
            // logic
        }
    }

    /* =====================================================
       3. GETTER TROUBLE (ANEMIC MODEL)
       ===================================================== */

    // BAD
    static class AccountGetterBad {
        int getBalance() { return 0; }
        void withdraw(int amt) {}
    }

    // GOOD
    static class AccountBehaviorGood {
        void withdrawIfPossible(int amt) {
            // logic
        }
    }

    /* =====================================================
       4. DATA vs BEHAVIORAL ENCAPSULATION
       ===================================================== */

    // BAD: passive data
    static class OrderBad {
        boolean paid;
        boolean shipped;
    }

    // GOOD: behavior owns rules
    static class OrderGood {
        private OrderState state = OrderState.CREATED;

        void pay() {
            // logic
        }

        void ship() {
            // logic
        }
    }

    enum OrderState { CREATED, PAID, SHIPPED }

    /* =====================================================
       5. LAW OF DEMETER (ASK, DON'T INSPECT)
       ===================================================== */

    // BAD
    static class ShippingServiceBad {
        void ship(OrderGood o) {
            // if (o.state == PAID) { ... }
        }
    }

    // GOOD
    static class ShippingServiceGood {
        void shipIfAllowed(OrderGood o) {
            if (o.isShippable()) {
                // logic
            }
        }
    }

    /* =====================================================
       6. RESPONSIBILITY LEAKAGE
       ===================================================== */

    // BAD
    static class PaymentServiceBad {
        void charge(UserGood u) {
            // if (u.isActive() && !u.isBanned()) ...
        }
    }

    // GOOD
    static class PaymentServiceGood {
        void charge(UserGood u) {
            u.chargeIfAllowed();
        }
    }

    /* =====================================================
       7. GOD OBJECT
       ===================================================== */

    // BAD
    static class OrderManager {
        void validate(OrderGood o) {}
        void price(OrderGood o) {}
        void cancel(OrderGood o) {}
    }

    // GOOD
    static class Order {
        void validate() {}
        void price() {}
        void cancel() {}
    }

    /* =====================================================
       8. DEPENDENCY CYCLE
       ===================================================== */

    // GOOD: break cycle via abstraction
    interface Billable {
        int amount();
    }

    static class PaymentProcessor {
        void pay(Billable b) {
            // logic
        }
    }

    /* =====================================================
       9. MISUSE-RESISTANT API
       ===================================================== */

    // BAD
    static class MailerBad {
        void sendEmail(UserGood u, boolean isAdmin) {}
    }

    // GOOD
    static class Admin {}

    static class MailerGood {
        void sendEmail(Admin admin) {}
    }

    /* =====================================================
       10. SEMANTICALLY HONEST API
       ===================================================== */

    // BAD
    boolean saveBad() { return true; }

    // GOOD
    void saveGood() throws Exception {}

    static class Result {}
    Result saveBetter() { return new Result(); }
}
