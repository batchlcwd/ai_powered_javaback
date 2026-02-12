package com.mybasket.app.security;

import com.mybasket.app.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.security.StandardSecureDigestAlgorithms;
import io.jsonwebtoken.security.DigestAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class JwtService {


    private final SecretKey key;
    private final long accessTokenExpireTime;
    private  final String issuer;


    public JwtService(
            @Value("${security.jwt.secret}") String secret,
            @Value("${security.jwt.access-token-expire-time}") long accessTokenExpireTime,
            @Value("${security.jwt.issuer}") String issuer
            ) {

        this.accessTokenExpireTime = accessTokenExpireTime;

        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

        this.issuer=issuer;
    }


    public String generateAccessToken(User user) {


        Instant now = Instant.now();
        List<String> roles = user.getRole() == null ? List.of() : List.of(user.getRole().toString());




//        we have to complete this method to generate token and put user information inside this token


//        going to generate token

        return Jwts
                .builder()
                .id(UUID.randomUUID().toString())
                .subject(user.getUserId() + "")
                .issuer(issuer)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusMillis(accessTokenExpireTime)))
                .claims(
                        Map.of(
                                "email", user.getEmail(),
                                "roles", roles,
                                "ty", "accesss"
                        )
                )
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();


    }
}
