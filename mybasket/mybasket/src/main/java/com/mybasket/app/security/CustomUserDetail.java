package com.mybasket.app.security;

import com.mybasket.app.entity.User;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


public class CustomUserDetail implements UserDetails {

    //apke user ki information
    private User user;

    public CustomUserDetail(User user) {
        this.user = user;
    }


    // role based authentication:
    //

    /*

    // ecommerce project
        POST --> /products: ROLE_ADMIN

        GET --> /products: ROLE_USER

        DELETE--> /products/{productid}  : ROLE_ADMIN







        user---> role_admin----> create product, delete product, update product



        //college system

        POST---> /mark-attendance : ROLE_HOD
        POST --> /submit-assignment :ROLE_STUDENT

     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        //override this methods: to available the authorities to framework
//        ROLE role = user.getRole();
//        Collection roleCollection= new ArrayList();
//        roleCollection.add(new SimpleGrantedAuthority(role.toString()));
//        return roleCollection;
        return List.of(new SimpleGrantedAuthority(user.getRole().toString()));
    }

    @Override
    public @Nullable String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        //logic : username, email,
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return user.isEnable();
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
