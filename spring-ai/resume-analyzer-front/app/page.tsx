"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import { ResumeUploadSection } from "@/components/upload/resume-upload-section";
import { ScoreOverview } from "@/components/dashboard/score-overview";
import { AnalysisCharts } from "@/components/dashboard/analysis-charts";
import { StrengthsAndImprovements } from "@/components/dashboard/strengths-improvements";
import { SkillsAnalysis } from "@/components/dashboard/skills-analysis";
import { ExperienceGapAnalysis } from "@/components/dashboard/experience-gap";
import { VerdictCard } from "@/components/dashboard/verdict-card";
import { ResumeOptimizationSection } from "@/components/dashboard/resume-optimization";
import { LearningRoadmap } from "@/components/dashboard/learning-roadmap";
import { ResumePreview } from "@/components/dashboard/resume-preview";

// Mock Data Generator
const generateMockAnalysis = (jobProfile: string) => {
  return {
    scores: {
      technicalScore: 85,
      communicationScore: 78,
      domainScore: 92,
      experienceScore: 70,
      atsScore: 65,
      matchPercentage: 78,
    },
    chartData: {
      radarData: [
        { subject: 'Technical skills', score: 85 },
        { subject: 'Soft skills', score: 78 },
        { subject: 'Domain Knowledge', score: 92 },
        { subject: 'Experience', score: 70 },
        { subject: 'Education', score: 95 },
      ],
      barData: [
        { name: 'Core Skills', strengths: 8, improvements: 2 },
        { name: 'Tools/Tech', strengths: 12, improvements: 5 },
        { name: 'Formatting', strengths: 3, improvements: 7 },
        { name: 'Metrics', strengths: 2, improvements: 6 },
      ]
    },
    insights: {
      strengths: [
        "Strong foundation in core Java and Spring Boot ecosystem",
        "Excellent academic background",
        "Good project experience with microservices architecture",
        "Clear demonstration of RESTful API design principles",
        "Familiarity with containerization (Docker)"
      ],
      improvements: [
        "Lack of quantified metrics in project descriptions (e.g., 'improved performance by X%')",
        "Missing cloud platform experience (AWS/GCP/Azure)",
        "Inconsistent date formatting in experience section",
        "Missing keywords related to CI/CD pipelines",
        "Summary section is too generic, needs more direct alignment with " + jobProfile
      ]
    },
    skills: {
      missingSkills: ["AWS/Azure", "Kubernetes", "GraphQL", "Redis Caching"],
      keywordGaps: ["Scalability", "High Availability", "Agile Methodology", "TDD"],
      recommendedTech: ["Kafka", "Elasticsearch", "React/Angular Basics"],
      recommendedCerts: ["AWS Certified Developer", "Spring Professional Certification"]
    },
    experience: {
      required: 5,
      actual: 3,
      gapSummary: `Your 3 years of experience shows solid progression, but falls slightly short of the typical 5-year requirement for Senior ${jobProfile} roles. To bridge this gap, emphasize complex architectural decisions you've made, mentoring junior developers, and taking ownership of full application lifecycles.`
    },
    verdict: {
      roleFitLevel: "Good" as "Good",
      text: `You have a strong technical foundation for the ${jobProfile} role, but need to position your experience more strategically. By quantifying your impact and adding key cloud technologies, you would be a highly competitive candidate.`,
      readiness: "Ready with minor resume tweaks"
    },
    optimization: {
      atsRisks: [
        "Complex table layout in skills section might break ATS parsers",
        "Using graphics/icons instead of standard bullet points",
        "Header/Footer contains contact info that might be missed"
      ],
      tips: [
        "Replace 'Responsible for developing' with active verbs like 'Architected and deployed'",
        "Add a dedicated 'Technical Summary' immediately below contact info",
        "Standardize all dates to MM/YYYY format for reliable parsing"
      ],
      highImpactFixes: [
        "Add quantifiable metrics: 'Reduced API response time by 40% using Redis'",
        "Remove the objective statement and replace with a targeted professional summary",
        "Separate Core Skills from Tools & Technologies"
      ]
    },
    roadmap: {
      shortTermText: [
        "Restructure resume layout to standard ATS template",
        "Rewrite top 3 project bullets using the XYZ formula",
        "Add a portfolio matching missing keyword list",
        "Deploy one personal project to AWS Free Tier"
      ],
      longTermText: [
        "Obtain a recognized Cloud Certification (AWS/Azure)",
        "Contribute to an open-source project related to target domain",
        "Master system design principles for scalability",
        "Build a project demonstrating microservices orchestration (K8s)"
      ]
    },
    markdown: `# John Doe
**${jobProfile}** | john.doe@email.com | (555) 123-4567 | github.com/johndoe | linkedin.com/in/johndoe

## Professional Summary
Results-driven Software Engineer with 3 years of experience designing and implementing scalable backend systems using Java and Spring Boot. Proven ability to optimize database queries, resulting in 40% faster load times for critical reporting applications. Eager to bring expertise in microservices architecture to a high-growth engineering team.

## Core Competencies
**Languages:** Java 11/17, SQL, JavaScript, HTML/CSS
**Frameworks/Libraries:** Spring Boot, Spring Data JPA, Spring Security, Hibernate
**Tools & Infrastructure:** Git, Docker, Jenkins (CI/CD), PostgreSQL, MongoDB
**Methodologies:** Agile/Scrum, RESTful API Design, Microservices, TDD

## Professional Experience

### Software Engineer II | TechCorp Solutions
*June 2021 – Present*
* Architected and developed a high-throughput transaction processing microservice using Spring Boot and Apache Kafka, robustly handling 5,000+ requests per second.
* Optimized legacy SQL queries and introduced Redis caching, reducing average API response time from 800ms to 120ms (an 85% improvement).
* Collaborated with cross-functional product and QA teams to deliver 4 major feature releases ahead of schedule using Agile methodologies.
* Mentored 2 junior developers in clean code practices and test-driven development.

### Junior Java Developer | InnovateIT
*January 2020 – May 2021*
* Developed and maintained RESTful APIs for a customer-facing portal, serving over 10,000 active users.
* Migrated monolithic authentication service to OAuth2/JWT based authorization server.
* Automated deployment pipelines using Jenkins, reducing manual deployment time by 2 hours per week.
* Covered 85% of newly written code with JUnit and Mockito unit tests.

## Education

**Bachelor of Science in Computer Science**
*University of Technology* | Graduated: Dec 2019
* GPA: 3.8/4.0
* Relevant Coursework: Data Structures, Algorithms, Database Systems, Software Engineering

## Selected Projects

**E-Commerce Inventory Manager**
* Built a full-stack inventory management system using Spring Boot backend and React frontend.
* Implemented secure user authentication and role-based access control using Spring Security.

**Personal Finance Tracker API**
* Designed a REST API wrapper around Plaid's financial data API to aggregate user transaction data.
* Deployed containerized application to AWS EC2 instance.
`
  };
};

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = (file: File, jobProfile: string) => {
    setIsAnalyzing(true);

    // Simulate API call delay
    setTimeout(() => {
      const mockResult = generateMockAnalysis(jobProfile);
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);

      // Scroll to top of dashboard after analysis
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 3000);
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/20 rounded-full blur-[120px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">

        {/* Header / Nav Area (Simple) */}
        {!analysisResult && (
          <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">Resume<span className="text-primary">X</span></span>
            </div>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">How it works</a>
              <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
              <a href="#" className="hover:text-foreground transition-colors">Resources</a>
            </nav>
          </header>
        )}

        <AnimatePresence mode="wait">
          {!analysisResult ? (
            <motion.div
              key="upload-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center min-h-[70vh]"
            >
              <ResumeUploadSection onAnalyze={handleAnalyze} isLoading={isAnalyzing} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, staggerChildren: 0.1 }}
              className="space-y-12 pb-24"
            >
              <div className="flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 py-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Analysis Complete</h1>
                  <p className="text-muted-foreground text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Live AI insights generated
                  </p>
                </div>
                <button
                  onClick={resetAnalysis}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  Analyze New Resume
                </button>
              </div>

              <motion.div className="space-y-6">
                <VerdictCard
                  roleFitLevel={analysisResult.verdict.roleFitLevel}
                  finalVerdict={analysisResult.verdict.text}
                  careerReadiness={analysisResult.verdict.readiness}
                />
              </motion.div>

              <motion.div className="space-y-6 pt-4 border-t border-white/5">
                <ScoreOverview data={analysisResult.scores} />
              </motion.div>

              <motion.div className="space-y-6 pt-4 border-t border-white/5">
                <AnalysisCharts
                  radarData={analysisResult.chartData.radarData}
                  barData={analysisResult.chartData.barData}
                />
              </motion.div>

              <motion.div className="space-y-6 pt-4 border-t border-white/5">
                <h3 className="text-2xl font-bold mb-4 tracking-tight">Deep Dive Insights</h3>
                <StrengthsAndImprovements
                  strengths={analysisResult.insights.strengths}
                  improvements={analysisResult.insights.improvements}
                />
              </motion.div>

              <motion.div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div className="h-full">
                  <SkillsAnalysis
                    missingSkills={analysisResult.skills.missingSkills}
                    keywordGaps={analysisResult.skills.keywordGaps}
                    recommendedTech={analysisResult.skills.recommendedTech}
                    recommendedCerts={analysisResult.skills.recommendedCerts}
                  />
                </div>
                <div className="h-full">
                  <ExperienceGapAnalysis
                    requiredExperience={analysisResult.experience.required}
                    actualExperience={analysisResult.experience.actual}
                    gapSummary={analysisResult.experience.gapSummary}
                  />
                </div>
              </motion.div>

              <motion.div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">Strategy Guide</h3>
                  <ResumeOptimizationSection
                    atsRisks={analysisResult.optimization.atsRisks}
                    optimizationTips={analysisResult.optimization.tips}
                    highImpactFixes={analysisResult.optimization.highImpactFixes}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight opacity-0 select-none hidden xl:block">Strategy Guide Spacer</h3>
                  <LearningRoadmap
                    shortTermGoals={analysisResult.roadmap.shortTermText}
                    longTermGoals={analysisResult.roadmap.longTermText}
                  />
                </div>
              </motion.div>

              <motion.div className="space-y-6 pt-4 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                  <ResumePreview markdown={analysisResult.markdown} />
                </div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
