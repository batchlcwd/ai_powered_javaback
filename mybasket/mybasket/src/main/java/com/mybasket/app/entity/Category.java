package com.mybasket.app.entity;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "my-basket-category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private  String imageUrl;

    @ManyToMany(mappedBy = "categories")
    private Set<Product> products=new LinkedHashSet<>();
}
