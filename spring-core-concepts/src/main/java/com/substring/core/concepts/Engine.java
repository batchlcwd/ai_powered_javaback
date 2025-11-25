package com.substring.core.concepts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component("bmwEngine")
public class Engine {

    //engine will depend on fuel


    private Fuel fuel;


    @Autowired
    public Engine( Fuel fuel) {
        this.fuel = fuel;
    }

    public Engine() {
        System.out.println("engine creating with default constructor");
    }


    public Fuel getFuel() {
        return fuel;
    }




    public void setFuel(Fuel fuel) {
        System.out.println("setting fuel to engine");
        this.fuel = fuel;
    }

    public  void startEngine(){
        fuel.use();
        System.out.println("Engine started...");
    }
}
