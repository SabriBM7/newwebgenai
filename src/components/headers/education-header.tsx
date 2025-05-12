import BaseHeader, { type BaseHeaderProps } from "./base-header"

export interface EducationHeaderProps extends Omit<BaseHeaderProps, "style"> {
    keywords?: string[]
}

export default function EducationHeader(props: EducationHeaderProps) {
    return (
        <BaseHeader
            {...props}
            style="education"
            backgroundColor={props.backgroundColor || "#4CAF50"}
            textColor={props.textColor || "#ffffff"}
        />
    )
}
