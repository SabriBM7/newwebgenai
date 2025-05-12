import { Skeleton } from "@/components/ui/skeleton"

export default function FeaturesLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
            {/* Hero Section Skeleton */}
            <section className="pt-32 pb-20 px-4">
                <div className="container mx-auto text-center">
                    <Skeleton className="h-12 w-3/4 max-w-2xl mx-auto mb-6" />
                    <Skeleton className="h-6 w-2/3 max-w-xl mx-auto mb-4" />
                    <Skeleton className="h-6 w-1/2 max-w-lg mx-auto mb-10" />
                    <div className="flex flex-wrap justify-center gap-4">
                        <Skeleton className="h-12 w-32" />
                        <Skeleton className="h-12 w-32" />
                    </div>
                </div>
            </section>

            {/* Main Features Section Skeleton */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <Skeleton className="h-10 w-2/3 max-w-xl mx-auto mb-4" />
                        <Skeleton className="h-6 w-1/2 max-w-lg mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array(9)
                            .fill(0)
                            .map((_, index) => (
                                <div key={index} className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                                    <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-full mb-1" />
                                    <Skeleton className="h-4 w-5/6 mb-1" />
                                    <Skeleton className="h-4 w-4/6" />
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* Feature Tabs Section Skeleton */}
            <section className="py-20 px-4 bg-black/30">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <Skeleton className="h-10 w-2/3 max-w-xl mx-auto mb-4" />
                        <Skeleton className="h-6 w-1/2 max-w-lg mx-auto" />
                    </div>

                    <div className="w-full max-w-4xl mx-auto">
                        <Skeleton className="h-12 w-full mb-8 rounded-lg" />
                        <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <Skeleton className="h-8 w-3/4 mb-4" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-5/6 mb-2" />
                                    <Skeleton className="h-4 w-4/6 mb-6" />

                                    <div className="space-y-3">
                                        {Array(6)
                                            .fill(0)
                                            .map((_, index) => (
                                                <div key={index} className="flex items-start">
                                                    <Skeleton className="h-5 w-5 mr-2 mt-0.5" />
                                                    <Skeleton className="h-4 w-5/6" />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <Skeleton className="h-64 rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Table Skeleton */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <Skeleton className="h-10 w-2/3 max-w-xl mx-auto mb-4" />
                        <Skeleton className="h-6 w-1/2 max-w-lg mx-auto" />
                    </div>

                    <div className="overflow-x-auto">
                        <div className="w-full max-w-4xl mx-auto">
                            <Skeleton className="h-16 w-full mb-1 rounded-t-lg" />
                            {Array(8)
                                .fill(0)
                                .map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        className="h-12 w-full mb-1"
                                        style={{
                                            borderRadius: index === 7 ? "0 0 0.5rem 0.5rem" : "0",
                                        }}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section Skeleton */}
            <section className="py-20 px-4 bg-black/30">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <Skeleton className="h-10 w-2/3 max-w-xl mx-auto mb-4" />
                        <Skeleton className="h-6 w-1/2 max-w-lg mx-auto" />
                    </div>

                    <div className="max-w-3xl mx-auto space-y-6">
                        {Array(6)
                            .fill(0)
                            .map((_, index) => (
                                <div key={index} className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                                    <Skeleton className="h-6 w-3/4 mb-4" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-5/6 mb-2" />
                                    <Skeleton className="h-4 w-4/6" />
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* CTA Section Skeleton */}
            <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-purple-700">
                <div className="container mx-auto text-center">
                    <Skeleton className="h-10 w-2/3 max-w-xl mx-auto mb-6 bg-white/20" />
                    <Skeleton className="h-6 w-1/2 max-w-lg mx-auto mb-10 bg-white/20" />
                    <div className="flex flex-wrap justify-center gap-4">
                        <Skeleton className="h-12 w-32 bg-white/20" />
                        <Skeleton className="h-12 w-32 bg-white/20" />
                    </div>
                </div>
            </section>
        </div>
    )
}
