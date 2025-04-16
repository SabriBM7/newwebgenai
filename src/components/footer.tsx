import Link from "next/link"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container px-4 md:px-6 py-8 md:py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/public" className="flex items-center gap-2">
                            <span className="text-xl font-bold">WebGenAI</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Create professional websites through simple conversation with our AI-powered platform.
                        </p>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="#">
                                    <Facebook className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="#">
                                    <Twitter className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="#">
                                    <Instagram className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="#">
                                    <Linkedin className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="#">
                                    <Github className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    Templates
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium">Subscribe to our newsletter</h4>
                        <div className="flex space-x-2">
                            <Input type="email" placeholder="Enter your email" />
                            <Button type="submit">Subscribe</Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Get the latest news and updates about our AI website generator.
                        </p>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} WebGenAI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

