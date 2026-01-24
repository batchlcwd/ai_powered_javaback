package com.mybasket.app.service;

import com.mybasket.app.dto.PageResponse;
import com.mybasket.app.dto.ProductDto;
import com.mybasket.app.entity.Product;
import org.springframework.data.domain.Page;


import java.util.List;

public interface ProductService {



    ProductDto createProduct(ProductDto product);
    //update the product
    Product udpateProduct(Long productId, Product product);

    PageResponse<Product> getAll(int page, int size, String sortBy, String sortDir);
    Product get(Long productId);

    void delete(Long productId);
}
