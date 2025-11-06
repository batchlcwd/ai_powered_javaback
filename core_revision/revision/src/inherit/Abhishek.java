package inherit;

public class Abhishek extends BigB {
    int x;

    Abhishek(int x, int parentX){
        //parent ka constructor call
        super(parentX);
        System.out.println("Abhishek constructor");
        this.x=x;

    }

    void showDetails() {
        System.out.println("Abhishek x : " + this.x);
        System.out.println("BigB x : " + super.x);
    }
}
