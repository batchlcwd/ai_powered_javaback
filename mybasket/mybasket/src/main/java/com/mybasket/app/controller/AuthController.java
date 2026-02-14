package com.mybasket.app.controller;


import com.mybasket.app.dto.LoginRequest;
import com.mybasket.app.dto.TokenResponse;
import com.mybasket.app.dto.UserDto;
import com.mybasket.app.entity.User;
import com.mybasket.app.exception.ResourceNotFoundException;
import com.mybasket.app.repository.UserRepository;
import com.mybasket.app.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.hibernate.query.sql.internal.ParameterRecognizerImpl;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    //api for generating token: login

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private  final ModelMapper modelMapper;

    private  final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> generateToken(
            @RequestBody LoginRequest loginRequest
    ) {

        //email id and password
        try {

            //created the obeject of auhtentication[username, password]
            var authentication = new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());
            Authentication authenticatedObject = authenticationManager.authenticate(authentication);
            //we can fetch user from database
            User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new ResourceNotFoundException("user not found"));
            if (!user.isEnable()) {
                throw new DisabledException("User is disabled. Contact to admin");
            }

            //authentication, user, user disable bhi hai

            // access token generate karo
            String accessToken=jwtService.generateAccessToken(user);
            String refreshToken= jwtService.generateRefreshToken(user);
            var tokenResponse= new TokenResponse();

            tokenResponse.setUser(modelMapper.map(user, UserDto.class));
            tokenResponse.setAccessToken(accessToken);
            tokenResponse.setRefreshToken(refreshToken);
            return new ResponseEntity<>(tokenResponse, HttpStatus.OK);



        } catch (AuthenticationException e) {
            e.printStackTrace();
            throw new BadCredentialsException("Invalid email or password");
        }


    }

}
