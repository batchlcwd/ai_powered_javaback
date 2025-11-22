package com.substring.core.concepts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Car
{

    //car is dependent on engine
    Engine engine;

    public Car(Engine engine) {
        this.engine = engine;
    }

    public Car() {
    }

    public Engine getEngine() {
        return engine;
    }

    @Autowired
    public void setEngine(Engine engine) {
        this.engine = engine;
    }

    public void startCar(){
        //engine start karna hai apan ko
        System.out.println("car is starting..");
        engine.startEngine();
        System.out.println("card started..");

    }
}
