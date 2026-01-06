package com.mybasket.app.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "my-basket-users")
public class User {

    @Id
    @Column(name = "jpa_user_id")
    private int userId;

    private String name;

    @Column(unique = true, length = 100)
    private String email;

    private String password;

    private String userImageUrl;


    //this field will create new table :
    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL

    )
    private Set<Address> addresses = new HashSet<>();


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
