import { Card, CardContent } from "@/components/ui/card"

export default function ExamplesLoading() {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-purple-950 pt-20">
            <div className="container mx-auto py-12">
                <div className="text-center mb-12">
                    <div className="h-10 w-64 bg-gray-800/50 rounded-md mx-auto mb-4 animate-pulse"></div>
                    <div className="h-6 w-96 bg-gray-800/50 rounded-md mx-auto animate-pulse"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, index) => (
                        <Card key={index} className="overflow-hidden border-gray-800 bg-black/40 backdrop-blur-sm">
                            <div className="aspect-video bg-gray-800/50 animate-pulse"></div>
                            <CardContent className="p-6">
                                <div className="h-6 w-3/4 bg-gray-800/50 rounded-md mb-4 animate-pulse"></div>
                                <div className="h-4 w-full bg-gray-800/50 rounded-md mb-2 animate-pulse"></div>
                                <div className="h-4 w-2/3 bg-gray-800/50 rounded-md mb-4 animate-pulse"></div>
                                <div className="flex gap-2 mb-4">
                                    <div className="h-4 w-16 bg-gray-800/50 rounded-full animate-pulse"></div>
                                    <div className="h-4 w-20 bg-gray-800/50 rounded-full animate-pulse"></div>
                                    <div className="h-4 w-14 bg-gray-800/50 rounded-full animate-pulse"></div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="h-4 w-20 bg-gray-800/50 rounded-md animate-pulse"></div>
                                    <div className="h-4 w-24 bg-gray-800/50 rounded-md animate-pulse"></div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
