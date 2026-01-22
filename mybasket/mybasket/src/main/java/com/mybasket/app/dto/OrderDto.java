package com.mybasket.app.dto;

import com.mybasket.app.entity.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDto {
    private Long id;
    private UserDto user;
    private OrderStatus orderStatus;
    // private PaymentStatus paymentStatus;
    // private Date orderDate;
    private List<OrderItemDto> orderItems = new ArrayList<>();
    // private Double orderAmount;
}
