"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Home, DollarSign, BarChart3, MapPin, Users, Clock, Target } from "lucide-react"

interface MarketData {
    location: string
    averagePrice: number
    priceChange: number
    medianPrice: number
    daysOnMarket: number
    inventory: number
    salesVolume: number
    pricePerSqft: number
    trends: {
        month: string
        price: number
        sales: number
    }[]
}

interface MarketAnalyticsProps {
    title?: string
    subtitle?: string
    marketData?: MarketData[]
    defaultLocation?: string
}

export default function MarketAnalytics({
                                            title = "Real Estate Market Analytics",
                                            subtitle = "Stay informed with the latest market trends and insights",
                                            marketData = [],
                                            defaultLocation = "Beverly Hills, CA",
                                        }: MarketAnalyticsProps) {
    const [selectedLocation, setSelectedLocation] = useState(defaultLocation)
    const [timeframe, setTimeframe] = useState("12months")
    const [viewType, setViewType] = useState<"overview" | "trends" | "comparison">("overview")

    const defaultMarketData: MarketData[] = [
        {
            location: "Beverly Hills, CA",
            averagePrice: 2850000,
            priceChange: 8.5,
            medianPrice: 2200000,
            daysOnMarket: 45,
            inventory: 156,
            salesVolume: 89,
            pricePerSqft: 1250,
            trends: [
                { month: "Jan", price: 2650000, sales: 78 },
                { month: "Feb", price: 2720000, sales: 82 },
                { month: "Mar", price: 2780000, sales: 85 },
                { month: "Apr", price: 2820000, sales: 89 },
                { month: "May", price: 2850000, sales: 92 },
                { month: "Jun", price: 2890000, sales: 89 },
            ],
        },
        {
            location: "Manhattan, NY",
            averagePrice: 1950000,
            priceChange: -2.3,
            medianPrice: 1650000,
            daysOnMarket: 62,
            inventory: 234,
            salesVolume: 156,
            pricePerSqft: 1850,
            trends: [
                { month: "Jan", price: 2000000, sales: 145 },
                { month: "Feb", price: 1980000, sales: 152 },
                { month: "Mar", price: 1970000, sales: 148 },
                { month: "Apr", price: 1960000, sales: 156 },
                { month: "May", price: 1955000, sales: 159 },
                { month: "Jun", price: 1950000, sales: 156 },
            ],
        },
        {
            location: "Miami, FL",
            averagePrice: 875000,
            priceChange: 12.8,
            medianPrice: 650000,
            daysOnMarket: 38,
            inventory: 298,
            salesVolume: 234,
            pricePerSqft: 485,
            trends: [
                { month: "Jan", price: 775000, sales: 198 },
                { month: "Feb", price: 810000, sales: 215 },
                { month: "Mar", price: 835000, sales: 228 },
                { month: "Apr", price: 850000, sales: 234 },
                { month: "May", price: 865000, sales: 241 },
                { month: "Jun", price: 875000, sales: 234 },
            ],
        },
    ]

    const displayData = marketData.length > 0 ? marketData : defaultMarketData
    const currentMarket = displayData.find((d) => d.location === selectedLocation) || displayData[0]

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const formatPercentage = (value: number) => {
        const sign = value >= 0 ? "+" : ""
        return `${sign}${value.toFixed(1)}%`
    }

    const getTrendIcon = (change: number) => {
        return change >= 0 ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
        ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
        )
    }

    const getTrendColor = (change: number) => {
        return change >= 0 ? "text-green-600" : "text-red-600"
    }

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Controls */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                            <SelectTrigger className="w-64">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {displayData.map((market) => (
                                    <SelectItem key={market.location} value={market.location}>
                                        {market.location}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={timeframe} onValueChange={setTimeframe}>
                            <SelectTrigger className="w-48">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="6months">Last 6 Months</SelectItem>
                                <SelectItem value="12months">Last 12 Months</SelectItem>
                                <SelectItem value="24months">Last 24 Months</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                            <Button
                                variant={viewType === "overview" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setViewType("overview")}
                            >
                                Overview
                            </Button>
                            <Button
                                variant={viewType === "trends" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setViewType("trends")}
                            >
                                Trends
                            </Button>
                            <Button
                                variant={viewType === "comparison" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setViewType("comparison")}
                            >
                                Compare
                            </Button>
                        </div>
                    </div>

                    {viewType === "overview" && (
                        <div className="space-y-8">
                            {/* Key Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Average Price</p>
                                                <p className="text-2xl font-bold">{formatCurrency(currentMarket.averagePrice)}</p>
                                                <div className={`flex items-center mt-1 ${getTrendColor(currentMarket.priceChange)}`}>
                                                    {getTrendIcon(currentMarket.priceChange)}
                                                    <span className="text-sm ml-1">{formatPercentage(currentMarket.priceChange)}</span>
                                                </div>
                                            </div>
                                            <DollarSign className="h-8 w-8 text-blue-600" />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Median Price</p>
                                                <p className="text-2xl font-bold">{formatCurrency(currentMarket.medianPrice)}</p>
                                                <p className="text-sm text-gray-500 mt-1">50th percentile</p>
                                            </div>
                                            <Home className="h-8 w-8 text-green-600" />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Days on Market</p>
                                                <p className="text-2xl font-bold">{currentMarket.daysOnMarket}</p>
                                                <p className="text-sm text-gray-500 mt-1">Average time</p>
                                            </div>
                                            <Clock className="h-8 w-8 text-orange-600" />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Price per Sq Ft</p>
                                                <p className="text-2xl font-bold">${currentMarket.pricePerSqft}</p>
                                                <p className="text-sm text-gray-500 mt-1">Per square foot</p>
                                            </div>
                                            <Target className="h-8 w-8 text-purple-600" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Market Activity */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <BarChart3 className="h-5 w-5 mr-2" />
                                            Market Activity
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                                            <div className="flex items-center">
                                                <Users className="h-5 w-5 text-blue-600 mr-3" />
                                                <span className="font-medium">Sales Volume</span>
                                            </div>
                                            <span className="text-xl font-bold text-blue-600">{currentMarket.salesVolume}</span>
                                        </div>

                                        <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                                            <div className="flex items-center">
                                                <Home className="h-5 w-5 text-green-600 mr-3" />
                                                <span className="font-medium">Active Inventory</span>
                                            </div>
                                            <span className="text-xl font-bold text-green-600">{currentMarket.inventory}</span>
                                        </div>

                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium">Market Balance</span>
                                                <Badge variant="outline">
                                                    {currentMarket.inventory / currentMarket.salesVolume > 6
                                                        ? "Buyer's Market"
                                                        : currentMarket.inventory / currentMarket.salesVolume < 3
                                                            ? "Seller's Market"
                                                            : "Balanced"}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {(currentMarket.inventory / currentMarket.salesVolume).toFixed(1)} months of inventory
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <MapPin className="h-5 w-5 mr-2" />
                                            Location Insights
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="p-4 border rounded-lg">
                                            <h3 className="font-semibold mb-2">{currentMarket.location}</h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Market Trend</span>
                                                    <span className={`font-medium ${getTrendColor(currentMarket.priceChange)}`}>
                            {currentMarket.priceChange >= 0 ? "Appreciating" : "Declining"}
                          </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Market Speed</span>
                                                    <span className="font-medium">
                            {currentMarket.daysOnMarket < 30
                                ? "Fast"
                                : currentMarket.daysOnMarket < 60
                                    ? "Moderate"
                                    : "Slow"}
                          </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Competition</span>
                                                    <span className="font-medium">
                            {currentMarket.inventory < 100
                                ? "High"
                                : currentMarket.inventory < 200
                                    ? "Moderate"
                                    : "Low"}
                          </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                            <h4 className="font-semibold text-yellow-800 mb-2">Market Forecast</h4>
                                            <p className="text-sm text-yellow-700">
                                                Based on current trends, prices are expected to{" "}
                                                {currentMarket.priceChange >= 5
                                                    ? "continue rising strongly"
                                                    : currentMarket.priceChange >= 0
                                                        ? "remain stable with modest growth"
                                                        : "face continued pressure"}{" "}
                                                over the next quarter.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {viewType === "trends" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Price and Sales Trends</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                                        {currentMarket.trends.map((trend, index) => (
                                            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                                                <div className="text-sm text-gray-600 mb-1">{trend.month}</div>
                                                <div className="text-lg font-bold text-blue-600">{formatCurrency(trend.price)}</div>
                                                <div className="text-sm text-gray-500">{trend.sales} sales</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-6 bg-blue-50 rounded-lg">
                                        <h3 className="font-semibold mb-4">Trend Analysis</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <h4 className="font-medium mb-2">Price Movement</h4>
                                                <p className="text-gray-600">
                                                    Average price has {currentMarket.priceChange >= 0 ? "increased" : "decreased"} by{" "}
                                                    {Math.abs(currentMarket.priceChange)}% over the selected period.
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-2">Sales Activity</h4>
                                                <p className="text-gray-600">
                                                    Sales volume shows {currentMarket.salesVolume > 150 ? "strong" : "moderate"} market activity
                                                    with consistent buyer interest.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {viewType === "comparison" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Market Comparison</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-3">Location</th>
                                            <th className="text-right p-3">Avg Price</th>
                                            <th className="text-right p-3">Change</th>
                                            <th className="text-right p-3">Days on Market</th>
                                            <th className="text-right p-3">Inventory</th>
                                            <th className="text-right p-3">Price/Sq Ft</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {displayData.map((market, index) => (
                                            <tr key={index} className="border-b hover:bg-gray-50">
                                                <td className="p-3 font-medium">{market.location}</td>
                                                <td className="text-right p-3">{formatCurrency(market.averagePrice)}</td>
                                                <td className={`text-right p-3 ${getTrendColor(market.priceChange)}`}>
                                                    <div className="flex items-center justify-end">
                                                        {getTrendIcon(market.priceChange)}
                                                        <span className="ml-1">{formatPercentage(market.priceChange)}</span>
                                                    </div>
                                                </td>
                                                <td className="text-right p-3">{market.daysOnMarket} days</td>
                                                <td className="text-right p-3">{market.inventory}</td>
                                                <td className="text-right p-3">${market.pricePerSqft}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </section>
    )
}
{
}