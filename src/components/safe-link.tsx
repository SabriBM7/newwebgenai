import type React from "react"
import Link from "next/link"

export function SafeLink({
                             href,
                             children,
                             ...rest
                         }: { href?: string; children: React.ReactNode; [key: string]: any }) {
    // Provide a default href if none is provided
    const safeHref = href || "#"

    return (
        <Link href={safeHref} {...rest}>
            {children}
        </Link>
    )
}
