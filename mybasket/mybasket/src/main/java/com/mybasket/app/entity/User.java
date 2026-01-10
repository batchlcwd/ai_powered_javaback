package com.mybasket.app.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;


import java.util.*;

@Entity
@Table(name = "my-basket-users")
@SQLDelete(sql = "update `my-basket-users` SET deleted = true WHERE jpa_user_id = ?")
@SQLRestriction("deleted = false")

public class User  extends  BaseEntity{

    @Id
    @Column(name = "jpa_user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    private String name;

    @Column(unique = true, length = 100)
    private String email;

    private String password;

    private String userImageUrl;


    //this field will create new table :
    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER


    )
    private Set<Address> addresses = new HashSet<>();

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
    private  Set<PaymentMethodInfo> paymentMethodInfos=new LinkedHashSet<>();


    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserImageUrl() {
        return userImageUrl;
    }

    public void setUserImageUrl(String userImageUrl) {
        this.userImageUrl = userImageUrl;
    }
}
