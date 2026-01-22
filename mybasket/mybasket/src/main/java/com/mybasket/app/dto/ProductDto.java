package com.mybasket.app.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {

    private Long productId;

    @NotBlank(message = "Product title is required")
    @Size(min = 5, message = "Product title must be greater than 5 characters")
    private String title;
    @NotBlank(message = "Product description is required")
    private String description;
    @NotBlank(message = "Product description is required")
    @Size(max = 50,message = "Product short description must be less than 50 characters")
    private String short_description;
    @Min(value = 1, message = "Price of product must be greater than 1")
    private double price;
    private boolean live;
    private boolean outOfStock;
    private String imageUri;


}
