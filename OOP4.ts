// encapsulation-demo.ts

/* INFORMATION HIDING ≠ ENCAPSULATION
    */
class User {                             //bad code
    private active = false;
    private role = "USER";
    setActive(a: boolean) {
        this.active = a;}
    setRole(r: string) {
        this.role = r;
    }}
//good code
class user2 {
    private active = false;
    private role: "USER" | "ADMIN" = "USER";
    activate() {
        this.active = true;}
    promoteAdmin() {
        if (!this.active) throw new Error();
        this.role = "ADMIN";}}

/* ================================
   2. SETTERS
   ================================ */

class AccountBad {
    balance = 0;
    setBalance(b: number) {
        this.balance = b;
    }
}

class AccountGood {
    private balance: number;

    constructor(b: number) {
        if (b < 0) throw new Error();
        this.balance = b;
    }
}

/* ================================
   3. ASK, DON'T INSPECT
   ================================ */

class Order {
    private state: "CREATED" | "PAID" | "SHIPPED" = "CREATED";

    isShippable(): boolean {
        return this.state === "PAID";
    }

    ship() {
        // logic
    }
}

/* ================================
   4. GOD OBJECT
   ================================ */

class OrderManager {
    cancel(order: Order) {}
}

class ProperOrder {
    cancel() {}
}

/* ================================
   5. MISUSE-RESISTANT API
   ================================ */

class Admin {}

class Mailer {
    sendEmail(admin: Admin) {}
}

/* ================================
   6. SEMANTICALLY HONEST API
   ================================ */

function saveBad(): boolean {
    return true;
}

function saveGood(): void {
    throw new Error();
}

type Result = { ok: boolean };
function saveBest(): Result {
    return { ok: true };
}
