public class Shape
{
    private String name;
    //n number of variables

    public Shape(){
        System.out.println("Creating a shape");
    }

    public Shape(String name){

        if(name==null || name.isEmpty()){
            throw new IllegalArgumentException("name cannot be empty");
        }

        System.out.println("Creating a shape with name : "+name);
        this.name=name;
    }



    //getter
    public String getName() {
        //check if name is null or empty
        return name;
    }

    //setter
    public void setName(String name) {
        //check if name is null or empty
        this.name = name;
    }


    void showName(){
        System.out.println("The name of the shape is : "+name);
    }
}
