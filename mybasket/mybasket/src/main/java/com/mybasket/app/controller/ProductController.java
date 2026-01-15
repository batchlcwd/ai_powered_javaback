package com.mybasket.app.controller;


import com.mybasket.app.entity.Product;
import com.mybasket.app.repository.ProductRepository;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@Controller
@RestController
@RequestMapping("/products")
public class ProductController {


    private ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    //Resource : Product

    //to get all products
//    @RequestMapping(method = RequestMethod.GET)
//    @ResponseBody
    @GetMapping
    public List<Product> getProducts() {
        List<Product> all = productRepository.findAll();
        return all;
    }

    //get single  product
//    @RequestMapping(value = "/{productId}", method = RequestMethod.GET)
//    @ResponseBody
    @GetMapping("/{productId}")
    public Product getSingleProduct(@PathVariable("productId") Long productId){
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("product not found !!"));
        return product;
    }

//    10 methods


}
