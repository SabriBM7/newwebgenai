"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CopyButtonProps {
    textToCopy: string
    className?: string
}

export function CopyButton({ textToCopy, className }: CopyButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy text: ", err)
        }
    }

    return (
        <Button onClick={handleCopy} variant="outline" size="sm" className={className}>
            {copied ? (
                <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                </>
            ) : (
                <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                </>
            )}
        </Button>
    )
}
