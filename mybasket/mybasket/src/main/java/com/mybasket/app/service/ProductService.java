package com.mybasket.app.service;

import com.mybasket.app.dto.ProductDto;
import com.mybasket.app.entity.Product;

import java.util.List;

public interface ProductService {



    ProductDto createProduct(ProductDto product);
    //update the product
    Product udpateProduct(Long productId, Product product);

    List<Product> getAll();
    Product get(Long productId);

    void delete(Long productId);
}
