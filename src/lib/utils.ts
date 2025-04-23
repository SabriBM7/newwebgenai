import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getButtonClasses(type: "primary" | "secondary" | "tertiary", style: "rounded" | "flat" | "outlined") {
  const baseClasses = "px-6 py-2 font-medium transition-colors duration-200"

  const typeClasses = {
    primary: {
      rounded: "bg-primary text-white rounded-full hover:bg-primary/90",
      flat: "bg-primary text-white hover:bg-primary/90",
      outlined: "border-2 border-primary text-primary bg-transparent hover:bg-primary/10",
    },
    secondary: {
      rounded: "bg-secondary text-white rounded-full hover:bg-secondary/90",
      flat: "bg-secondary text-white hover:bg-secondary/90",
      outlined: "border-2 border-secondary text-secondary bg-transparent hover:bg-secondary/10",
    },
    tertiary: {
      rounded: "bg-muted text-foreground rounded-full hover:bg-muted/90",
      flat: "bg-muted text-foreground hover:bg-muted/90",
      outlined: "border-2 border-muted text-foreground bg-transparent hover:bg-muted/30",
    },
  }

  return `${baseClasses} ${typeClasses[type][style]}`
}

export function getAnimationClasses(animation: "fade-in" | "slide-down" | "zoom-in" | "none") {
  switch (animation) {
    case "fade-in":
      return "animate-fadeIn"
    case "slide-down":
      return "animate-slideDown"
    case "zoom-in":
      return "animate-zoomIn"
    default:
      return ""
  }
}

export function getTextAlignmentClasses(alignment: "left" | "center" | "right") {
  switch (alignment) {
    case "left":
      return "text-left"
    case "center":
      return "text-center"
    case "right":
      return "text-right"
    default:
      return "text-left"
  }
}
