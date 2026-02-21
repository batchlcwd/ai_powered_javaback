package com.substring.resume.analyzer.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;


@Service
@RequiredArgsConstructor
public class AiService {

//    private ChatClient chatClient;
//
//    public AiService(ChatClient.Builder builder) {
//        chatClient = builder.build();
//    }

    private final ChatClient chatClient;

    public Flux<String> askAi(String query) {
        //write code to call ai
        Flux<String> response = chatClient.
                prompt(query)
                .stream()
                .content();
        return response;
    }
}
