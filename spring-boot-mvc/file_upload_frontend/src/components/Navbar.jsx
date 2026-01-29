import React from 'react';
import { NavLink } from 'react-router-dom';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '../lib/utils'; // Keep ../ if file is in src/components

export default function Navbar() {
    const navItems = [
        { to: '/', label: 'Upload', icon: Upload },
        { to: '/view', label: 'View Images', icon: ImageIcon },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    FileOps
                </h1>
                <div className="flex gap-2">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                )
                            }
                        >
                            <Icon size={18} />
                            {label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
}
