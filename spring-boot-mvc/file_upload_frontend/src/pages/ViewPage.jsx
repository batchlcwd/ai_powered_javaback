import React, { useState } from 'react';
import { Search, Image as ImageIcon, AlertCircle, RefreshCcw, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils'; // Keep ../ if file is in src/components

export default function ViewPage() {
    const [productId, setProductId] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imageKey, setImageKey] = useState(0); // To force refresh

    const handleFetch = async (e) => {
        e.preventDefault();
        if (!productId) {
            setError('Please enter a Product ID');
            return;
        }

        setLoading(true);
        setError('');
        setImageUrl(null);

        // Simulate network delay for better UX feel or just set directly
        // Ideally we verify if image exists. We can try to load it in an Image object.
        const url = `http://localhost:8080/products/${productId}/image`;

        // Preload image to check if it exists
        const img = new Image();
        img.src = url;

        img.onload = () => {
            setImageUrl(url);
            setLoading(false);
            setImageKey(prev => prev + 1); // Force re-render if needed
        };

        img.onerror = () => {
            setError('Image not found for this Product ID');
            setLoading(false);
        };
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
                    View Product Image
                </h2>
                <p className="text-muted-foreground">
                    Retrieve and inspect product assets
                </p>
            </div>

            <div className="bg-card border rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-80">
                <form onSubmit={handleFetch} className="flex gap-2 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            placeholder="Enter Product ID to Search..."
                            className="flex h-12 w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !productId}
                        className="h-12 px-6 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md flex items-center gap-2"
                    >
                        {loading ? <RefreshCcw className="animate-spin" size={18} /> : 'Fetch'}
                    </button>
                </form>

                <div className="min-h-[300px] border-2 border-dashed border-muted rounded-xl bg-muted/30 flex items-center justify-center overflow-hidden relative group">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center gap-3 text-muted-foreground"
                            >
                                <RefreshCcw className="animate-spin text-primary" size={32} />
                                <p>Fetching image...</p>
                            </motion.div>
                        ) : error ? (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center gap-3 text-destructive"
                            >
                                <AlertCircle size={32} />
                                <p className="font-medium">{error}</p>
                            </motion.div>
                        ) : imageUrl ? (
                            <motion.div
                                key={imageKey} // Use key to force re-animation on new fetch
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative w-full h-full flex items-center justify-center p-2"
                            >
                                <img
                                    src={imageUrl}
                                    alt={`Product ${productId}`}
                                    className="max-w-full max-h-[400px] object-contain rounded-lg shadow-lg"
                                />

                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 rounded-lg">
                                    <a
                                        href={imageUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                                        title="Open in new tab"
                                    >
                                        <ImageIcon size={20} />
                                    </a>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center gap-3 text-muted-foreground/50"
                            >
                                <ImageIcon size={48} />
                                <p>Enter a Product ID to view image</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
