package com.mybasket.app.repository;

import com.mybasket.app.entity.Cart;
import com.mybasket.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}
