package poly;

public class MainBank {
    static void main() {
        Bank hdfc = new HdfcBank();
        //
        hdfc.openAccount("om_prakash", 1000);
        hdfc.showAccountDetails("om_prakash");
        hdfc.depositMoney(1326,"om_prakash");
        hdfc.showAccountDetails("om_prakash");
        hdfc.withdrawMoney(100,"om_prakash");
        hdfc.showAccountDetails("om_prakash");


        hdfc.openAccount("arbaz",10000);
        hdfc.showAccountDetails("arbaz");
        hdfc.depositMoney(50000,"arbaz");
        hdfc.showAccountDetails("arbaz");

        System.out.println("---------------");
        Bank icici = new ICICIBank();
        icici.openAccount("chandan", 10000);
        icici.showAccountDetails("chandan");
        icici.depositMoney(50000,"chandan");
        icici.showAccountDetails("chandan");


    }
}
