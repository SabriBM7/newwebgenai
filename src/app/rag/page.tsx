import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DocumentUpload from "@/components/document-upload"
import DocumentList from "@/components/document-list"
import RagChat from "@/components/rag-chat"

export default function RagPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">RAG System</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Tabs defaultValue="upload" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="upload">Upload</TabsTrigger>
                            <TabsTrigger value="documents">Documents</TabsTrigger>
                        </TabsList>
                        <TabsContent value="upload">
                            <DocumentUpload />
                        </TabsContent>
                        <TabsContent value="documents">
                            <DocumentList />
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="md:col-span-2 h-[700px]">
                    <RagChat />
                </div>
            </div>
        </div>
    )
}
