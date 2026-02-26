"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, CheckCircle2, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface ResumeUploadSectionProps {
    onAnalyze: (file: File, jobProfile: string) => void;
    isLoading: boolean;
}

export function ResumeUploadSection({ onAnalyze, isLoading }: ResumeUploadSectionProps) {
    const [file, setFile] = useState<File | null>(null);
    const [jobProfile, setJobProfile] = useState("");
    const [isDragActive, setIsDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type === "application/pdf") {
                setFile(droppedFile);
            } else {
                alert("Please upload a PDF file");
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleAnalyzeClick = () => {
        if (file && jobProfile) {
            onAnalyze(file, jobProfile);
        }
    };

    const clearFile = () => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <section className="w-full max-w-4xl mx-auto my-12 relative z-10 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
            >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                    <span className="text-gradient">AI Resume Analyzer</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Upload your resume and the job profile you're targeting. Our AI will analyze your fit and provide actionable feedback.
                </p>
            </motion.div>

            <Card className="glass-card border-none overflow-hidden relative">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/10 opacity-50 z-0"></div>

                <CardContent className="p-8 relative z-10 flex flex-col md:flex-row gap-8 items-center">

                    {/* Left Side: Upload Area */}
                    <div className="w-full md:w-1/2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,application/pdf"
                            className="hidden"
                        />

                        <AnimatePresence mode="wait">
                            {!file ? (
                                <motion.div
                                    key="upload-box"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragEnter={handleDragEnter}
                                    onDragOver={handleDragEnter}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`
                    border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer
                    transition-all duration-300 min-h-[220px] relative group
                    ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-white/5'}
                  `}
                                >
                                    <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                    <motion.div
                                        animate={{ y: isDragActive ? -10 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <UploadCloud className={`w-12 h-12 mb-4 transition-colors ${isDragActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary/70'}`} />
                                    </motion.div>
                                    <h3 className="text-lg font-semibold mb-2">Upload Resume</h3>
                                    <p className="text-sm text-muted-foreground text-center">
                                        Drag and drop your PDF here, or click to browse
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="file-preview"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="rounded-xl border border-primary/20 bg-primary/5 p-6 flex flex-col items-center justify-center min-h-[220px] relative"
                                >
                                    <button
                                        onClick={clearFile}
                                        className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    <div className="bg-background rounded-full p-4 mb-4 shadow-lg shadow-primary/10">
                                        <FileText className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold truncate max-w-[200px] mb-1">
                                        {file.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB • PDF
                                    </p>
                                    <div className="flex items-center text-sm text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
                                        <CheckCircle2 className="w-4 h-4 mr-1.5" />
                                        Ready to analyze
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Side: Job Profile & Action */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
                        <div className="space-y-3">
                            <label htmlFor="jobProfile" className="text-sm font-medium text-muted-foreground ml-1">
                                Target Job Profile
                            </label>
                            <Input
                                id="jobProfile"
                                placeholder="e.g. Senior Java Developer"
                                value={jobProfile}
                                onChange={(e) => setJobProfile(e.target.value)}
                                className="h-14 text-lg bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary shadow-inner"
                            />
                        </div>

                        <Button
                            size="lg"
                            className="w-full h-14 text-lg font-semibold relative overflow-hidden group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,180,255,0.3)] transition-all duration-300"
                            disabled={!file || !jobProfile || isLoading}
                            onClick={handleAnalyzeClick}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-indigo-500 to-cyan-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>

                            <span className="relative z-10 flex items-center justify-center">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Analyzing with AI...
                                    </>
                                ) : (
                                    <>
                                        Analyze Resume
                                    </>
                                )}
                            </span>
                        </Button>

                        {/* Simple progress visual while loading */}
                        <AnimatePresence>
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="w-full"
                                >
                                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-primary to-cyan-400"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                                        />
                                    </div>
                                    <p className="text-xs text-center text-muted-foreground mt-2 animate-pulse">
                                        Extracting skills and comparing with AI models...
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </CardContent>
            </Card>
        </section>
    );
}
