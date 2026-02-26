package com.substring.assistant.controller;

import com.substring.assistant.payload.AiRequest;
import com.substring.assistant.payload.AiResponse;
import com.substring.assistant.service.AiServivce;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiServivce aiService;

    @PostMapping("/ask")
    public ResponseEntity<AiResponse> askAI(
            @RequestBody AiRequest aiRequest
    ) {


        AiResponse response = aiService.askAi(aiRequest);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

}
