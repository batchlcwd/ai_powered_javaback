package com.substring.resume.analyzer.services;

import com.substring.resume.analyzer.payload.ResumeAnalysisResult;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ResumeService {
    ResumeAnalysisResult analyzeResume(MultipartFile resumeFile, String jobProfile) throws IOException;
}
