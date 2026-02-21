package com.substring.resume.analyzer.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ResumeService {
    String analyzeResume(MultipartFile resumeFile, String jobProfile) throws IOException;
}
