package com.substring.core;

import com.substring.core.concepts.Car;
import com.substring.core.concepts.Engine;
import com.substring.core.concepts.Fuel;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Hello world!
 *
 */
public class App {
    public static void main(String[] args) {
        //assemble
//        Fuel fuel1=new Fuel();
//        Engine bmwEngine1=new Engine(fuel1);
//        Car carSp321=new Car(bmwEngine1);
//        carSp321.startCar();
        //ki bhaiya mujhe chahie fuel object


//        // container
//        ApplicationContext context = new ClassPathXmlApplicationContext("config.xml");
//        Fuel fuel = context.getBean("fuel", Fuel.class);
//        fuel.use();
//
//        Engine engine1 = context.getBean("engine1", Engine.class);
//        engine1.startEngine();
//
//        System.out.println("----------------");
//        Car car1 = context.getBean("car1", Car.class);
//        car1.startCar();

        AnnotationConfigApplicationContext context=new AnnotationConfigApplicationContext(Config.class);

        Fuel fuel = context.getBean("petrolFuel", Fuel.class);
        fuel.use();
        Engine bmwEngine = context.getBean("bmwEngine", Engine.class);
        bmwEngine.startEngine();

        System.out.println("============================");
        Car car = context.getBean("car", Car.class);
        car.startCar();
        System.out.println(car.carName);

        context.registerShutdownHook();

    }
}
