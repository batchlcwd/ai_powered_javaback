"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Circle, CheckCircle2, AlertTriangle, XCircle, Code, MessageSquare, Briefcase, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ScoreCardProps {
    title: string;
    score: number;
    icon: React.ReactNode;
    delay?: number;
}

const AnimatedCounter = ({ value }: { value: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = value;
        if (start === end) return;

        let totalDuration = 1500;
        let incrementTime = (totalDuration / end);

        let timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value]);

    return <span>{count}</span>;
};

const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-destructive";
};

const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500/10 border-green-500/20";
    if (score >= 60) return "bg-yellow-500/10 border-yellow-500/20";
    return "bg-destructive/10 border-destructive/20";
};

export function ScoreCard({ title, score, icon, delay = 0 }: ScoreCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
        >
            <Card className={`glass-card border overflow-hidden relative ${getScoreBg(score)} transition-all hover:scale-[1.02]`}>
                <div className="absolute top-0 right-0 p-4 opacity-50">{icon}</div>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold tracking-tight mt-1 mb-2">
                        <span className={getScoreColor(score)}>
                            <AnimatedCounter value={score} />
                        </span>
                        <span className="text-2xl text-muted-foreground">/100</span>
                    </div>
                    <Progress
                        value={score}
                        className="h-2 mt-4 bg-background/50"
                        indicatorClassName={
                            score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-destructive'
                        }
                    />
                </CardContent>
            </Card>
        </motion.div>
    );
}

// Dummy data type logic for props
interface ScoresData {
    technicalScore: number;
    communicationScore: number;
    domainScore: number;
    experienceScore: number;
    atsScore: number;
    matchPercentage: number;
}

export function ScoreOverview({ data }: { data: ScoresData }) {
    return (
        <div className="w-full">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">AI Evaluation</h2>
                    <p className="text-muted-foreground">Comprehensive metric breakdown of your profile</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-16 w-16 rounded-full border-4 border-primary flex items-center justify-center bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                        <span className="text-xl font-bold text-primary">
                            <AnimatedCounter value={data.matchPercentage} />%
                        </span>
                    </div>
                    <div className="ml-2">
                        <p className="text-sm font-medium text-primary">Match</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Score</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <ScoreCard
                    title="Technical"
                    score={data.technicalScore}
                    icon={<Code className="w-6 h-6 text-blue-500" />}
                    delay={0.1}
                />
                <ScoreCard
                    title="Communication"
                    score={data.communicationScore}
                    icon={<MessageSquare className="w-6 h-6 text-purple-500" />}
                    delay={0.2}
                />
                <ScoreCard
                    title="Domain"
                    score={data.domainScore}
                    icon={<Award className="w-6 h-6 text-cyan-500" />}
                    delay={0.3}
                />
                <ScoreCard
                    title="Experience"
                    score={data.experienceScore}
                    icon={<Briefcase className="w-6 h-6 text-orange-500" />}
                    delay={0.4}
                />
                <ScoreCard
                    title="ATS Ready"
                    score={data.atsScore}
                    icon={<Circle className="w-6 h-6 text-green-500" />}
                    delay={0.5}
                />
            </div>
        </div>
    );
}
