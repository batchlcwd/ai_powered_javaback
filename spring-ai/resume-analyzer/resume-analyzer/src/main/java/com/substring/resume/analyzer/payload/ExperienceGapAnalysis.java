package com.substring.resume.analyzer.payload;

public record ExperienceGapAnalysis(
        int requiredYears,
        int actualYears,
        String gapSummary
) {
}