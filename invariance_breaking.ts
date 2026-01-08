class Order {
    protected paid = false;

    ship() {
        if (!this.paid) throw new Error("Not paid");
        console.log("Shipped");
    }
}

class TestOrder extends Order {
    ship() {
        console.log("Shipped"); // rule skipped
    }
}

const o: Order = new TestOrder();
o.ship(); // wrong behavior
