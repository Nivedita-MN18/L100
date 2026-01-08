class Logger {
    void log(int x) {
        System.out.println("int log");
    }

    void log(String s) {
        System.out.println("string log");
    }
}

public class dispatch {
    public static void main(String[] args) {
        Logger l = new Logger();
        l.log("hello"); // chosen at compile time
    }
}
