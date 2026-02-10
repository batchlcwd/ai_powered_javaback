package com.mybasket.app.repository;

import com.mybasket.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Integer>
{
        //username==email
        Optional<User> findByEmail(String username);
}
