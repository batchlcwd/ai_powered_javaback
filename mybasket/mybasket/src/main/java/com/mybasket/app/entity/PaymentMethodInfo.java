package com.mybasket.app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "my-basket-payment-method-info")
public class PaymentMethodInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private  User user;

    @OneToOne
    private  Payment payment;

    @Embedded
    private UPI upi;

//    private Card card;

//    private NetBanking netBanking;

    @Embedded
    private Cod cod;

}
