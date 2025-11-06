package poly;
import java.util.HashMap;
import java.util.Map;

public class HdfcBank implements Bank {

    Map<String, Integer> accounts = new HashMap<>();
    int rateOfInterest = 5;

    @Override
    public void openAccount(String accountName, int initialAmount) {
        accounts.put(accountName, initialAmount);

    }

    @Override
    public int getInterest() {
        return rateOfInterest;
    }

    @Override
    public void depositMoney(int money, String accountName) {
        int balance = accounts.get(accountName);
        balance = balance + money;
        accounts.put(accountName, balance);
    }

    @Override
    public int getBalance(String accountName) {
        return accounts.get(accountName);
    }

    @Override
    public int withdrawMoney(int money, String accountName) {
        int balance = accounts.get(accountName);
        balance = balance - money;
        accounts.put(accountName, balance);
        return balance;
    }

    @Override
    public void showAccountDetails(String accountName) {
        System.out.println("Account Name : " + accountName + " Balance : " + accounts.get(accountName) + "");
    }
}
