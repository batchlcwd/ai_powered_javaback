package com.mybasket.app.repository;

import com.mybasket.app.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.jpa.repository.Query;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    //custom method/1. query methods
    //implementation of these methods are automatically done by framework.
    List<Product> findByTitleIgnoreCase(String title);

    List<Product> findByLive(boolean live);

    List<Product> findByOutOfStock(boolean outOfSock);

    Optional<Product> findByProductIdAndTitle(long productId, String title);

    boolean existsByTitle(String title);

    //2.query methods:


    //JPQL-Jakarta persistent query language

    @Query("Select p from Product p")
    List<Product> getAllProduct();

    @Query("Select p from Product p where p.productId= ?1 and p.price = ?2")
    Product getProductByTitle(String title, double price);

}
