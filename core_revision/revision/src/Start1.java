public class Start1 {
    static void main() {
        System.out.println("second class");

        Shape shape1 = new Shape("Circle");
        shape1.showName();


//        shape1.name="Circle";
        // shape1.setName("Circle");
        System.out.println(shape1.getName());

        Shape shape2 = new Shape();
        shape2.setName("Square");
        System.out.println(shape2.getName());

        Shape shape3 = new Shape();
        shape3.setName("Triangle");
        System.out.println(shape3.getName());


        shape1.showName();
        shape3.showName();
        shape2.showName();
    }
}
