import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast'; // We might need to install react-hot-toast, or use a custom one. Let's use custom for now or just install it later if needed. Actually I didn't install it.
// I will just use simple alerts for now or install sonner later.
// Let's stick to basic layout.

export default function Layout() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300 font-sans text-foreground">
            {/* Background Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[100px]" />
            </div>

            <Navbar />
            <main className="container mx-auto px-4 pt-24 pb-12 max-w-5xl">
                <Outlet />
            </main>
            <Toaster position="bottom-right" />
        </div>
    );
}
