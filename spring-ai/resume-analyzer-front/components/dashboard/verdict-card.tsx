"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Target, Briefcase, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface VerdictCardProps {
    roleFitLevel: "Excellent" | "Good" | "Average" | "Poor";
    finalVerdict: string;
    careerReadiness: string;
}

export function VerdictCard({ roleFitLevel, finalVerdict, careerReadiness }: VerdictCardProps) {
    const getVerdictStyle = () => {
        switch (roleFitLevel) {
            case "Excellent":
                return {
                    glow: "shadow-[0_0_30px_rgba(34,197,94,0.3)]",
                    border: "border-green-500/50",
                    text: "text-green-500",
                    bg: "bg-green-500/10",
                    gradient: "from-green-500/20 to-transparent"
                };
            case "Good":
                return {
                    glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
                    border: "border-blue-500/50",
                    text: "text-blue-500",
                    bg: "bg-blue-500/10",
                    gradient: "from-blue-500/20 to-transparent"
                };
            case "Average":
                return {
                    glow: "shadow-[0_0_30px_rgba(234,179,8,0.3)]",
                    border: "border-yellow-500/50",
                    text: "text-yellow-500",
                    bg: "bg-yellow-500/10",
                    gradient: "from-yellow-500/20 to-transparent"
                };
            case "Poor":
                return {
                    glow: "shadow-[0_0_30px_rgba(239,68,68,0.3)]",
                    border: "border-red-500/50",
                    text: "text-red-500",
                    bg: "bg-red-500/10",
                    gradient: "from-red-500/20 to-transparent"
                };
        }
    };

    const style = getVerdictStyle();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <Card className={`glass-card overflow-hidden relative ${style.border} ${style.glow} mt-8`}>
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-50 pointer-events-none`} />

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                <CardContent className="p-8 md:p-12 relative z-10 flex flex-col items-center text-center">

                    <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-background border border-white/10 shadow-xl">
                        <Sparkles className={`w-8 h-8 ${style.text}`} />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        AI Recruiter Verdict
                    </h2>

                    <div className="inline-block relative mb-8 group">
                        <div className={`absolute inset-0 ${style.bg} blur-xl rounded-full scale-150 group-hover:scale-175 transition-transform duration-500 pointer-events-none`} />
                        <h3 className={`text-4xl md:text-6xl font-black uppercase tracking-widest relative z-10 ${style.text} drop-shadow-md`}>
                            {roleFitLevel}
                        </h3>
                    </div>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed mb-10 font-medium">
                        "{finalVerdict}"
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                        <div className="flex items-center gap-3 bg-secondary/50 rounded-xl p-4 border border-white/5">
                            <div className={`p-2 rounded-lg ${style.bg}`}>
                                <Target className={`w-5 h-5 ${style.text}`} />
                            </div>
                            <div className="text-left">
                                <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Role Fit</p>
                                <p className="font-medium">{roleFitLevel} Candidate</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-secondary/50 rounded-xl p-4 border border-white/5">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Career Readiness</p>
                                <p className="font-medium">{careerReadiness}</p>
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </motion.div>
    );
}
