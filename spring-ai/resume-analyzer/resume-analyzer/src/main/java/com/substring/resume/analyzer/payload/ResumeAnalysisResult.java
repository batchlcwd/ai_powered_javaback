package com.substring.resume.analyzer.payload;

import java.util.List;


public record ResumeAnalysisResult(

        int technicalScore,
        int communicationScore,
        int domainScore,
        int experienceScore,
        int atsScore,
        int matchingPercentage,

        List<String> strengths,
        List<String> improvements,
        List<String> missingSkills,
        List<String> recommendedTechnologies,
        List<String> recommendedCertifications,
        List<String> keywordGaps,

        ExperienceGapAnalysis experienceGapAnalysis,

        String roleFitLevel,

        List<String> atsRisks,
        List<String> resumeOptimizationTips,

        String suggestions,
        String improvedResumeMarkdown,
        String finalRecruiterVerdict,
        String careerReadinessLevel,
        List<String> shortTermLearningGoals,  // 1–3 months
        List<String> longTermLearningGoals,    // 6–12 months
        List<String> highImpactResumeFixes,
        List<String> alternativeRoles,
        String positiveSummaryForCandidate



) {
}