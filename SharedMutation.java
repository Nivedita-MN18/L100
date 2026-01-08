import java.util.*;
class User3 {
    String role;
    User3(String role) { this.role = role; }
}
public class SharedMutation {
    public static void main(String[] args) {
        Map<Integer, User3> cache = new HashMap<>();
        User3 u = new User3("USER");
        cache.put(1, u);
        u.role = "ADMIN";
        System.out.println(cache.get(1).role); // ADMIN
    }
}
