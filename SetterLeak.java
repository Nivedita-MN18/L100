class Order2 {
    boolean paid;
    boolean shipped;

    void setPaid(boolean paid) {
        this.paid = paid;
    }
    void setShipped(boolean shipped) {
        this.shipped = shipped;
    }
}
public class SetterLeak {
    public static void main(String[] args) {
        Order2 o = new Order2();
        o.setShipped(true); // illegal but allowed
    }
}
