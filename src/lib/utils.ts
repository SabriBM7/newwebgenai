import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTextAlignmentClasses(alignment: string | undefined): string {
  switch (alignment) {
    case "left":
      return "text-left"
    case "center":
      return "text-center"
    case "right":
      return "text-right"
    default:
      return "text-center"
  }
}

export function getButtonClasses(type: string | undefined, style: string | undefined): string {
  const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"

  // Size classes
  let sizeClasses = "px-4 py-2"
  if (style === "small") {
    sizeClasses = "px-3 py-1 text-sm"
  } else if (style === "large") {
    sizeClasses = "px-6 py-3 text-lg"
  }

  // Type classes
  let typeClasses = "bg-purple-600 text-white hover:bg-purple-700"
  if (type === "secondary") {
    typeClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300"
  } else if (type === "outline") {
    typeClasses = "bg-transparent border border-current text-purple-600 hover:bg-purple-50"
  } else if (type === "ghost") {
    typeClasses = "bg-transparent text-purple-600 hover:bg-purple-50"
  }

  return `${baseClasses} ${sizeClasses} ${typeClasses}`
}

export function getAnimationClasses(animation: string | undefined): string {
  switch (animation) {
    case "fade-in":
      return "animate-fade-in"
    case "fade-up":
      return "animate-fade-up"
    case "fade-down":
      return "animate-fade-down"
    case "fade-left":
      return "animate-fade-left"
    case "fade-right":
      return "animate-fade-right"
    case "zoom-in":
      return "animate-zoom-in"
    case "zoom-out":
      return "animate-zoom-out"
    default:
      return ""
  }
}
