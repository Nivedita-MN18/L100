class OrderBad {
    boolean paid;
    boolean shipped;
    boolean cancelled;

    void ship() {
        if (!paid || cancelled) {
            throw new IllegalStateException("Cannot ship");
        }
        shipped = true;
    }
}

public class state_explosion {
    public static void main(String[] args) {
        OrderBad order = new OrderBad();

        order.ship(); // bug - shipped before paid
        // order.paid = true;
        // order.cancelled = true;

    }
}
