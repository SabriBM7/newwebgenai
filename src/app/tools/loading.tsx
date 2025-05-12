import { Skeleton } from "@/components/ui/skeleton"

export default function ToolsLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-24 pb-16">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <Skeleton className="h-12 w-3/4 mx-auto mb-6 bg-gray-800" />
                    <Skeleton className="h-6 w-full mx-auto mb-4 bg-gray-800" />
                    <Skeleton className="h-6 w-5/6 mx-auto bg-gray-800" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                            <div className="p-6">
                                <Skeleton className="h-12 w-12 rounded-lg bg-gray-700 mb-4" />
                                <Skeleton className="h-6 w-3/4 bg-gray-700 mb-2" />
                                <Skeleton className="h-4 w-full bg-gray-700 mb-6" />
                                <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                                <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                                <Skeleton className="h-4 w-3/4 bg-gray-700 mb-6" />
                                <Skeleton className="h-10 w-full bg-gray-700" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
