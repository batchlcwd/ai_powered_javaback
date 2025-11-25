package com.substring.core.concepts;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Car implements InitializingBean, DisposableBean
{

    //car is dependent on engine
    Engine engine;
    public String carName;

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

    //    init()
    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("car bean is initializing.....init()");
        System.out.println(this.engine);
        this.carName="Tata Safari";
    }

    //destroy()

    @Override
    public void destroy() throws Exception {
        System.out.println("car cleanup");
        this.carName=null;
    }



    //initialization
//    public void init(){
//
//    }

}
