package com.mybasket.app;

import com.mybasket.app.entity.User;
import com.mybasket.app.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MyBasketAppTests {


    @Autowired
    private UserRepository userRepository;

    @Test
    public void OrphanTest(){
//        System.out.println("Testing ");
//        userRepository.findAll().stream().forEach(user->{
//            System.out.println(user.getName()+" : "+user.getAddresses().size());
//        });

//        User user = userRepository.findById(1).get();
//        System.out.println("user name is "+user.getName());
//        user.getAddresses().clear();
//        userRepository.save(user);
//        System.out.println("ok done.");
//

    }

}
