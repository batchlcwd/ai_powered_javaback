package com.mybasket.app.config;

import ch.qos.logback.core.joran.spi.HttpUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

//    @Bean
//    public UserDetailsService userDetailsService() {
//
//        UserDetails user1 = User.builder().username("aditya").password("{noop}abc").build();
//        UserDetails user2 = User.builder().username("aman").password("{noop}abc").build();
//
//        return new InMemoryUserDetailsManager(user1,user2);
//
//    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) {

        //customization:

        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        requests ->
//                                requests.requestMatchers(HttpMethod.GET).permitAll()
//                                        .requestMatchers(HttpMethod.POST).hasRole("NORMAL")
//                                        .requestMatchers(HttpMethod.PUT).hasRole("ADMIN")
//                                        .requestMatchers(HttpMethod.DELETE).hasRole("ADMIN")
                                requests.anyRequest().permitAll()

                )
                .formLogin(Customizer.withDefaults())
                .httpBasic(Customizer.withDefaults())

        ;


        return httpSecurity.build();
    }

//    @Bean
//    public PasswordEncoder encoder(){
//        reutrn
//    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


}
