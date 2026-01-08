// state-time-demo.ts
// Complete coverage, bad vs good

/* ================================
   1. STATE & TIME
   ================================ */
//bad code`
class counter {
    private value = 0;
    increment() {
        this.value++; // time enters
    }
    get() {
        return this.value;
    }
}
//good code
class counter2 {
    constructor(private readonly value: number) {}

    incremented(): counter2 {
        return new counter2(this.value + 1);
    }
}

/* ================================
   2. TEMPORAL COUPLING
   ================================ */

class ResourceBad {
    private initialized = false;

    init() {
        this.initialized = true;
    }

    use() {
        if (!this.initialized) throw new Error();
        // logic
    }
}

class ResourceGood {
    constructor() {
        // born valid
    }

    use() {
        // safe
    }
}

/* tactou */
//bad code
class Account {
    balance = 0;
}
//good code
class Account2 {
    private balance: number;

    constructor(initial: number) {
        if (initial < 0) throw new Error();
        this.balance = initial;
    }
    withdraw(amount: number) {
        if (amount <= 0) throw new Error();
        if (this.balance < amount) throw new Error();
        this.balance -= amount;
    }
}

/* ================================
   4. INVARIANTS
   ================================ */

class BalanceBad {
    balance = 0;

    setBalance(b: number) {
        this.balance = b;
    }
}

class BalanceGood {
    private balance: number;

    constructor(b: number) {
        if (b < 0) throw new Error();
        this.balance = b;
    }
}

/* ================================
   5. PARTIAL CONSTRUCTION
   ================================ */

class UserBad {
    email?: string;
    role?: string;
}

class UserGood {
    constructor(
        public readonly email: string,
        public readonly role: string
    ) {
        if (!email || !role) throw new Error();
    }
}

/* ================================
   6. STATE MACHINES
   ================================ */

type OrderState = "CREATED" | "PAID" | "SHIPPED";

class OrderGood {
    private state: OrderState = "CREATED";

    pay() {
        if (this.state !== "CREATED") throw new Error();
        this.state = "PAID";
    }

    ship() {
        if (this.state !== "PAID") throw new Error();
        this.state = "SHIPPED";
    }
}
