"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Lightbulb, AlertCircle, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SkillsAnalysisProps {
    missingSkills: string[];
    keywordGaps: string[];
    recommendedTech: string[];
    recommendedCerts: string[];
}

const SkillTag = ({ children, variant, icon: Icon }: { children: React.ReactNode, variant: "destructive" | "warning" | "default" | "secondary", icon?: any }) => {
    const getBadgeStyle = () => {
        switch (variant) {
            case "destructive":
                return "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20 hover:border-destructive/30";
            case "warning":
                return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20 hover:border-yellow-500/30";
            case "default":
                return "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:border-primary/30";
            case "secondary":
                return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/30";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -2, scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            <Badge variant="outline" className={`px-3 py-1.5 text-sm font-medium transition-all cursor-default ${getBadgeStyle()}`}>
                {Icon && <Icon className="w-3.5 h-3.5 mr-1.5" />}
                {children}
            </Badge>
        </motion.div>
    );
};

export function SkillsAnalysis({ missingSkills, keywordGaps, recommendedTech, recommendedCerts }: SkillsAnalysisProps) {
    return (
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                    <Compass className="w-5 h-5 text-primary" />
                    Skills & Keyword Analysis
                </CardTitle>
                <CardDescription>
                    Identify critical gaps to bypass ATS systems and impress hiring managers
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">

                {/* Missing Required Skills */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2 border-b border-border pb-2">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Missing Core Skills</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {missingSkills.length > 0 ? (
                            missingSkills.map((skill, i) => (
                                <SkillTag key={`missing-${i}`} variant="destructive">{skill}</SkillTag>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground italic">You have all the core skills for this role!</p>
                        )}
                    </div>
                </div>

                {/* Keyword Gaps */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2 border-b border-border pb-2">
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">ATS Keyword Gaps</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {keywordGaps.map((keyword, i) => (
                            <SkillTag key={`keyword-${i}`} variant="warning">{keyword}</SkillTag>
                        ))}
                    </div>
                </div>

                {/* Recommended Technologies */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2 border-b border-border pb-2">
                        <Award className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Recommended Technologies</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {recommendedTech.map((tech, i) => (
                            <SkillTag key={`tech-${i}`} variant="default">{tech}</SkillTag>
                        ))}
                    </div>
                </div>

                {/* Recommended Certifications */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2 border-b border-border pb-2">
                        <Award className="w-4 h-4 text-cyan-500" />
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Valuable Certifications</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {recommendedCerts.map((cert, i) => (
                            <SkillTag key={`cert-${i}`} variant="secondary">{cert}</SkillTag>
                        ))}
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}
