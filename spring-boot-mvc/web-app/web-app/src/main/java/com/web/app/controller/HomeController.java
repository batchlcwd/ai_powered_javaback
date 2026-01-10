package com.web.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class HomeController {


    @RequestMapping(value = "/",produces = "text/html")
//    @ResponseBody
    public String home(Model model) {
        System.out.println("your request is processing...");
        //logics

        //database
        //spring-jdbc
        //spring-data-jpa
        //string,integer,double,object, list, set
        String brandName="Substring Spring Tutorials";
        String tagline="learn code by doing it";
        model.addAttribute("brandName",brandName);
        model.addAttribute("tagline",tagline);


        return "home";
    }

    @RequestMapping("/about")
//    @ResponseBody
    public String about() {
        System.out.println("your about request is processing");
        return "about";
    }


    @RequestMapping("/services")
//    @ResponseBody
    public String services() {
        System.out.println("your services request is processing");
        return "services";
    }

}
