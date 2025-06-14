"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Video,
    Mic,
    MicOff,
    Camera,
    CameraOff,
    ScreenShare,
    PhoneOff,
    MessageSquare,
    Users,
    FileText,
    Hand,
    Settings,
    Share2,
    MoreVertical,
    Send,
    Download,
    Clock,
    CheckCircle2,
} from "lucide-react"

interface Participant {
    id: string
    name: string
    role: "instructor" | "student" | "assistant"
    avatar?: string
    isActive: boolean
    isSpeaking?: boolean
    hasCamera: boolean
    hasMic: boolean
    isScreenSharing?: boolean
    handRaised?: boolean
}

interface ChatMessage {
    id: string
    senderId: string
    senderName: string
    senderRole: "instructor" | "student" | "assistant"
    senderAvatar?: string
    content: string
    timestamp: Date
    isPrivate?: boolean
    recipientId?: string
}

interface Resource {
    id: string
    title: string
    type: "pdf" | "doc" | "video" | "link" | "assignment"
    url: string
    uploadedBy: string
    uploadDate: Date
    size?: string
    dueDate?: Date
    completed?: boolean
}

interface VirtualClassroomProps {
    className?: string
    courseTitle?: string
    courseDescription?: string
    instructor?: Participant
    participants?: Participant[]
    resources?: Resource[]
    initialMessages?: ChatMessage[]
    onSendMessage?: (message: string, isPrivate: boolean, recipientId?: string) => void
    onToggleCamera?: () => void
    onToggleMic?: () => void
    onToggleScreenShare?: () => void
    onEndCall?: () => void
    onRaiseHand?: () => void
    onDownloadResource?: (resourceId: string) => void
}

const defaultInstructor: Participant = {
    id: "instructor-1",
    name: "Dr. Sarah Johnson",
    role: "instructor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    isActive: true,
    isSpeaking: false,
    hasCamera: true,
    hasMic: true,
}

const defaultParticipants: Participant[] = [
    defaultInstructor,
    {
        id: "student-1",
        name: "Alex Chen",
        role: "student",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&crop=face",
        isActive: true,
        hasCamera: true,
        hasMic: true,
    },
    {
        id: "student-2",
        name: "Maya Patel",
        role: "student",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
        isActive: true,
        hasCamera: false,
        hasMic: true,
        handRaised: true,
    },
    {
        id: "student-3",
        name: "James Wilson",
        role: "student",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&crop=face",
        isActive: true,
        hasCamera: true,
        hasMic: false,
    },
    {
        id: "assistant-1",
        name: "Emma Davis",
        role: "assistant",
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face",
        isActive: true,
        hasCamera: true,
        hasMic: true,
    },
]

