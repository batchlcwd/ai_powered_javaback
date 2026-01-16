package com.mybasket.app.controller;


import com.mybasket.app.entity.Product;
import com.mybasket.app.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@Controller
@RestController
@RequestMapping("/products")
public class ProductController {


    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    //Resource : Product

    //to get all products
    //@RequestMapping(method = RequestMethod.GET)
    // @ResponseBody
    @GetMapping
    public List<Product> getProducts() {
        return productService.getAll();
    }

    //get single  product
    //@RequestMapping(value = "/{productId}", method = RequestMethod.GET)
    //@ResponseBody
    //uri path variable
    @GetMapping("/{productId}")
    public Product getSingleProduct(@PathVariable("productId") Long productId) {
        return productService.get(productId);
    }

    // 10 methods
    //create product:
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
//        System.out.println("Product name : "+product.getTitle());
//        System.out.println("Creating product");
        //validations-- actual validations
        Product savedEntity = productService.createProduct(product);
        return new ResponseEntity<>(savedEntity, HttpStatus.CREATED);
    }

    // update  products:
    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable("productId") Long productId, @RequestBody Product product) {
        // fetch the existing product
        Product savedProduct = productService.udpateProduct(productId, product);
        return new ResponseEntity<>(savedProduct, HttpStatus.OK);
    }

    //delete api for product:
    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("productId") Long productId) {
        productService.delete(productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}
