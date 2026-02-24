package com.substring.resume.analyzer.controllers;

import com.substring.resume.analyzer.payload.ResumeAnalysisResult;
import com.substring.resume.analyzer.services.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequestMapping("/api/v1/resume")
@RestController
@RequiredArgsConstructor
public class ResumeController {

    private  final ResumeService resumeService;

    @PostMapping
    public ResponseEntity<?> analyzeResume(
            @RequestParam("resume")MultipartFile resumeFile,
            @RequestParam("jobProfile") String jobProfile
            ) throws IOException {

        ResumeAnalysisResult result = resumeService.analyzeResume(resumeFile, jobProfile);
        return  new ResponseEntity<>(result, HttpStatus.OK);


    }

}
