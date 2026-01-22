package com.mybasket.app.controller;

import com.mybasket.app.dto.CartDto;
import com.mybasket.app.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<CartDto> getCart(@PathVariable Integer userId) {
        CartDto cartDto = cartService.getCart(userId);
        return new ResponseEntity<>(cartDto, HttpStatus.OK);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<CartDto> addToCart(@PathVariable Integer userId, @RequestBody Map<String, Object> request) {
        // Simplifying request body for basics. Expecting { "productId": 1, "quantity":
        // 2 }
        LongOrInteger productIdRaw = new LongOrInteger(request.get("productId"));
        Long productId = productIdRaw.toLong();

        Integer quantity = (Integer) request.get("quantity");

        if (quantity == null)
            quantity = 1;

        CartDto cartDto = cartService.addToCart(userId, productId, quantity);
        return new ResponseEntity<>(cartDto, HttpStatus.CREATED);
    }

    // Helper class or method to handle potential Integer vs Long issues from JSON
    private static class LongOrInteger {
        Object value;

        LongOrInteger(Object value) {
            this.value = value;
        }

        Long toLong() {
            if (value instanceof Integer)
                return ((Integer) value).longValue();
            if (value instanceof Long)
                return (Long) value;
            if (value instanceof String)
                return Long.parseLong((String) value);
            throw new IllegalArgumentException("Invalid product id type");
        }
    }
}
