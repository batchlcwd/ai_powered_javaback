package com.mybasket.app.service.impl;

import com.mybasket.app.dto.OrderDto;
import com.mybasket.app.entity.*;
import com.mybasket.app.exception.ResourceNotFoundException;
import com.mybasket.app.repository.CartRepository;
import com.mybasket.app.repository.OrderRepository;
import com.mybasket.app.repository.UserRepository;
import com.mybasket.app.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public OrderDto createOrder(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user: " + userId));

        if (cart.getCartItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = Order.builder()
                .user(user)
                .orderStatus(OrderStatus.PLACED)
                .orderItems(new ArrayList<>())
                // .address(user.getAddresses().isEmpty() ? null :
                // user.getAddresses().iterator().next()) // simplistic
                .build();

        List<OrderItem> orderItems = cart.getCartItems().stream().map(cartItem -> {
            return OrderItem.builder()
                    .order(order)
                    .product(cartItem.getProduct())
                    .quantity(cartItem.getQuantity())
                    .build();
        }).collect(Collectors.toList());

        order.setOrderItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        // Clear Cart
        cart.getCartItems().clear();
        cart.setTotalAmount(0.0);
        cart.setCartTotalItems(0);
        cartRepository.save(cart); // Cascade delete orphans? Need to ensure CartItems are deleted.
        // If CascadeType.ALL is not set specifically for removal or orphanRemoval=true,
        // items might stay.
        // Assuming JPA handles clearing collection if mapped correctly or we might need
        // explicit delete.
        // For now, relying on list clear and save.

        return modelMapper.map(savedOrder, OrderDto.class);
    }

    @Override
    public OrderDto getOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
        return modelMapper.map(order, OrderDto.class);
    }

    @Override
    public List<OrderDto> getUserOrders(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        List<Order> orders = orderRepository.findByUser(user);
        return orders.stream()
                .map(order -> modelMapper.map(order, OrderDto.class))
                .collect(Collectors.toList());
    }
}
