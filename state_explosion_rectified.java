enum OrderState {
    CREATED, PAID, SHIPPED, CANCELLED
}
class Order3 {
    private OrderState state = OrderState.CREATED;
    void pay() {
        if (state != OrderState.CREATED) {
            throw new IllegalStateException("Payment not allowed");
        }
        state = OrderState.PAID;
    }
    void ship() {
        if (state != OrderState.PAID) {
            throw new IllegalStateException("Shipping not allowed");
        }
        state = OrderState.SHIPPED;
    }
    void cancel() {
        if (state == OrderState.SHIPPED) {
            throw new IllegalStateException("Already shipped");
        }
        state = OrderState.CANCELLED;
    }
    OrderState getState() {
        return state;
    }
}
public class state_explosion_rectified {
    public static void main(String[] args) {
        Order3 order3 = new Order3();
        order3.pay();
        order3.ship();
        System.out.println(order3.getState()); // SHIPPED
    }
}
