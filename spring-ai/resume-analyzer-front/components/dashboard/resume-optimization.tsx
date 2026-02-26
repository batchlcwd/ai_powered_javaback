"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, FileEdit, Zap, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface OptimizationSectionProps {
    atsRisks: string[];
    optimizationTips: string[];
    highImpactFixes: string[];
}

export function ResumeOptimizationSection({
    atsRisks,
    optimizationTips,
    highImpactFixes
}: OptimizationSectionProps) {

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
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <Card className="glass-card">
            <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                    <FileEdit className="w-5 h-5 text-primary" />
                    Resume Optimization Guide
                </CardTitle>
                <CardDescription>Targeted improvements to boost your callback rate</CardDescription>
            </CardHeader>

            <CardContent>
                <Accordion type="single" collapsible defaultValue="high-impact" className="w-full space-y-4">

                    {/* High Impact Fixes */}
                    <AccordionItem value="high-impact" className="border border-white/10 rounded-xl px-4 bg-background/50 overflow-hidden shadow-sm">
                        <AccordionTrigger className="hover:no-underline py-4 group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <Zap className="w-4 h-4 text-primary" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-foreground">High-Impact Fixes</h4>
                                    <p className="text-sm text-muted-foreground font-normal">Changes that yield the highest ATS score bump</p>
                                </div>
                            </div>
                            <Badge variant="secondary" className="ml-auto mr-4 bg-primary/10 text-primary border-primary/20">
                                {highImpactFixes.length} Issues
                            </Badge>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                            <motion.ul
                                variants={container}
                                initial="hidden"
                                animate="show"
                                className="space-y-3 pl-14 pr-4"
                            >
                                {highImpactFixes.map((fix, i) => (
                                    <motion.li key={`fix-${i}`} variants={item} className="flex gap-3 items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 relative">
                                            <div className="absolute inset-0 bg-primary animate-ping rounded-full opacity-75" />
                                        </div>
                                        <span className="text-muted-foreground leading-relaxed">{fix}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </AccordionContent>
                    </AccordionItem>

                    {/* ATS Risks */}
                    <AccordionItem value="ats-risks" className="border border-white/10 rounded-xl px-4 bg-background/50 overflow-hidden shadow-sm">
                        <AccordionTrigger className="hover:no-underline py-4 group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                                    <ShieldAlert className="w-4 h-4 text-red-500" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-foreground">Critical ATS Risks</h4>
                                    <p className="text-sm text-muted-foreground font-normal">Formatting issues hiding your content</p>
                                </div>
                            </div>
                            <Badge variant="secondary" className="ml-auto mr-4 bg-red-500/10 text-red-500 border-red-500/20">
                                {atsRisks.length} Risks
                            </Badge>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                            <motion.ul
                                variants={container}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="space-y-3 pl-14 pr-4"
                            >
                                {atsRisks.map((risk, i) => (
                                    <motion.li key={`risk-${i}`} variants={item} className="flex gap-3 items-start">
                                        <AlertCircle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                                        <span className="text-muted-foreground leading-relaxed">{risk}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </AccordionContent>
                    </AccordionItem>

                    {/* General Tips */}
                    <AccordionItem value="general-tips" className="border border-white/10 rounded-xl px-4 bg-background/50 overflow-hidden shadow-sm">
                        <AccordionTrigger className="hover:no-underline py-4 group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                    <FileEdit className="w-4 h-4 text-blue-500" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-foreground">Content Enhancement</h4>
                                    <p className="text-sm text-muted-foreground font-normal">Ways to sound more impactful to humans</p>
                                </div>
                            </div>
                            <Badge variant="secondary" className="ml-auto mr-4 bg-blue-500/10 text-blue-500 border-blue-500/20">
                                {optimizationTips.length} Tips
                            </Badge>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                            <motion.ul
                                variants={container}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="space-y-3 pl-14 pr-4"
                            >
                                {optimizationTips.map((tip, i) => (
                                    <motion.li key={`tip-${i}`} variants={item} className="flex gap-3 items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                        <span className="text-muted-foreground leading-relaxed">{tip}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </CardContent>
        </Card>
    );
}
