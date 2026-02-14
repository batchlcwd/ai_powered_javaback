package com.mybasket.app.security;

import com.mybasket.app.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.security.StandardSecureDigestAlgorithms;
import io.jsonwebtoken.security.DigestAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.SignatureException;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class JwtService {


    private final SecretKey key;
    private final long accessTokenExpireTime;
    private final long refreshTokenExpireTime;
    private final String issuer;


    public JwtService(
            @Value("${security.jwt.secret}") String secret,
            @Value("${security.jwt.access-token-expire-time}") long accessTokenExpireTime,
            @Value("${security.jwt.refresh-token-expire-time}") long refreshTokenExpireTime,
            @Value("${security.jwt.issuer}") String issuer
    ) {

        this.accessTokenExpireTime = accessTokenExpireTime;
        this.refreshTokenExpireTime=refreshTokenExpireTime;

        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

        this.issuer = issuer;
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
                                "ty", "access"
                        )
                )
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();


    }

    public String generateRefreshToken(User user) {


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
                .expiration(Date.from(now.plusMillis(refreshTokenExpireTime)))
                .claims(
                        Map.of(
                                "ty", "refresh"
                        )
                )
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();


    }


    public boolean isAccessToken(String token) {
        Claims payload = this.parse(token).getPayload();
        return payload.get("ty").equals("access");

    }

    public boolean isRefreshToken(String token) {
        Claims payload = this.parse(token).getPayload();
        return payload.get("ty").equals("refresh");

    }

    public Jws<Claims> parse(String token) {
        return Jwts
                .parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token);
    }
}
