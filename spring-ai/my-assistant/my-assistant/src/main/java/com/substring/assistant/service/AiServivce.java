package com.substring.assistant.service;

import com.substring.assistant.payload.AiRequest;
import com.substring.assistant.payload.AiResponse;

public interface AiServivce {

    AiResponse askAi(AiRequest aiRequest);
}
