import BaseHeader, { type BaseHeaderProps } from "./base-header"

export interface MinimalHeaderProps extends Omit<BaseHeaderProps, "style"> {
    keywords?: string[]
}

export default function MinimalHeader(props: MinimalHeaderProps) {
    return (
        <BaseHeader
            {...props}
            style="minimal"
            backgroundColor={props.backgroundColor || "#ffffff"}
            textColor={props.textColor || "#000000"}
        />
    )
}
