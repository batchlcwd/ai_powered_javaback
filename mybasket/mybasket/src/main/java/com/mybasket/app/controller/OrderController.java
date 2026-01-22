package com.mybasket.app.controller;

import com.mybasket.app.dto.OrderDto;
import com.mybasket.app.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // Create order from cart
    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestBody Map<String, Object> request) {
        // Expecting { "userId": 1 }
        Integer userId = (Integer) request.get("userId");
        if (userId == null) {
            throw new IllegalArgumentException("userId is required");
        }
        OrderDto orderDto = orderService.createOrder(userId);
        return new ResponseEntity<>(orderDto, HttpStatus.CREATED);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDto> getOrder(@PathVariable Long orderId) {
        OrderDto orderDto = orderService.getOrder(orderId);
        return new ResponseEntity<>(orderDto, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDto>> getUserOrders(@PathVariable Integer userId) {
        List<OrderDto> orders = orderService.getUserOrders(userId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
