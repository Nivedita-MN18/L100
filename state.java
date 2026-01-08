class Order {
    boolean paid;
    boolean invoiceGenerated;
    boolean isValid() {
        return !invoiceGenerated || paid;
    }
}
public class state {
    public static void main(String[] args) {
        Order order = new Order();
        order.paid = false;
        order.invoiceGenerated = true;
        System.out.println(order.isValid()); // false
    }
}
