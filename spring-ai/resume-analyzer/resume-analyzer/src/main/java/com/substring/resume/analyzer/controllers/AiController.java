package com.substring.resume.analyzer.controllers;

import com.substring.resume.analyzer.services.impl.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @GetMapping("/ask")
    public ResponseEntity<Flux<String>> askAi(
            @RequestParam("query") String query
    ) {
        return new ResponseEntity<>(aiService.askAi(query), HttpStatus.OK);

    }

}
