class user {
    private String role;
    private boolean active;

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

class UserService {
    void promote(user u) {
        if (!u.isActive()) {
            throw new IllegalStateException("Inactive user");
        }
        u.setRole("ADMIN");
    }
}
public class oop{
public static void main(String[] args) {
    user u = new user();
    u.setActive(true);

// Thread 1
    new Thread(() -> {
        u.setActive(false);
    }).start();

// Thread 2
    new Thread(() -> {
        if (u.isActive()) {
            u.setRole("ADMIN");
        }
    }).start();

}}

