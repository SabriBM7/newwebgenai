import BaseHeader, { type BaseHeaderProps } from "./base-header"

export interface SaaSHeaderProps extends Omit<BaseHeaderProps, "style"> {
    keywords?: string[]
}

export default function SaaSHeader(props: SaaSHeaderProps) {
    return (
        <BaseHeader
            {...props}
            style="saas"
            backgroundColor={props.backgroundColor || "linear-gradient(90deg, #ff7eb3, #ff758c)"}
            textColor={props.textColor || "#fff"}
            sticky={props.sticky !== undefined ? props.sticky : true}
        />
    )
}
