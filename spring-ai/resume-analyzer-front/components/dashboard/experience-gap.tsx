"use client";

import React from "react";
import { motion } from "framer-motion";
import { History, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ExperienceGapAnalysisProps {
    requiredExperience: number;
    actualExperience: number;
    gapSummary: string;
}

export function ExperienceGapAnalysis({
    requiredExperience,
    actualExperience,
    gapSummary
}: ExperienceGapAnalysisProps) {

    const meetsRequirement = actualExperience >= requiredExperience;
    const percentage = Math.min(100, Math.round((actualExperience / requiredExperience) * 100));

    return (
        <Card className="glass-card overflow-hidden relative">
            <div className={`absolute top-0 left-0 w-1 h-full ${meetsRequirement ? 'bg-green-500' : 'bg-yellow-500'}`} />

            <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    Experience Analysis
                </CardTitle>
                <CardDescription>Comparison against role requirements</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col md:flex-row gap-8 items-center">

                    {/* Progress Visual */}
                    <div className="w-full md:w-1/2">
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Your Experience</p>
                                <p className="text-3xl font-bold">{actualExperience} <span className="text-lg font-normal text-muted-foreground">Years</span></p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Required</p>
                                <p className="text-3xl font-bold">{requiredExperience} <span className="text-lg font-normal text-muted-foreground">Years</span></p>
                            </div>
                        </div>

                        <div className="h-4 w-full bg-secondary rounded-full overflow-hidden relative mt-4">
                            {/* Required Marker */}
                            <div className="absolute top-0 bottom-0 left-[100%] w-1 bg-border z-20" />

                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${percentage}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`h-full ${meetsRequirement ? 'bg-green-500' : 'bg-yellow-500'} relative z-10`}
                            >
                                <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                            </motion.div>
                        </div>

                        <div className="flex justify-center mt-4 pt-4 border-t border-border">
                            <span className={`text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1.5 ${meetsRequirement
                                    ? 'bg-green-500/10 text-green-500'
                                    : 'bg-yellow-500/10 text-yellow-500'
                                }`}>
                                {meetsRequirement ? (
                                    <TrendingUp className="w-4 h-4" />
                                ) : (
                                    <AlertCircle className="w-4 h-4" />
                                )}
                                {meetsRequirement
                                    ? `${actualExperience - requiredExperience > 0 ? `Exceeds by ${actualExperience - requiredExperience} years` : 'Meets exact requirement'}`
                                    : `Short by ${requiredExperience - actualExperience} years`}
                            </span>
                        </div>
                    </div>

                    {/* AI Insight */}
                    <div className="w-full md:w-1/2">
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 relative">
                            <div className="absolute -top-3 -left-3 bg-background border border-primary/30 rounded-full p-2">
                                <span className="text-xl">🧠</span>
                            </div>
                            <h4 className="font-semibold mb-2 text-primary ml-4">AI Insight</h4>
                            <p className="text-muted-foreground leading-relaxed">
                                {gapSummary}
                            </p>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}
