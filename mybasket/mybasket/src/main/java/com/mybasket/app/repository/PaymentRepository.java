package com.mybasket.app.repository;

import com.mybasket.app.entity.Payment;
import com.mybasket.app.entity.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Long> {
}
