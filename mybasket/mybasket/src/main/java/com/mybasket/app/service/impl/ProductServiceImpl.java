package com.mybasket.app.service.impl;

import com.mybasket.app.entity.Product;
import com.mybasket.app.repository.ProductRepository;
import com.mybasket.app.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;


    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product udpateProduct(Long productId, Product product) {
        var oldProduct = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found in db"));
        oldProduct.setTitle(product.getTitle());
        oldProduct.setDescription(product.getDescription());
        oldProduct.setShort_description(product.getShort_description());
        oldProduct.setPrice(product.getPrice());
        oldProduct.setLive(product.isLive());
        oldProduct.setOutOfStock(product.isOutOfStock());
        oldProduct.setImageUri(product.getImageUri());
        return productRepository.save(oldProduct);

    }

    @Override
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @Override
    public Product get(Long productId) {
        return productRepository.findById(productId).orElseThrow(() -> new RuntimeException("product not found !!"));
    }

    @Override
    public void delete(Long productId) {
        var product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("product not found !!"));
        productRepository.delete(product);
    }
}
