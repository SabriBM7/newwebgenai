"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../../../components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/public" className="flex items-center gap-2">
                        <span className="text-xl font-bold">WebGenAI</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                        Features
                    </Link>
                    <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
                        How It Works
                    </Link>
                    <Link href="#demo" className="text-sm font-medium hover:text-primary transition-colors">
                        Demo
                    </Link>
                    <Link href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
                        Benefits
                    </Link>
                    <Button asChild className="ml-4">
                        <Link href="#try-now">Try Now</Link>
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="container md:hidden py-4 pb-6 border-b">
                    <nav className="flex flex-col space-y-4">
                        <Link
                            href="#features"
                            className="text-sm font-medium hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="text-sm font-medium hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            How It Works
                        </Link>
                        <Link href="#demo" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                            Demo
                        </Link>
                        <Link
                            href="#benefits"
                            className="text-sm font-medium hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Benefits
                        </Link>
                        <Button asChild className="w-full mt-2" onClick={() => setIsMenuOpen(false)}>
                            <Link href="#try-now">Try Now</Link>
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    )
}