const defaultResources: Resource[] = [
    {
        id: "res-1",
        title: "Course Syllabus",
        type: "pdf",
        url: "#",
        uploadedBy: "Dr. Sarah Johnson",
        uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
        id: "res-2",
        title: "Week 1 Lecture Slides",
        type: "pdf",
        url: "#",
        uploadedBy: "Dr. Sarah Johnson",
        uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
        id: "res-3",
        title: "Introduction Video",
        type: "video",
        url: "#",
        uploadedBy: "Dr. Sarah Johnson",
        uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        size: "45 MB",
    },
    {
        id: "res-4",
        title: "Assignment 1: Research Paper",
        type: "assignment",
        url: "#",
        uploadedBy: "Dr. Sarah Johnson",
        uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    {
        id: "res-5",
        title: "Additional Reading",
        type: "link",
        url: "https://example.com/reading",
        uploadedBy: "Emma Davis",
        uploadDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
]

const defaultMessages: ChatMessage[] = [
    {
        id: "msg-1",
        senderId: "instructor-1",
        senderName: "Dr. Sarah Johnson",
        senderRole: "instructor",
        senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
        content: "Welcome everyone to today's class! We'll be covering Chapter 3 from the textbook.",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
    },
    {
        id: "msg-2",
        senderId: "student-1",
        senderName: "Alex Chen",
        senderRole: "student",
        senderAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&crop=face",
        content: "Good morning, Professor! I had a question about the assignment due next week.",
        timestamp: new Date(Date.now() - 14 * 60 * 1000),
    },
    {
        id: "msg-3",
        senderId: "instructor-1",
        senderName: "Dr. Sarah Johnson",
        senderRole: "instructor",
        senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
        content: "Sure, Alex. We'll address assignment questions in the last 15 minutes of class today.",
        timestamp: new Date(Date.now() - 13 * 60 * 1000),
    },
    {
        id: "msg-4",
        senderId: "assistant-1",
        senderName: "Emma Davis",
        senderRole: "assistant",
        senderAvatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face",
        content: "I've posted additional resources for Chapter 3 in the Resources tab.",
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
    },
    {
        id: "msg-5",
        senderId: "student-2",
        senderName: "Maya Patel",
        senderRole: "student",
        senderAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
        content: "Thank you for the resources! That's very helpful.",
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
    },
]

export default function VirtualClassroom({
                                             className,
                                             courseTitle = "Advanced Web Development",
                                             courseDescription = "Learn modern web development techniques and frameworks",
                                             instructor = defaultInstructor,
                                             participants = defaultParticipants,
                                             resources = defaultResources,
                                             initialMessages = defaultMessages,
                                             onSendMessage,
                                             onToggleCamera,
                                             onToggleMic,
                                             onToggleScreenShare,
                                             onEndCall,
                                             onRaiseHand,
                                             onDownloadResource,
                                         }: VirtualClassroomProps) {
    const [activeTab, setActiveTab] = useState<string>("video")
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
    const [newMessage, setNewMessage] = useState<string>("")
    const [isPrivateMessage, setIsPrivateMessage] = useState<boolean>(false)
    const [privateRecipient, setPrivateRecipient] = useState<string | undefined>()
    const [localCamera, setLocalCamera] = useState<boolean>(true)
    const [localMic, setLocalMic] = useState<boolean>(true)
    const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false)
    const [isHandRaised, setIsHandRaised] = useState<boolean>(false)

    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleSendMessage = () => {
        if (!newMessage.trim()) return

        const newMsg: ChatMessage = {
            id: `msg-${Date.now()}`,
            senderId: "student-1", // Assuming current user is student-1
            senderName: "Alex Chen",
            senderRole: "student",
            senderAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&crop=face",
            content: newMessage,
            timestamp: new Date(),
            isPrivate: isPrivateMessage,
            recipientId: isPrivateMessage ? privateRecipient : undefined,
        }

        setMessages([...messages, newMsg])
        setNewMessage("")

        if (onSendMessage) {
            onSendMessage(newMessage, isPrivateMessage, privateRecipient)
        }
    }

    const handleToggleCamera = () => {
        setLocalCamera(!localCamera)
        if (onToggleCamera) onToggleCamera()
    }

    const handleToggleMic = () => {
        setLocalMic(!localMic)
        if (onToggleMic) onToggleMic()
    }

    const handleToggleScreenShare = () => {
        setIsScreenSharing(!isScreenSharing)
        if (onToggleScreenShare) onToggleScreenShare()
    }

    const handleRaiseHand = () => {
        setIsHandRaised(!isHandRaised)
        if (onRaiseHand) onRaiseHand()
    }

    const handleDownloadResource = (resourceId: string) => {
        if (onDownloadResource) onDownloadResource(resourceId)
    }

    const getResourceIcon = (type: string) => {
        switch (type) {
            case "pdf":
            case "doc":
                return <FileText className="h-4 w-4" />
            case "video":
                return <Video className="h-4 w-4" />
            case "link":
                return <Share2 className="h-4 w-4" />
            case "assignment":
                return <FileText className="h-4 w-4" />
            default:
                return <FileText className="h-4 w-4" />
        }
    }

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case "instructor":
                return "bg-blue-100 text-blue-800"
            case "assistant":
                return "bg-purple-100 text-purple-800"
            case "student":
                return "bg-green-100 text-green-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className={`flex flex-col h-[800px] ${className}`}>
            <div className="bg-primary text-primary-foreground p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold">{courseTitle}</h2>
                        <p className="text-sm opacity-90">{courseDescription}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-primary-foreground/20 text-primary-foreground">
                            Live Session
                        </Badge>
                        <Button variant="outline" size="sm" className="text-primary-foreground border-primary-foreground/20">
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                        <div className="bg-muted/30 px-4">
                            <TabsList className="w-full justify-start h-12">
                                <TabsTrigger value="video" className="data-[state=active]:bg-background">
                                    <Video className="h-4 w-4 mr-2" />
                                    Video
                                </TabsTrigger>
                                <TabsTrigger value="chat" className="data-[state=active]:bg-background">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Chat
                                </TabsTrigger>
                                <TabsTrigger value="participants" className="data-[state=active]:bg-background">
                                    <Users className="h-4 w-4 mr-2" />
                                    Participants
                                </TabsTrigger>
                                <TabsTrigger value="resources" className="data-[state=active]:bg-background">
                                    <FileText className="h-4 w-4 mr-2" />
                                    Resources
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="video" className="flex-1 p-0 m-0 overflow-hidden flex flex-col">
                            <div className="flex-1 grid grid-cols-3 gap-2 p-2 bg-muted/20">
                                {/* Main video - instructor */}
                                <div className="col-span-2 row-span-2 bg-black rounded-md relative overflow-hidden">
                                    <div className="absolute top-2 left-2">
                                        <Badge variant="outline" className={`${getRoleBadgeColor(instructor.role)} border-none`}>
                                            {instructor.role.charAt(0).toUpperCase() + instructor.role.slice(1)}
                                        </Badge>
                                    </div>
                                    <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-black/50 px-2 py-1 rounded-md text-white">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span>{instructor.name}</span>
                                        {instructor.isSpeaking && <Mic className="h-3 w-3 text-green-500" />}
                                    </div>
                                    <img
                                        src="/placeholder.svg?height=400&width=600"
                                        alt="Instructor video"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Student videos */}
                                {participants
                                    .filter((p) => p.role !== "instructor")
                                    .slice(0, 4)
                                    .map((participant) => (
                                        <div key={participant.id} className="bg-black rounded-md relative overflow-hidden">
                                            <div className="absolute top-2 left-2">
                                                <Badge
                                                    variant="outline"
                                                    className={`${getRoleBadgeColor(participant.role)} border-none text-xs`}
                                                >
                                                    {participant.role.charAt(0).toUpperCase() + participant.role.slice(1)}
                                                </Badge>
                                            </div>
                                            <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-black/50 px-2 py-1 rounded-md text-white text-xs">
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                <span>{participant.name}</span>
                                                {!participant.hasCamera && <CameraOff className="h-3 w-3" />}
                                                {!participant.hasMic && <MicOff className="h-3 w-3" />}
                                                {participant.handRaised && <Hand className="h-3 w-3 text-yellow-400" />}
                                            </div>
                                            {participant.hasCamera ? (
                                                <img
                                                    src={
                                                        participant.avatar || `/placeholder.svg?height=200&width=200&query=person+${participant.id}`
                                                    }
                                                    alt={`${participant.name} video`}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-muted">
                                                    <Avatar className="h-16 w-16">
                                                        <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                                                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>

                            <div className="p-4 bg-muted/10 border-t">
                                <div className="flex items-center justify-center gap-4">
                                    <Button variant={localCamera ? "default" : "outline"} size="icon" onClick={handleToggleCamera}>
                                        {localCamera ? <Camera className="h-5 w-5" /> : <CameraOff className="h-5 w-5" />}
                                    </Button>
                                    <Button variant={localMic ? "default" : "outline"} size="icon" onClick={handleToggleMic}>
                                        {localMic ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                                    </Button>
                                    <Button
                                        variant={isScreenSharing ? "default" : "outline"}
                                        size="icon"
                                        onClick={handleToggleScreenShare}
                                    >
                                        <ScreenShare className="h-5 w-5" />
                                    </Button>
                                    <Button variant={isHandRaised ? "default" : "outline"} size="icon" onClick={handleRaiseHand}>
                                        <Hand className="h-5 w-5" />
                                    </Button>
                                    <Button variant="destructive" size="icon" onClick={onEndCall}>
                                        <PhoneOff className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="chat" className="flex-1 p-0 m-0 overflow-hidden flex flex-col">
                            <ScrollArea className="flex-1 p-4">
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <div key={message.id} className="flex gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
                                                <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{message.senderName}</span>
                                                    <Badge
                                                        variant="outline"
                                                        className={`${getRoleBadgeColor(message.senderRole)} text-xs border-none`}
                                                    >
                                                        {message.senderRole.charAt(0).toUpperCase() + message.senderRole.slice(1)}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                                                    {message.isPrivate && (
                                                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 text-xs border-none">
                                                            Private
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm mt-1">{message.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>

                            <div className="p-4 border-t">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="private-message"
                                            checked={isPrivateMessage}
                                            onChange={(e) => setIsPrivateMessage(e.target.checked)}
                                            className="mr-2"
                                        />
                                        <label htmlFor="private-message" className="text-sm">
                                            Private message
                                        </label>
                                    </div>

                                    {isPrivateMessage && (
                                        <select
                                            value={privateRecipient}
                                            onChange={(e) => setPrivateRecipient(e.target.value)}
                                            className="text-sm border rounded px-2 py-1"
                                        >
                                            <option value="">Select recipient</option>
                                            {participants.map((p) => (
                                                <option key={p.id} value={p.id}>
                                                    {p.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <Input
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                    />
                                    <Button onClick={handleSendMessage}>
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="participants" className="flex-1 p-0 m-0 overflow-hidden">
                            <ScrollArea className="h-full">
                                <div className="p-4 space-y-2">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-medium">Participants ({participants.length})</h3>
                                        <Button variant="outline" size="sm">
                                            <Users className="h-4 w-4 mr-2" />
                                            Invite
                                        </Button>
                                    </div>

                                    {/* Group by role */}
                                    {["instructor", "assistant", "student"].map((role) => {
                                        const roleParticipants = participants.filter((p) => p.role === role)
                                        if (roleParticipants.length === 0) return null

                                        return (
                                            <div key={role} className="mb-4">
                                                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                                    {role.charAt(0).toUpperCase() + role.slice(1)}s ({roleParticipants.length})
                                                </h4>
                                                <div className="space-y-1">
                                                    {roleParticipants.map((participant) => (
                                                        <div
                                                            key={participant.id}
                                                            className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="h-8 w-8">
                                                                    <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                                                                    <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <div className="font-medium">{participant.name}</div>
                                                                    <div className="text-xs text-muted-foreground">
                                                                        {participant.isActive ? "Online" : "Offline"}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {participant.handRaised && <Hand className="h-4 w-4 text-yellow-500" />}
                                                                {!participant.hasCamera && <CameraOff className="h-4 w-4 text-muted-foreground" />}
                                                                {!participant.hasMic && <MicOff className="h-4 w-4 text-muted-foreground" />}
                                                                {participant.isSpeaking && <Mic className="h-4 w-4 text-green-500" />}
                                                                <Button variant="ghost" size="icon">
                                                                    <MoreVertical className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </ScrollArea>
                        </TabsContent>

                        <TabsContent value="resources" className="flex-1 p-0 m-0 overflow-hidden">
                            <ScrollArea className="h-full">
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-medium">Course Resources</h3>
                                        <Button variant="outline" size="sm">
                                            <FileText className="h-4 w-4 mr-2" />
                                            Upload
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        {resources.map((resource) => (
                                            <Card key={resource.id} className="overflow-hidden">
                                                <div className="flex items-center p-4">
                                                    <div className="mr-4 p-2 bg-muted rounded-md">{getResourceIcon(resource.type)}</div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium">{resource.title}</h4>
                                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                                            <span>Uploaded by {resource.uploadedBy}</span>
                                                            <span>{formatDate(resource.uploadDate)}</span>
                                                            {resource.size && <span>{resource.size}</span>}
                                                        </div>
                                                        {resource.type === "assignment" && resource.dueDate && (
                                                            <div className="flex items-center gap-2 mt-2">
                                                                <Badge
                                                                    variant="outline"
                                                                    className={
                                                                        resource.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                                                    }
                                                                >
                                                                    {resource.completed ? (
                                                                        <>
                                                                            <CheckCircle2 className="h-3 w-3 mr-1" />
                                                                            Completed
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Clock className="h-3 w-3 mr-1" />
                                                                            Due {formatDate(resource.dueDate)}
                                                                        </>
                                                                    )}
                                                                </Badge>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDownloadResource(resource.id)}>
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
