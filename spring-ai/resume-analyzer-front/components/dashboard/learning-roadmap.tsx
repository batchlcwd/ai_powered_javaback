"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Clock, CheckCircle2, CircleDashed, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LearningRoadmapProps {
    shortTermGoals: string[];
    longTermGoals: string[];
}

export function LearningRoadmap({ shortTermGoals, longTermGoals }: LearningRoadmapProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Strategic Learning Roadmap
                </CardTitle>
                <CardDescription>Tailored path to become a top-tier candidate</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">

                    {/* Timeline Connector Line (Hidden on mobile) */}
                    <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-border -translate-x-1/2" />

                    {/* Short Term */}
                    <div className="relative">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <Clock className="w-4 h-4 text-blue-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-blue-500">Short-Term Action Plan</h3>
                        </div>

                        {/* Timeline node marker for desktop */}
                        <div className="hidden md:block absolute top-2 -right-[21px] w-3 h-3 rounded-full bg-blue-500 border-[3px] border-background z-10" />

                        <ScrollArea className="h-[250px] pr-4">
                            <motion.div
                                variants={container}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="space-y-0 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent"
                            >
                                {shortTermGoals.map((goal, i) => (
                                    <motion.div key={`st-${i}`} variants={item} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                                        {/* Icon */}
                                        <div className="flex items-center justify-center w-5 h-5 rounded-full border border-border bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow shadow-border z-10 mx-[-9px] md:mx-0">
                                            <CircleDashed className="w-3 h-3 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                                        </div>

                                        {/* Content Component */}
                                        <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl border border-white/5 bg-background/30 group-hover:bg-white/5 group-hover:border-blue-500/20 transition-all mb-4 ml-4 md:ml-0">
                                            <p className="text-sm text-foreground">{goal}</p>
                                        </div>

                                    </motion.div>
                                ))}
                            </motion.div>
                        </ScrollArea>
                    </div>

                    {/* Long Term */}
                    <div className="relative">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                <Target className="w-4 h-4 text-purple-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-purple-500">Long-Term Goals (6+ Mo)</h3>
                        </div>

                        {/* Timeline node marker for desktop */}
                        <div className="hidden md:block absolute top-2 -left-[20px] w-3 h-3 rounded-full bg-purple-500 border-[3px] border-background z-10" />

                        <ScrollArea className="h-[250px] pr-4">
                            <motion.div
                                variants={container}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="space-y-0 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent"
                            >
                                {longTermGoals.map((goal, i) => (
                                    <motion.div key={`lt-${i}`} variants={item} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                                        {/* Icon */}
                                        <div className="flex items-center justify-center w-5 h-5 rounded-full border border-border bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow shadow-border z-10 mx-[-9px] md:mx-0">
                                            <CircleDashed className="w-3 h-3 text-muted-foreground group-hover:text-purple-500 transition-colors" />
                                        </div>

                                        {/* Content Component */}
                                        <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl border border-white/5 bg-background/30 group-hover:bg-white/5 group-hover:border-purple-500/20 transition-all mb-4 ml-4 md:ml-0">
                                            <p className="text-sm text-foreground">{goal}</p>
                                        </div>

                                    </motion.div>
                                ))}
                            </motion.div>
                        </ScrollArea>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}
