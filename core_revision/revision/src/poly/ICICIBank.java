package poly;

import java.util.LinkedHashMap;
import java.util.Map;

public class ICICIBank implements Bank {


    Map<String, Integer> accounts = new LinkedHashMap<>();
    int rateOfInterest = 50;

    @Override
    public void openAccount(String accountName, int initialAmount) {
        if (initialAmount < 10000) {
            throw new IllegalArgumentException("Initial amount should be greater than 10000");
        }

        accounts.put(accountName, initialAmount);
    }

    @Override
    public int getInterest() {
        return this.rateOfInterest;
    }

    @Override
    public void depositMoney(int money, String accountName) {
        System.out.println("Deposited " + money + " in account");
        accounts.put(accountName, accounts.get(accountName) + money);
    }

    @Override
    public int getBalance(String accountName) {
        return accounts.get(accountName);
    }

    @Override
    public int withdrawMoney(int money, String accountName) {
        System.out.println("Withdrawn " + money + " from account");
        return accounts.put(accountName, accounts.get(accountName) - money);
    }

    @Override
    public void showAccountDetails(String accountName) {
        System.out.println("Account Name : " + accountName + " Balance : " + accounts.get(accountName) + "");
    }
}
