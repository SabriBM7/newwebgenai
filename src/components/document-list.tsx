"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Trash2, FileText, FileSearch } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Document = {
    id: number
    title: string
    description: string | null
    file_path: string | null
    file_type: string | null
    created_at: string
    user_id: string | null
}

export default function DocumentList() {
    const [documents, setDocuments] = useState<Document[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState<number | null>(null)
    const { toast } = useToast()

    useEffect(() => {
        fetchDocuments()
    }, [])

    const fetchDocuments = async () => {
        setIsLoading(true)
        try {
            const response = await fetch("/api/documents")

            if (!response.ok) {
                throw new Error("Failed to fetch documents")
            }

            const data = await response.json()
            setDocuments(data.documents || [])
        } catch (error) {
            console.error("Error fetching documents:", error)
            toast({
                title: "Error",
                description: "Failed to load documents",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteDocument = async (id: number) => {
        setIsDeleting(id)
        try {
            const response = await fetch(`/api/documents/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Failed to delete document")
            }

            // Remove document from state
            setDocuments(documents.filter((doc) => doc.id !== id))

            toast({
                title: "Document deleted",
                description: "Document has been removed from the knowledge base",
            })
        } catch (error) {
            console.error("Error deleting document:", error)
            toast({
                title: "Error",
                description: "Failed to delete document",
                variant: "destructive",
            })
        } finally {
            setIsDeleting(null)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString()
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Document Library</CardTitle>
                <CardDescription>Manage your uploaded documents</CardDescription>
            </CardHeader>
            <CardContent>
                {documents.length === 0 ? (
                    <div className="text-center py-8">
                        <FileSearch className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">No documents found</p>
                        <p className="text-sm text-muted-foreground">Upload documents to get started</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Uploaded</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents.map((doc) => (
                                <TableRow key={doc.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center">
                                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                            {doc.title}
                                        </div>
                                        {doc.description && <p className="text-xs text-muted-foreground mt-1">{doc.description}</p>}
                                    </TableCell>
                                    <TableCell>{doc.file_type || "Text"}</TableCell>
                                    <TableCell>{formatDate(doc.created_at)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteDocument(doc.id)}
                                            disabled={isDeleting === doc.id}
                                        >
                                            {isDeleting === doc.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            )}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
            <CardFooter>
                <Button variant="outline" onClick={fetchDocuments} disabled={isLoading}>
                    Refresh
                </Button>
            </CardFooter>
        </Card>
    )
}
