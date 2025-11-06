package poly;

public interface Bank {


    void openAccount(String accountName, int initialAmount);

    int getInterest();

    void depositMoney(int money, String accountName);

    int getBalance(String accountName);

    int withdrawMoney(int money, String accountName);

    void showAccountDetails(String accountName);


}
