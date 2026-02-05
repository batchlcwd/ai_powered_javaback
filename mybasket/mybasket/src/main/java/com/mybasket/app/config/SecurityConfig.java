package com.mybasket.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class SecurityConfig {

    @Bean
    public UserDetailsService userDetailsService() {

        UserDetails user1 = User.builder().username("aditya").password("{noop}abc").build();
        UserDetails user2 = User.builder().username("aman").password("{noop}abc").build();

        return new InMemoryUserDetailsManager(user1,user2);

    }

}
