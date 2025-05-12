"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">
                WebGen<span className="text-purple-500">AI</span>
              </span>
                        </Link>

                        <nav className="hidden md:flex ml-10 space-x-8">
                            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                                Pricing
                            </Link>
                            <Link href="/features" className="text-gray-300 hover:text-white transition-colors">
                                Features
                            </Link>
                            <Link href="/examples" className="text-gray-300 hover:text-white transition-colors">
                                Examples
                            </Link>
                            <Link href="/tools" className="text-gray-300 hover:text-white transition-colors">
                                AI Tools
                            </Link>
                            <Link href="/chat" className="text-gray-300 hover:text-white transition-colors">
                                AI Chat
                            </Link>
                        </nav>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/login">
                            <Button variant="ghost" className="text-gray-300 hover:text-white">
                                Log in
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Sign up</Button>
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-black/95 border-b border-gray-800">
                    <div className="container mx-auto px-4 py-4 space-y-4">
                        <Link href="/pricing" className="block text-gray-300 hover:text-white">
                            Pricing
                        </Link>
                        <Link href="/features" className="block text-gray-300 hover:text-white">
                            Features
                        </Link>
                        <Link href="/examples" className="block text-gray-300 hover:text-white">
                            Examples
                        </Link>
                        <Link href="/tools" className="block text-gray-300 hover:text-white">
                            AI Tools
                        </Link>
                        <Link href="/chat" className="block text-gray-300 hover:text-white">
                            AI Chat
                        </Link>
                        <div className="pt-4 border-t border-gray-800 flex flex-col space-y-4">
                            <Link href="/login">
                                <Button variant="ghost" className="w-full text-gray-300 hover:text-white">
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Sign up</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
