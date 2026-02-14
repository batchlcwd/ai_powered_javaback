package com.mybasket.app.security;

import com.mybasket.app.exception.ResourceNotFoundException;
import com.mybasket.app.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.MalformedURLException;
import java.security.SignatureException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final ModelMapper modelMapper = new ModelMapper();

    private Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {


//        bearer asddgoajgpgj

        String header = request.getHeader("Authorization");

        logger.debug(header);


        //if this condition we be true:
        if (header != null && header.startsWith("Bearer")) {

            //logics
            //security inform karna hai :
//            asddgoajgpgj
            String token = header.substring(7);

            try {


                if (!jwtService.isAccessToken(token)) {
                    System.out.println("Token is not access Token");
                    filterChain.doFilter(request, response);
                    return;
                }

                //parse ne token varify
                Jws<Claims> parsedData = jwtService.parse(token);
                Claims payload = parsedData.getPayload();
                String userId = payload.getSubject();
                var user = userRepository.findById(Integer.parseInt(userId)).orElseThrow(() -> new ResourceNotFoundException("User not found!!"));
                if (user.isEnable()) {

                    ROLE role = user.getRole();
                    List<GrantedAuthority> authorities = role == null ? List.of() : List.of(new SimpleGrantedAuthority(role.toString()));


                    var authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), null, authorities);

                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    if (SecurityContextHolder.getContext().getAuthentication() == null) {
                        //setting authentication in security
                        logger.debug("setting authentication to security");
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }


            } catch (ExpiredJwtException ex) {
                ex.printStackTrace();
            } catch (MalformedJwtException ex) {
                ex.printStackTrace();
            }  catch (Exception e) {
                e.printStackTrace();
            }


        }


        //forward the request
        filterChain.doFilter(request, response);


    }
}
