package com.substring.resume.analyzer.services.impl;

import com.substring.resume.analyzer.services.TextExtractor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class TextExtractorImpl implements TextExtractor {


    @Override
    public String fromPdf(MultipartFile file) throws IOException {
        PDDocument pdDocument = PDDocument.load(file.getInputStream());
        PDFTextStripper pdfTextStripper = new PDFTextStripper();
        String text = pdfTextStripper.getText(pdDocument);
        return text;
    }


    @Override
    public String fromDocx(MultipartFile file) {
        return "";
    }

    @Override
    public String fromText(MultipartFile file) {
        return "";
    }
}
