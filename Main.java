import java.io.*;

class User implements Serializable {
    String name;
    User(String name) {
        this.name = name;
    }
    @Override
    public boolean equals(Object o) {
        if (!(o instanceof user)) return false;
        return this.name.equals(((user) o).name);
    }
}

public class Main {
    public static void main(String[] args) throws Exception {

        user u1 = new user("Nivi");
        user u2 = new user("Nivi");

        System.out.println(u1 == u2);       // false (identity)
        System.out.println(u1.equals(u2));  // true  (state)

        // Serialize
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ObjectOutputStream out = new ObjectOutputStream(bos);
        out.writeObject(u1);

        // Deserialize
        ObjectInputStream in = new ObjectInputStream(
                new ByteArrayInputStream(bos.toByteArray()));
        user u3 = (user) in.readObject();

        System.out.println(u1 == u3);       // false (identity lost)
        System.out.println(u1.equals(u3));  // true  (state preserved)
    }
}
