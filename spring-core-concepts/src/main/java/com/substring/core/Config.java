package com.substring.core;

import com.substring.core.concepts.Student;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages ={"com.substring"} )
public class Config
{

    //usecase-- predefined classses

    //DataSource
    @Bean(name = "student1")
    public Student getStudent(){
        //manually bean....
        return new Student();
    }


}
