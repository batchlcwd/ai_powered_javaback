package com.substring.resume.analyzer.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface TextExtractor {

    String fromPdf(MultipartFile file) throws IOException;

    String fromDocx(MultipartFile file);

}
