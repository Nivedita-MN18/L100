class SmsSender {
    void send(String msg) {
        System.out.println("SMS: " + msg);
    }
}

class NotificationService {
    private final SmsSender sender;

    NotificationService(SmsSender sender) {
        this.sender = sender;
    }

    void notifyUser(String msg) {
        sender.send(msg); // delegation
    }
}

public class composition_delegation {
    public static void main(String[] args) {
        NotificationService n =
                new NotificationService(new SmsSender());
        n.notifyUser("Hello");
    }
}
