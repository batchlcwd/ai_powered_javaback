package com.mybasket.app.dto;

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
public class CartDto {
    private Long id;
    private int cartTotalItems;
    private Double totalAmount;
    private UserDto user;
    private List<CartItemDto> cartItems = new ArrayList<>();
}
