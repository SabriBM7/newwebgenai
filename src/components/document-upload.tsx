"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload } from "lucide-react"

export default function DocumentUpload() {
    const [file, setFile] = useState<File | null>(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isUploading, setIsUploading] = useState(false)

    const { toast } = useToast()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0]
            setFile(selectedFile)

            // Use filename as default title if not set
            if (!title) {
                setTitle(selectedFile.name.split(".")[0])
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!file) {
            toast({
                title: "No file selected",
                description: "Please select a file to upload",
                variant: "destructive",
            })
            return
        }

        setIsUploading(true)

        try {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("title", title || file.name)
            formData.append("description", description)

            const response = await fetch("/api/documents", {
                method: "POST",
                body: formData,
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to upload document")
            }

            toast({
                title: "Document uploaded",
                description: data.message,
            })

            // Reset form
            setFile(null)
            setTitle("")
            setDescription("")

            // Reset file input
            const fileInput = document.getElementById("file-upload") as HTMLInputElement
            if (fileInput) {
                fileInput.value = ""
            }
        } catch (error) {
            console.error("Upload error:", error)
            toast({
                title: "Upload failed",
                description: error instanceof Error ? error.message : "Failed to upload document",
                variant: "destructive",
            })
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Upload Document</CardTitle>
                <CardDescription>Upload documents to be processed and added to the knowledge base</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="file-upload" className="block text-sm font-medium">
                            Document File
                        </label>
                        <Input
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            accept=".txt,.pdf,.md,.doc,.docx"
                            disabled={isUploading}
                        />
                        <p className="text-xs text-muted-foreground">Supported formats: TXT, PDF, Markdown, Word</p>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium">
                            Title
                        </label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Document title"
                            disabled={isUploading}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium">
                            Description (optional)
                        </label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief description of the document"
                            disabled={isUploading}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isUploading || !file}>
                        {isUploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Document
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
