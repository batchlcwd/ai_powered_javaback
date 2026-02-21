package com.substring.resume.analyzer.services.impl;

import com.substring.resume.analyzer.services.TextCleaner;
import org.springframework.stereotype.Service;

@Service
public class TextCleanerImpl implements TextCleaner {
    @Override
    public String clean(String rawString) {
        return rawString
                .replaceAll("\\r","-->")
                .replaceAll("\\s+", " ")

                ;
    }
}
