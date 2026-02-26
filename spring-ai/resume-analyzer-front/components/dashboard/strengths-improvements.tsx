"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StrengthsImprovementsProps {
    strengths: string[];
    improvements: string[];
}

export function StrengthsAndImprovements({ strengths, improvements }: StrengthsImprovementsProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {/* Strengths Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="h-[400px]"
            >
                <Card className="glass-card h-full flex flex-col border-green-500/20">
                    <CardHeader className="pb-3 border-b border-white/5 bg-green-500/5">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-green-500/20 rounded-lg">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">Key Strengths</CardTitle>
                                <CardDescription>What you are doing right</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow p-0 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none" />
                        <ScrollArea className="h-full px-6 py-4">
                            <motion.ul
                                variants={container}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="space-y-4"
                            >
                                {strengths.map((strength, i) => (
                                    <motion.li
                                        key={`strength-${i}`}
                                        variants={item}
                                        className="flex gap-3 items-start group hover:bg-white/5 p-2 rounded-lg transition-colors"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                            {strength}
                                        </span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </ScrollArea>
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none" />
                    </CardContent>
                </Card>
            </motion.div>

            {/* Improvements Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="h-[400px]"
            >
                <Card className="glass-card h-full flex flex-col border-yellow-500/20">
                    <CardHeader className="pb-3 border-b border-white/5 bg-yellow-500/5">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-yellow-500/20 rounded-lg">
                                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">Areas to Improve</CardTitle>
                                <CardDescription>Critical gaps holding you back</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow p-0 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none" />
                        <ScrollArea className="h-full px-6 py-4">
                            <motion.ul
                                variants={container}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="space-y-4"
                            >
                                {improvements.map((improvement, i) => (
                                    <motion.li
                                        key={`improvement-${i}`}
                                        variants={item}
                                        className="flex gap-3 items-start group hover:bg-white/5 p-2 rounded-lg transition-colors"
                                    >
                                        <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                            {improvement}
                                        </span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </ScrollArea>
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none" />
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
