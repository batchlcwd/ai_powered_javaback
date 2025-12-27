package com.mybasket.app.repository;

import com.mybasket.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Integer>
{

}
