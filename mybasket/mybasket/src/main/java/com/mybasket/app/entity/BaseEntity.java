package com.mybasket.app.entity;


import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners({AuditingEntityListener.class})
public abstract class BaseEntity {

    @Column(nullable = false)
    private  boolean deleted=false;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createAt;


    @LastModifiedDate
    private  LocalDateTime updatedAt;
}
