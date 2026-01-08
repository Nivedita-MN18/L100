public class oop_rdo {
    public static void main(String[] args) {
        class BankAccount {
            private int balance;

            public BankAccount(int initialBalance) {
                if (initialBalance < 0) {
                    throw new IllegalArgumentException("Invalid initial balance");
                }
                this.balance = initialBalance;
            }

            public void withdraw(int amount) {
                if (amount <= 0 || amount > balance) {
                    throw new IllegalStateException("Invalid withdrawal");
                }
                balance -= amount;
            }

            public int balance() {
                return balance;
            }
        }

    }
}
