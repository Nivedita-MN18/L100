class Account {
    protected int balance;

    Account(int balance) {
        if (balance < 0) throw new IllegalArgumentException();
        this.balance = balance;
    }

    void withdraw(int amt) {
        if (amt > balance) throw new IllegalStateException();
        balance -= amt;
    }
}

class CreditAccount extends Account {
    CreditAccount(int b) {
        super(b);
    }

    @Override
    void withdraw(int amt) {
        balance -= amt; // allows negative
    }
}

public class invariance_breaking {
    public static void main(String[] args) {
        Account acc = new CreditAccount(100);
        acc.withdraw(300);
        System.out.println(acc.balance); // -200 (silent bug)

    }
}

