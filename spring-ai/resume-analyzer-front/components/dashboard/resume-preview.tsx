"use client";

import React, { useState } from "react";
import { Check, Copy, FileText, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResumePreviewProps {
    markdown: string;
}

export function ResumePreview({ markdown }: ResumePreviewProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border">
                <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        AI Optimized Resume
                    </CardTitle>
                    <CardDescription>Tailored content ready for application</CardDescription>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1 bg-background/50 border-white/10 hover:bg-white/10"
                        onClick={handleCopy}
                    >
                        {copied ? (
                            <Check className="h-4 w-4 text-green-500" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                        <span className="sr-only sm:not-sr-only">{copied ? "Copied!" : "Copy MD"}</span>
                    </Button>

                    <Button
                        variant="default"
                        size="sm"
                        className="h-8 gap-1 shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                    >
                        <Download className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only">Download PDF</span>
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <ScrollArea className="h-[600px] w-full rounded-b-xl max-w-none">
                    <div className="p-8 prose prose-slate prose-invert max-w-none">
                        {/* Custom styling for markdown elements in the dark theme context */}
                        <div className="
              [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-primary [&>h1]:border-b [&>h1]:border-border [&>h1]:pb-2 [&>h1]:mb-4
              [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-foreground [&>h2]:mt-6 [&>h2]:mb-3
              [&>h3]:text-xl [&>h3]:font-medium [&>h3]:text-foreground [&>h3]:mt-4 [&>h3]:mb-2
              [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-4
              [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:text-muted-foreground [&>ul]:mb-4
              [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:text-muted-foreground [&>ol]:mb-4
              [&>li]:mb-1
              [&>strong]:text-foreground [&>strong]:font-semibold
              [&>a]:text-blue-400 [&>a]:underline hover:[&>a]:text-blue-300
              [&>blockquote]:border-l-4 [&>blockquote]:border-primary/50 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted-foreground
            ">
                            <ReactMarkdown>{markdown}</ReactMarkdown>
                        </div>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
