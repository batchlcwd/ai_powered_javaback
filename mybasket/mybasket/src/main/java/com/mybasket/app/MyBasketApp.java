package com.mybasket.app;

import com.mybasket.app.entity.Product;
import com.mybasket.app.repository.CategoryRepository;
import com.mybasket.app.repository.ProductRepository;
import com.mybasket.app.repository.UserRepository;
import com.mybasket.app.service.UserService;
import org.hibernate.dialect.PostgresPlusDialect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyBasketApp implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    public static void main(String[] args) {
        SpringApplication.run(MyBasketApp.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
//        System.out.println("app started");
//        var user=new User();
//        user.setUserId(12412);
//        user.setName("Abhinav");
//        user.setEmail("abhinav@dev.in");
//        userService.saveUser(user);
//        userRepository.findAll().forEach(item->{
//            IO.println(item.getName());
//        });
//        \\

//        var product1= new Product();
//        product1.setTitle("Iphone 17 pro ");
//        product1.setDescription("this is new iphone.");
//        product1.setShort_description("this is iphone");
//        product1.setLive(true);
//        product1.setPrice(80000);
//        product1.setOutOfStock(false);
//
//        productRepository.save(product1);
//        System.out.println("product saved");


        productRepository.findByProductIdAndTitle(1, "Iphone 17 pro qwrqwtmax")
                .ifPresentOrElse(product -> {
                            System.out.println(product.getTitle() + " : " + product.getPrice());
                        },
                        () -> {
                            System.out.println("Product not found!!");
                        }
                );

        ;

        productRepository.getAllProduct().stream().forEach(product -> {
            System.out.println(product.getTitle());
        });

    }
}
