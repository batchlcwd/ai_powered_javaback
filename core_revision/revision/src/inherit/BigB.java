package inherit;

public class BigB {
    int x=50;
    public  BigB(int parentX){

        System.out.println("BigB constructor");
        this.x=parentX;
    }

    void showDetails(){
        System.out.println("x is "+x);
    }
}
