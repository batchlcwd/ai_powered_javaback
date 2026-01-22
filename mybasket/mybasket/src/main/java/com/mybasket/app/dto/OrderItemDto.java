package com.mybasket.app.dto;

import com.mybasket.app.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemDto {
    private Long id;
    private Product product;
    private Integer quantity;
    // private Double totalPrice;
}
