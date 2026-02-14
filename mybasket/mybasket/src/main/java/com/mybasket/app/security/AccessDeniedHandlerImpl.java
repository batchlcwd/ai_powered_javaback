package com.mybasket.app.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.Map;

@Component
public class AccessDeniedHandlerImpl implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        //
        String message= accessDeniedException.getMessage();

        var errorMap= Map.of(
                "message","You dont have permission to perform this operation : "+message,
                "success",false
        );

        ObjectMapper objectMapper = new ObjectMapper();
        String stringResponse = objectMapper.writeValueAsString(errorMap);
        response.setStatus(403);
        response.setContentType("application/json");
        System.out.println(stringResponse);
        response.getWriter().write(stringResponse);


    }
}
