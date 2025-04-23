import BaseHeader, { type BaseHeaderProps } from "./base-header"

export interface EcommerceHeaderProps extends Omit<BaseHeaderProps, "style"> {
    keywords?: string[]
}

export default function EcommerceHeader(props: EcommerceHeaderProps) {
    return (
        <BaseHeader
            {...props}
            style="ecommerce"
            backgroundColor={props.backgroundColor || "#ffcc00"}
            textColor={props.textColor || "#000"}
            sticky={props.sticky !== undefined ? props.sticky : true}
        />
    )
}
