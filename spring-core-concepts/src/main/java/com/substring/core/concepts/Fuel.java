package com.substring.core.concepts;

import org.springframework.stereotype.Component;

@Component("petrolFuel")
public class Fuel {
    public void use() {
        System.out.println("using petrol");
    }
}
