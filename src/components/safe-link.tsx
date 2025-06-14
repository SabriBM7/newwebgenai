import Link from "next/link"
import type { LinkProps } from "next/link"
import type React from "react"

interface SafeLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
    href?: string
    children: React.ReactNode
}

/**
 * A wrapper around Next.js Link that handles undefined href values
 */
export function SafeLink({ href, children, ...props }: SafeLinkProps) {
    // Always provide a default href
    const safeHref = href || "#"

    return (
        <Link href={safeHref} {...props}>
            {children}
        </Link>
    )
}
