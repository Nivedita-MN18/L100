public class Main2 {
    public static void main(String[] args) {
        User2 a = new User2();
        User2 b = a;

        System.out.println(a == b); // true
    }
}

class User2 {}
