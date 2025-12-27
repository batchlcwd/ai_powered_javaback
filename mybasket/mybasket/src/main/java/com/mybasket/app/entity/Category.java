package com.mybasket.app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "my-basket-category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private  String imageUrl;
}
