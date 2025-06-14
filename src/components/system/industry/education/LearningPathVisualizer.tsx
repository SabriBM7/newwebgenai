"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
    ChevronDown,
    ChevronRight,
    BookOpen,
    Video,
    FileText,
    Award,
    Clock,
    CheckCircle,
    LockIcon as LockClosed,
} from "lucide-react"

interface Module {
    id: string
    title: string
    description: string
    duration: string
    difficulty: "beginner" | "intermediate" | "advanced"
    completed?: boolean
    locked?: boolean
    units: Unit[]
}

interface Unit {
    id: string
    title: string
    type: "video" | "reading" | "quiz" | "project" | "discussion"
    duration: string
    completed?: boolean
}

interface LearningPathVisualizerProps {
    title?: string
    description?: string
    modules?: Module[]
    className?: string
    onModuleSelect?: (module: Module) => void
    onUnitSelect?: (unit: Unit, moduleId: string) => void
}

const defaultModules: Module[] = [
    {
        id: "html-css",
        title: "HTML & CSS Fundamentals",
        description: "Learn the building blocks of web development",
        duration: "2 weeks",
        difficulty: "beginner",
        completed: true,
        units: [
            { id: "html-basics", title: "HTML Basics", type: "video", duration: "45 min", completed: true },
            { id: "css-basics", title: "CSS Basics", type: "video", duration: "50 min", completed: true },
            { id: "layout", title: "CSS Layout Techniques", type: "reading", duration: "30 min", completed: true },
            { id: "responsive", title: "Responsive Design", type: "project", duration: "2 hours", completed: true },
            { id: "html-css-quiz", title: "HTML & CSS Quiz", type: "quiz", duration: "20 min", completed: true },
        ],
    },
    {
        id: "javascript",
        title: "JavaScript Essentials",
        description: "Master the language of the web",
        duration: "3 weeks",
        difficulty: "intermediate",
        completed: false,
        units: [
            { id: "js-basics", title: "JavaScript Syntax", type: "video", duration: "60 min", completed: true },
            { id: "dom", title: "DOM Manipulation", type: "reading", duration: "45 min", completed: true },
            { id: "events", title: "Event Handling", type: "video", duration: "40 min", completed: false },
            { id: "async", title: "Asynchronous JavaScript", type: "reading", duration: "50 min", completed: false },
            {
                id: "js-project",
                title: "Interactive Website Project",
                type: "project",
                duration: "3 hours",
                completed: false,
            },
            { id: "js-quiz", title: "JavaScript Assessment", type: "quiz", duration: "30 min", completed: false },
        ],
    },
    {
        id: "react",
        title: "React Framework",
        description: "Build modern user interfaces with React",
        duration: "4 weeks",
        difficulty: "advanced",
        locked: true,
        units: [
            { id: "react-intro", title: "Introduction to React", type: "video", duration: "55 min" },
            { id: "components", title: "Components & Props", type: "reading", duration: "40 min" },
            { id: "state", title: "State Management", type: "video", duration: "60 min" },
            { id: "hooks", title: "React Hooks", type: "reading", duration: "70 min" },
            { id: "routing", title: "React Router", type: "video", duration: "45 min" },
            { id: "react-project", title: "React Application Project", type: "project", duration: "5 hours" },
            { id: "react-quiz", title: "React Assessment", type: "quiz", duration: "40 min" },
        ],
    },
]

export default function LearningPathVisualizer({
                                                   title = "Web Development Learning Path",
                                                   description = "Master modern web development with this structured learning path",
                                                   modules = defaultModules,
                                                   className,
                                                   onModuleSelect,
                                                   onUnitSelect,
                                               }: LearningPathVisualizerProps) {
    const [expandedModules, setExpandedModules] = useState<string[]>([modules[0]?.id || ""])

    const toggleModule = (moduleId: string) => {
        setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
    }

    const completedModules = modules.filter((m) => m.completed).length
    const totalModules = modules.length
    const progressPercentage = Math.round((completedModules / totalModules) * 100)

    const getUnitIcon = (type: string) => {
        switch (type) {
            case "video":
                return <Video className="h-4 w-4" />
            case "reading":
                return <BookOpen className="h-4 w-4" />
            case "quiz":
                return <FileText className="h-4 w-4" />
            case "project":
                return <Award className="h-4 w-4" />
            case "discussion":
                return <BookOpen className="h-4 w-4" />
            default:
                return <BookOpen className="h-4 w-4" />
        }
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "beginner":
                return "bg-green-100 text-green-800"
            case "intermediate":
                return "bg-yellow-100 text-yellow-800"
            case "advanced":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className={className}>
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-muted-foreground mb-4">{description}</p>
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <Progress value={progressPercentage} className="h-2" />
                    </div>
                    <div className="text-sm font-medium">
                        {completedModules}/{totalModules} modules completed
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {modules.map((module) => (
                    <Card key={module.id} className={`transition-all ${module.locked ? "opacity-75" : ""}`}>
                        <CardHeader className="pb-2 cursor-pointer" onClick={() => !module.locked && toggleModule(module.id)}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {module.locked ? (
                                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                            <LockClosed className="h-3 w-3 text-gray-500" />
                                        </div>
                                    ) : module.completed ? (
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                        </div>
                                    ) : (
                                        <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                                    )}
                                    <div>
                                        <CardTitle className="text-lg">{module.title}</CardTitle>
                                        <CardDescription>{module.description}</CardDescription>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}
                                    >
                                        {module.difficulty}
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4 mr-1" />
                                        {module.duration}
                                    </div>
                                    {expandedModules.includes(module.id) ? (
                                        <ChevronDown className="h-5 w-5" />
                                    ) : (
                                        <ChevronRight className="h-5 w-5" />
                                    )}
                                </div>
                            </div>
                        </CardHeader>

                        {expandedModules.includes(module.id) && !module.locked && (
                            <CardContent>
                                <div className="pl-9 space-y-3">
                                    {module.units.map((unit) => {
                                        const unitCompleted = unit.completed || false

                                        return (
                                            <div
                                                key={unit.id}
                                                className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 cursor-pointer"
                                                onClick={() => onUnitSelect && onUnitSelect(unit, module.id)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Checkbox checked={unitCompleted} />
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-1.5 rounded-md bg-muted">{getUnitIcon(unit.type)}</div>
                                                        <span className="font-medium">{unit.title}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs text-muted-foreground uppercase">{unit.type}</span>
                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        {unit.duration}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        )}

                        {expandedModules.includes(module.id) && !module.locked && (
                            <CardFooter>
                                <Button variant="outline" className="ml-9" onClick={() => onModuleSelect && onModuleSelect(module)}>
                                    {module.completed ? "Review Module" : "Continue Module"}
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    )
}
