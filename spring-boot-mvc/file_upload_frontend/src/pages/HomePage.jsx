import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Image as ImageIcon, Shield, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
    const features = [
        {
            icon: <Upload className="w-6 h-6 text-primary" />,
            title: "Easy Uploads",
            description: "Drag & drop interface for seamless product image management."
        },
        {
            icon: <Zap className="w-6 h-6 text-primary" />,
            title: "Lightning Fast",
            description: "Optimized performance for quick uploads and instant retrieval."
        },
        {
            icon: <Shield className="w-6 h-6 text-primary" />,
            title: "Secure Storage",
            description: "Enterprise-grade security for your digital assets."
        }
    ];

    return (
        <div className="flex flex-col min-h-[calc(100vh-8rem)] justify-center">
            {/* Hero Section */}
            <section className="text-center py-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-block p-2 px-4 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                        🚀 The Ultimate File Manager
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                        Manage Product Assets <br /> <span className="text-primary">With Confidence</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        A powerful, classic solution for uploading and organizing your product images.
                        Streamlined for efficiency, designed for performance.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/upload">
                            <button className="h-14 px-8 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                                <Upload size={20} />
                                Start Uploading
                            </button>
                        </Link>
                        <Link to="/view">
                            <button className="h-14 px-8 rounded-full bg-secondary text-secondary-foreground font-semibold text-lg hover:bg-secondary/80 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                                <ImageIcon size={20} />
                                View Gallery
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                            className="p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
