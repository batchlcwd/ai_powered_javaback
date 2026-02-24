package com.substring.resume.analyzer.services.impl;


import com.substring.resume.analyzer.exceptions.InvalidRequestException;
import com.substring.resume.analyzer.payload.ResumeAnalysisResult;
import com.substring.resume.analyzer.services.ResumeService;
import com.substring.resume.analyzer.services.TextCleaner;
import com.substring.resume.analyzer.services.TextExtractor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {
    private final TextExtractor textExtractor;
    private final TextCleaner textCleaner;
    private final ChatClient chatClient;
    private Logger logger = LoggerFactory.getLogger(ResumeService.class);

    @Value("classpath:/prompts/resume-analyze.st")
    private Resource promptResource;

    @Override
    public ResumeAnalysisResult analyzeResume(MultipartFile resumeFile, String jobProfile) throws IOException {
        //validate
        String contentType = resumeFile.getContentType();
        if (!contentType.equals("application/pdf")) {
            throw new InvalidRequestException("Your resume file is invalid");
        }

        //text extract
        String resumeText = textExtractor.fromPdf(resumeFile);
        logger.info(resumeText);

        if (resumeText.isEmpty()) {
            throw new InvalidRequestException("File does not contain any data");
        }
        

        //clean

        String cleanedText = textCleaner.clean(resumeText);
        logger.info(cleanedText);

        //store

        //analyze the resume and get the analysis
//        String promptText= """
//                    You are a senior technical recruiter.
//                    Analyze resume against job profile
//
//                    Resume :
//                    {resume}
//
//                    Job Profile:
//                    {jobProfile}
//
//                    Score resume outof 100
//
//                    If resume dont match the job profile
//                    suggest what to do to match the job profile
//
//
//                """;


//        PromptTemplate promptTemplate = PromptTemplate.builder()
//                .template(promptText)
//                .variables(Map.of("resume", cleanedText,"jobProfile",jobProfile))
//                .build();


        PromptTemplate promptTemplate = new PromptTemplate(promptResource);
        java.util.Map<String, Object> valuesMap = Map.of(
                "resume", resumeText,
                "jobProfile", jobProfile
        );


        Prompt prompt = promptTemplate.create(valuesMap);
        logger.info(prompt.toString());

//        String prompt = promptTemplate.render();
//
//        logger.info(prompt);

        var resumeAnalysisResult = chatClient
                .prompt(prompt)
                .call()
                .entity(ResumeAnalysisResult.class);

        logger.info(resumeAnalysisResult.toString());


        //convert the result to desired output

        //return output
        return resumeAnalysisResult;
    }
}
