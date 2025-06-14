"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Calculator, DollarSign, Percent, Calendar, TrendingUp } from "lucide-react"

export function FinancingCalculator(props: any) {
    const [vehiclePrice, setVehiclePrice] = useState(25000)
    const [downPayment, setDownPayment] = useState(5000)
    const [interestRate, setInterestRate] = useState(4.5)
    const [loanTerm, setLoanTerm] = useState(60)
    const [monthlyPayment, setMonthlyPayment] = useState(0)
    const [totalInterest, setTotalInterest] = useState(0)
    const [totalCost, setTotalCost] = useState(0)

    useEffect(() => {
        calculatePayment()
    }, [vehiclePrice, downPayment, interestRate, loanTerm])

    const calculatePayment = () => {
        const principal = vehiclePrice - downPayment
        const monthlyRate = interestRate / 100 / 12
        const numPayments = loanTerm

        if (principal <= 0 || monthlyRate <= 0 || numPayments <= 0) {
            setMonthlyPayment(0)
            setTotalInterest(0)
            setTotalCost(0)
            return
        }

        const payment =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)

        const totalPayments = payment * numPayments
        const interest = totalPayments - principal

        setMonthlyPayment(payment)
        setTotalInterest(interest)
        setTotalCost(totalPayments + downPayment)
    }

    const downPaymentPercent = ((downPayment / vehiclePrice) * 100).toFixed(1)

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {props.title || "Auto Financing Calculator"}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {props.subtitle || "Calculate your monthly payments and explore financing options for your next vehicle"}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Calculator Inputs */}
                    <Card className="bg-white shadow-lg">
                        <CardContent className="p-8">
                            <div className="flex items-center mb-6">
                                <Calculator className="h-6 w-6 text-blue-600 mr-2" />
                                <h3 className="text-2xl font-bold">Loan Calculator</h3>
                            </div>

                            <div className="space-y-8">
                                {/* Vehicle Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Price</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            type="number"
                                            value={vehiclePrice}
                                            onChange={(e) => setVehiclePrice(Number(e.target.value))}
                                            className="pl-10"
                                            placeholder="25000"
                                        />
                                    </div>
                                    <Slider
                                        value={[vehiclePrice]}
                                        onValueChange={(value) => setVehiclePrice(value[0])}
                                        max={100000}
                                        min={5000}
                                        step={1000}
                                        className="mt-3"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>$5,000</span>
                                        <span>$100,000</span>
                                    </div>
                                </div>

                                {/* Down Payment */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Down Payment ({downPaymentPercent}%)
                                    </label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            type="number"
                                            value={downPayment}
                                            onChange={(e) => setDownPayment(Number(e.target.value))}
                                            className="pl-10"
                                            placeholder="5000"
                                        />
                                    </div>
                                    <Slider
                                        value={[downPayment]}
                                        onValueChange={(value) => setDownPayment(value[0])}
                                        max={vehiclePrice * 0.5}
                                        min={0}
                                        step={500}
                                        className="mt-3"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>$0</span>
                                        <span>${(vehiclePrice * 0.5).toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Interest Rate */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (APR)</label>
                                    <div className="relative">
                                        <Percent className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            type="number"
                                            step="0.1"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(Number(e.target.value))}
                                            className="pl-10"
                                            placeholder="4.5"
                                        />
                                    </div>
                                    <Slider
                                        value={[interestRate]}
                                        onValueChange={(value) => setInterestRate(value[0])}
                                        max={15}
                                        min={0.1}
                                        step={0.1}
                                        className="mt-3"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>0.1%</span>
                                        <span>15%</span>
                                    </div>
                                </div>

                                {/* Loan Term */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Loan Term ({Math.round(loanTerm / 12)} years)
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            type="number"
                                            value={loanTerm}
                                            onChange={(e) => setLoanTerm(Number(e.target.value))}
                                            className="pl-10"
                                            placeholder="60"
                                        />
                                    </div>
                                    <Slider
                                        value={[loanTerm]}
                                        onValueChange={(value) => setLoanTerm(value[0])}
                                        max={84}
                                        min={12}
                                        step={12}
                                        className="mt-3"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>1 year</span>
                                        <span>7 years</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <div className="space-y-6">
                        {/* Monthly Payment */}
                        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                            <CardContent className="p-8 text-center">
                                <h3 className="text-lg font-semibold mb-2">Monthly Payment</h3>
                                <div className="text-4xl font-bold mb-2">${monthlyPayment.toFixed(2)}</div>
                                <p className="text-blue-100">per month for {loanTerm} months</p>
                            </CardContent>
                        </Card>

                        {/* Payment Breakdown */}
                        <Card className="bg-white shadow-lg">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Payment Breakdown</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Vehicle Price</span>
                                        <span className="font-semibold">${vehiclePrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Down Payment</span>
                                        <span className="font-semibold text-green-600">-${downPayment.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t pt-2">
                                        <span className="text-gray-600">Loan Amount</span>
                                        <span className="font-semibold">${(vehiclePrice - downPayment).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Total Interest</span>
                                        <span className="font-semibold text-red-600">${totalInterest.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t pt-2 text-lg">
                                        <span className="font-semibold">Total Cost</span>
                                        <span className="font-bold">${totalCost.toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Financing Options */}
                        <Card className="bg-white shadow-lg">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Financing Options</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                        <div>
                                            <div className="font-semibold text-green-800">Excellent Credit</div>
                                            <div className="text-sm text-green-600">2.9% - 4.9% APR</div>
                                        </div>
                                        <Badge className="bg-green-600">Best Rate</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                        <div>
                                            <div className="font-semibold text-blue-800">Good Credit</div>
                                            <div className="text-sm text-blue-600">4.9% - 7.9% APR</div>
                                        </div>
                                        <Badge variant="outline">Good Rate</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                        <div>
                                            <div className="font-semibold text-yellow-800">Fair Credit</div>
                                            <div className="text-sm text-yellow-600">7.9% - 12.9% APR</div>
                                        </div>
                                        <Badge variant="outline">Standard Rate</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                                <TrendingUp className="h-5 w-5 mr-2" />
                                Apply for Financing
                            </Button>
                            <Button variant="outline" className="w-full">
                                Get Pre-Approved
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
