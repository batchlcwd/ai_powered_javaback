package com.mybasket.app.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.Map;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {



    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        //
        String message= authException.getMessage();

        var errorMap= Map.of(
                "message","Login and generate token first: "+message,
                "success",false
        );

        ObjectMapper objectMapper = new ObjectMapper();
        String stringResponse = objectMapper.writeValueAsString(errorMap);
        response.setStatus(401);
        response.setContentType("application/json");
        System.out.println(stringResponse);
        response.getWriter().write(stringResponse);


    }
}
