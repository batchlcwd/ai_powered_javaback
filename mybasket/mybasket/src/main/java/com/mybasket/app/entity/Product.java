package com.mybasket.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "my-basket-products")
@Getter
@Setter
public class Product extends  BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long productId;


    private  String title;
    private  String description;
    private  String short_description;
    private  double price;
    private  boolean live;
    private  boolean outOfStock;


    @OneToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL,orphanRemoval = true)
    private  FileMetaData image;


    @ManyToMany
    private Set<Category> categories=new LinkedHashSet<>();


}
