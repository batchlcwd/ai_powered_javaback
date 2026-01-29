import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, X, FileIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function UploadPage() {
    const [productId, setProductId] = useState('');
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('idle'); // idle, uploading, success, error
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        // Basic validation
        if (!file.type.startsWith('image/')) {
            setStatus('error');
            setMessage('Please upload an image file');
            return;
        }
        setFile(file);
        setStatus('idle');
        setMessage('');
        setProgress(0);
    };

    const removeFile = () => {
        setFile(null);
        setStatus('idle');
        setProgress(0);
        if (inputRef.current) inputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productId || !file) {
            setStatus('error');
            setMessage('Please provide both Product ID and an Image');
            return;
        }

        setStatus('uploading');
        setProgress(0);
        setMessage('');

        const formData = new FormData();
        formData.append('productImage', file);

        try {
            await axios.post(`http://localhost:8080/products/${productId}/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                },
            });

            setStatus('success');
            setMessage('Image uploaded successfully!');
            // Reset after success? Maybe keep it to show success state.
        } catch (error) {
            console.error(error);
            setStatus('error');
            setMessage(error.response?.data?.message || 'Failed to upload image. ensure backend is running.');
            setProgress(0);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto"
        >
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                    Upload Product Image
                </h2>
                <p className="text-muted-foreground">
                    Attach visuals to your product inventory
                </p>
            </div>

            <div className="bg-card border rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-80">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Product ID Input */}
                    <div className="space-y-2">
                        <label htmlFor="productId" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Product ID
                        </label>
                        <input
                            type="text"
                            id="productId"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            placeholder="e.g. 12345"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                        />
                    </div>

                    {/* File Drop Zone */}
                    <div
                        className={cn(
                            "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ease-in-out cursor-pointer group",
                            dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
                            status === 'uploading' && "opacity-50 pointer-events-none"
                        )}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current?.click()}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleChange}
                        />

                        <AnimatePresence mode='wait'>
                            {!file ? (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                                        <Upload size={32} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-lg">Click to upload or drag and drop</p>
                                        <p className="text-sm text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="file"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center gap-4 relative w-full"
                                >
                                    <div className="absolute -top-6 -right-6">
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); removeFile(); }}
                                            className="p-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    <div className="p-4 rounded-xl bg-secondary w-full flex items-center gap-4">
                                        <div className="p-3 bg-background rounded-lg text-primary">
                                            <FileIcon size={24} />
                                        </div>
                                        <div className="flex-1 text-left overflow-hidden">
                                            <p className="font-medium truncate">{file.name}</p>
                                            <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Progress Bar */}
                    <AnimatePresence>
                        {status === 'uploading' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-1"
                            >
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Uploading...</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-primary"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.1 }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Status Messages */}
                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "flex items-center gap-3 p-4 rounded-lg text-sm font-medium",
                                    status === 'success' ? "bg-green-500/15 text-green-600 dark:text-green-400" : "bg-destructive/15 text-destructive"
                                )}
                            >
                                {status === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                {message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={status === 'uploading' || !file || !productId}
                        className={cn(
                            "w-full flex items-center justify-center gap-2 h-12 rounded-lg font-semibold text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg",
                            (status === 'uploading' || !file || !productId)
                                ? "bg-muted text-muted-foreground cursor-not-allowed"
                                : "bg-primary hover:bg-primary/90 hover:-translate-y-0.5"
                        )}
                    >
                        {status === 'uploading' ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>Upload Image</>
                        )}
                    </button>

                </form>
            </div>
        </motion.div>
    );
}
