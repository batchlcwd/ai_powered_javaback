package com.web.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
public class AppConfig {
//
//    @Bean
//    public HandlerMapping handlerMapping(){
//        var handlerMapping=  new RequestMappingHandlerMapping();
//        handlerMapping.se
//
//        return handlerMapping;
//    }

    @Bean
    public ViewResolver viewResolver(){
        var viewResolver=new InternalResourceViewResolver();
        viewResolver.setPrefix("/WEB-INF/views/");
        viewResolver.setSuffix(".html");
        return viewResolver;
    }
}
