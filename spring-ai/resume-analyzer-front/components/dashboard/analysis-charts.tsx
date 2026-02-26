"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    PolarRadiusAxis,
} from "recharts";

interface AnalysisChartsProps {
    radarData: any[];
    barData: any[];
}

// Custom tooltip component for radar chart
const CustomRadarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background/90 backdrop-blur-md border border-border p-3 rounded-lg shadow-xl">
                <p className="font-semibold">{payload[0].payload.subject}</p>
                <p className="text-primary font-bold">Score: {payload[0].value}/100</p>
            </div>
        );
    }
    return null;
};

// Custom tooltip component for bar chart
const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background/90 backdrop-blur-md border border-border p-3 rounded-lg shadow-xl">
                <p className="font-semibold mb-2 text-muted-foreground">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={`item-${index}`} className="font-medium flex items-center gap-2">
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="capitalize">{entry.name}:</span>
                        <span className="font-bold">{entry.value}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export function AnalysisCharts({ radarData, barData }: AnalysisChartsProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {/* Radar Chart Card */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <Card className="glass-card h-full">
                    <CardHeader>
                        <CardTitle className="text-xl">Skill Distribution</CardTitle>
                        <CardDescription>Visual mapping of your core competencies</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="var(--border)" strokeDasharray="3 3" />
                                    <PolarAngleAxis
                                        dataKey="subject"
                                        tick={{ fill: "var(--foreground)", fontSize: 12, fontWeight: 500 }}
                                    />
                                    <PolarRadiusAxis
                                        angle={30}
                                        domain={[0, 100]}
                                        tick={false}
                                        axisLine={false}
                                    />
                                    <Tooltip content={<CustomRadarTooltip />} cursor={{ fill: "transparent" }} />
                                    <Radar
                                        name="Score"
                                        dataKey="score"
                                        stroke="var(--primary)"
                                        strokeWidth={2}
                                        fill="var(--primary)"
                                        fillOpacity={0.3}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>

                            {/* Decorative center glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary/20 rounded-full blur-xl pointer-events-none"></div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Bar Chart Card */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="glass-card h-full">
                    <CardHeader>
                        <CardTitle className="text-xl">Strengths vs Improvements</CardTitle>
                        <CardDescription>Volume of findings across different categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={barData}
                                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                                >
                                    <XAxis
                                        dataKey="name"
                                        stroke="var(--muted-foreground)"
                                        tick={{ fill: "var(--muted-foreground)" }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="var(--muted-foreground)"
                                        tick={{ fill: "var(--muted-foreground)" }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        content={<CustomBarTooltip />}
                                        cursor={{ fill: "var(--muted)", opacity: 0.5 }}
                                    />
                                    <Legend
                                        wrapperStyle={{ paddingTop: "20px" }}
                                        iconType="circle"
                                    />
                                    <Bar
                                        dataKey="strengths"
                                        name="Strengths"
                                        fill="#22c55e"
                                        radius={[4, 4, 0, 0]}
                                        maxBarSize={40}
                                    />
                                    <Bar
                                        dataKey="improvements"
                                        name="Areas to Improve"
                                        fill="#eab308"
                                        radius={[4, 4, 0, 0]}
                                        maxBarSize={40}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
