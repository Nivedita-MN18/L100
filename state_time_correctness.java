// Covers: State, Time, Temporal Coupling, TOCTOU, Invariants,
// Preconditions, Postconditions, Born-Valid, Escaping this,
// State Machines, State Explosion

public class state_time_correctness {
    // bad code because behavior depends on execution order
    static class CounterBad {
        int value = 0;

        void increment() {
            value++; // state mutation introduces time
        }

        int get() {
            return value;
        }
    }

    // GOOD: immutable snapshot
    static final class CounterGood {
        private final int value;

        CounterGood(int value) {
            this.value = value;
        }

        CounterGood incremented() {
            return new CounterGood(value + 1);
        }
    }


    // BAD: correctness depends on call order
    static class ResourceBad {
        boolean initialized;

        void init() {
            initialized = true;
        }

        void use() {
            if (!initialized) throw new IllegalStateException();
            // logic
        }
    }

    // GOOD: born valid
    static class ResourceGood {
        ResourceGood() {
            // all invariants established
        }

        void use() {
            // safe
        }
    }

    /* tactou */

    // bad code : check and use separated in time
    static class Account {
        int balance;
        int getBalance() {
            return balance;
        }
        void withdraw(int amount) {
            balance -= amount; // invariant not enforced
        }
    }
    // good code- invariant enforced atomically
    static class Account2 {
        private int balance;

        Account2(int initial) {
            if (initial < 0) throw new IllegalArgumentException();
            balance = initial;
        }

        void withdraw(int amount) {
            if (amount <= 0) throw new IllegalArgumentException();
            if (balance < amount) throw new IllegalStateException();
            balance -= amount;
        }
    }

    /* =====================================================
       4. INVARIANTS / PRE / POST
       ===================================================== */

    // BAD: assumed invariant
    static class BalanceBad {
        int balance;

        void setBalance(int b) {
            balance = b; // invariant broken by caller
        }
    }

    // GOOD: enforced invariant
    static class BalanceGood {
        private int balance;

        BalanceGood(int initial) {
            if (initial < 0) throw new IllegalArgumentException();
            balance = initial;
        }

        void withdraw(int amount) {
            // precondition: amount > 0
            // postcondition: balance decreases
            // invariant: balance >= 0
            // logic
        }
    }

    /* =====================================================
       5. BORN VALID / PARTIAL CONSTRUCTION
       ===================================================== */

    // BAD
    static class UserBad {
        String email;
        String role;

        UserBad() {}

        void setEmail(String e) { email = e; }
        void setRole(String r) { role = r; }
    }

    // GOOD
    static class UserGood {
        final String email;
        final String role;

        UserGood(String email, String role) {
            if (email == null || role == null) throw new IllegalArgumentException();
            this.email = email;
            this.role = role;
        }
    }

    /* =====================================================
       6. ESCAPING this
       ===================================================== */

    // BAD
    static class EscapingThisBad {
        EscapingThisBad(EventBus bus) {
            bus.register(this); // this escapes
        }
    }

    // GOOD
    static class EscapingThisGood {
        private EscapingThisGood() {}

        static EscapingThisGood create(EventBus bus) {
            EscapingThisGood obj = new EscapingThisGood();
            bus.register(obj);
            return obj;
        }
    }

    /* =====================================================
       7. STATE MACHINES & STATE EXPLOSION
       ===================================================== */

    // BAD: state explosion
    static class OrderBad {
        boolean paid;
        boolean shipped;
    }

    // GOOD: explicit state
    enum OrderState { CREATED, PAID, SHIPPED }

    static class OrderGood {
        private OrderState state = OrderState.CREATED;

        void pay() {
            if (state != OrderState.CREATED) throw new IllegalStateException();
            state = OrderState.PAID;
        }

        void ship() {
            if (state != OrderState.PAID) throw new IllegalStateException();
            state = OrderState.SHIPPED;
        }
    }

    // Dummy infra
    static class EventBus {
        void register(Object o) {}
    }
}
