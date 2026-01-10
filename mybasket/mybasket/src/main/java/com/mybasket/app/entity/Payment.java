package com.mybasket.app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "my-basket-payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @OneToOne
    @JoinColumn(name = "order_id")
    private  Order order;


    @Enumerated(EnumType.STRING)
    private  PaymentStatus status=PaymentStatus.PENDING;

    @Enumerated
    private  PaymentMethod method=PaymentMethod.COD;


    @OneToOne(mappedBy = "payment")
    private  PaymentMethodInfo paymentMethodInfo;




}
