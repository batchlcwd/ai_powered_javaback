package com.mybasket.app.service;

import com.mybasket.app.dto.CartDto;

public interface CartService {
    CartDto getCart(Integer userId);
    CartDto addToCart(Integer userId, Long productId, int quantity);
}
