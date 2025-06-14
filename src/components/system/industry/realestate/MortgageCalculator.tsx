"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, DollarSign, Calendar, TrendingUp, PieChart } from "lucide-react"

interface MortgageCalculation {
    monthlyPayment: number
    totalInterest: number
    totalPayment: number
    paymentBreakdown: {
        principal: number
        interest: number
        taxes: number
        insurance: number
        pmi: number
    }
}

interface MortgageCalculatorProps {
    title?: string
    subtitle?: string
    defaultValues?: {
        homePrice: number
        downPayment: number
        loanTerm: number
        interestRate: number
    }
}

export default function MortgageCalculator({
                                               title = "Mortgage Calculator",
                                               subtitle = "Calculate your monthly mortgage payments and explore different scenarios",
                                               defaultValues,
                                           }: MortgageCalculatorProps) {
    const [homePrice, setHomePrice] = useState(defaultValues?.homePrice || 400000)
    const [downPaymentPercent, setDownPaymentPercent] = useState(20)
    const [loanTerm, setLoanTerm] = useState(defaultValues?.loanTerm || 30)
    const [interestRate, setInterestRate] = useState(defaultValues?.interestRate || 6.5)
    const [propertyTax, setPropertyTax] = useState(1.2)
    const [homeInsurance, setHomeInsurance] = useState(0.5)
    const [pmiRate, setPmiRate] = useState(0.5)
    const [calculation, setCalculation] = useState<MortgageCalculation | null>(null)
    const [showAmortization, setShowAmortization] = useState(false)

    const downPaymentAmount = (homePrice * downPaymentPercent) / 100
    const loanAmount = homePrice - downPaymentAmount
    const needsPMI = downPaymentPercent < 20

    useEffect(() => {
        calculateMortgage()
    }, [homePrice, downPaymentPercent, loanTerm, interestRate, propertyTax, homeInsurance, pmiRate])

    const calculateMortgage = () => {
        const principal = loanAmount
        const monthlyRate = interestRate / 100 / 12
        const numPayments = loanTerm * 12

        // Calculate monthly principal and interest
        const monthlyPI =
            (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
            (Math.pow(1 + monthlyRate, numPayments) - 1)

        // Calculate other monthly costs
        const monthlyTaxes = (homePrice * propertyTax) / 100 / 12
        const monthlyInsurance = (homePrice * homeInsurance) / 100 / 12
        const monthlyPMI = needsPMI ? (loanAmount * pmiRate) / 100 / 12 : 0

        const totalMonthlyPayment = monthlyPI + monthlyTaxes + monthlyInsurance + monthlyPMI
        const totalInterest = monthlyPI * numPayments - principal
        const totalPayment = monthlyPI * numPayments

        setCalculation({
            monthlyPayment: totalMonthlyPayment,
            totalInterest,
            totalPayment,
            paymentBreakdown: {
                principal: monthlyPI - principal * monthlyRate,
                interest: principal * monthlyRate,
                taxes: monthlyTaxes,
                insurance: monthlyInsurance,
                pmi: monthlyPMI,
            },
        })
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const formatCurrencyDetailed = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount)
    }

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Calculator Inputs */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Calculator className="h-5 w-5 mr-2" />
                                        Loan Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <Label htmlFor="homePrice">Home Price</Label>
                                        <Input
                                            id="homePrice"
                                            type="number"
                                            value={homePrice}
                                            onChange={(e) => setHomePrice(Number(e.target.value))}
                                            className="text-lg"
                                        />
                                    </div>

                                    <div>
                                        <Label>
                                            Down Payment: {downPaymentPercent}% ({formatCurrency(downPaymentAmount)})
                                        </Label>
                                        <Slider
                                            value={[downPaymentPercent]}
                                            onValueChange={(value) => setDownPaymentPercent(value[0])}
                                            max={50}
                                            min={0}
                                            step={1}
                                            className="mt-2"
                                        />
                                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                                            <span>0%</span>
                                            <span>50%</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="loanTerm">Loan Term</Label>
                                            <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="15">15 years</SelectItem>
                                                    <SelectItem value="20">20 years</SelectItem>
                                                    <SelectItem value="25">25 years</SelectItem>
                                                    <SelectItem value="30">30 years</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="interestRate">Interest Rate (%)</Label>
                                            <Input
                                                id="interestRate"
                                                type="number"
                                                step="0.1"
                                                value={interestRate}
                                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Additional Costs</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="propertyTax">Property Tax Rate (%)</Label>
                                        <Input
                                            id="propertyTax"
                                            type="number"
                                            step="0.1"
                                            value={propertyTax}
                                            onChange={(e) => setPropertyTax(Number(e.target.value))}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="homeInsurance">Home Insurance Rate (%)</Label>
                                        <Input
                                            id="homeInsurance"
                                            type="number"
                                            step="0.1"
                                            value={homeInsurance}
                                            onChange={(e) => setHomeInsurance(Number(e.target.value))}
                                        />
                                    </div>

                                    {needsPMI && (
                                        <div>
                                            <Label htmlFor="pmiRate">PMI Rate (%)</Label>
                                            <Input
                                                id="pmiRate"
                                                type="number"
                                                step="0.1"
                                                value={pmiRate}
                                                onChange={(e) => setPmiRate(Number(e.target.value))}
                                            />
                                            <p className="text-sm text-gray-500 mt-1">PMI is required when down payment is less than 20%</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Results */}
                        <div className="space-y-6">
                            {calculation && (
                                <>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center">
                                                <DollarSign className="h-5 w-5 mr-2" />
                                                Monthly Payment
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-center">
                                                <div className="text-4xl font-bold text-blue-600 mb-2">
                                                    {formatCurrency(calculation.monthlyPayment)}
                                                </div>
                                                <p className="text-gray-600">Total Monthly Payment</p>
                                            </div>

                                            <div className="mt-6 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">Principal & Interest</span>
                                                    <span className="font-medium">
                            {formatCurrencyDetailed(
                                calculation.paymentBreakdown.principal + calculation.paymentBreakdown.interest,
                            )}
                          </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">Property Taxes</span>
                                                    <span className="font-medium">
                            {formatCurrencyDetailed(calculation.paymentBreakdown.taxes)}
                          </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">Home Insurance</span>
                                                    <span className="font-medium">
                            {formatCurrencyDetailed(calculation.paymentBreakdown.insurance)}
                          </span>
                                                </div>
                                                {needsPMI && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600">PMI</span>
                                                        <span className="font-medium">
                              {formatCurrencyDetailed(calculation.paymentBreakdown.pmi)}
                            </span>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center">
                                                <TrendingUp className="h-5 w-5 mr-2" />
                                                Loan Summary
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(loanAmount)}</div>
                                                    <p className="text-sm text-gray-600">Loan Amount</p>
                                                </div>
                                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                                    <div className="text-2xl font-bold text-green-600">{formatCurrency(downPaymentAmount)}</div>
                                                    <p className="text-sm text-gray-600">Down Payment</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Total Interest Paid</span>
                                                    <span className="font-bold text-red-600">{formatCurrency(calculation.totalInterest)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Total Amount Paid</span>
                                                    <span className="font-bold">{formatCurrency(calculation.totalPayment)}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center">
                                                <PieChart className="h-5 w-5 mr-2" />
                                                Payment Breakdown
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                <div className="flex items-center">
                                                    <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                                                    <span className="text-sm flex-1">Principal & Interest</span>
                                                    <span className="text-sm font-medium">
                            {Math.round(
                                ((calculation.paymentBreakdown.principal + calculation.paymentBreakdown.interest) /
                                    calculation.monthlyPayment) *
                                100,
                            )}
                                                        %
                          </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                                                    <span className="text-sm flex-1">Property Taxes</span>
                                                    <span className="text-sm font-medium">
                            {Math.round((calculation.paymentBreakdown.taxes / calculation.monthlyPayment) * 100)}%
                          </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                                                    <span className="text-sm flex-1">Home Insurance</span>
                                                    <span className="text-sm font-medium">
                            {Math.round((calculation.paymentBreakdown.insurance / calculation.monthlyPayment) * 100)}%
                          </span>
                                                </div>
                                                {needsPMI && (
                                                    <div className="flex items-center">
                                                        <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                                                        <span className="text-sm flex-1">PMI</span>
                                                        <span className="text-sm font-medium">
                              {Math.round((calculation.paymentBreakdown.pmi / calculation.monthlyPayment) * 100)}%
                            </span>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="text-center">
                                        <Button onClick={() => setShowAmortization(!showAmortization)} variant="outline" className="w-full">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            {showAmortization ? "Hide" : "Show"} Amortization Schedule
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {showAmortization && calculation && (
                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle>Amortization Schedule (First 12 Months)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-2">Month</th>
                                            <th className="text-right p-2">Payment</th>
                                            <th className="text-right p-2">Principal</th>
                                            <th className="text-right p-2">Interest</th>
                                            <th className="text-right p-2">Balance</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {Array.from({ length: 12 }, (_, i) => {
                                            const monthlyRate = interestRate / 100 / 12
                                            const monthlyPI = calculation.paymentBreakdown.principal + calculation.paymentBreakdown.interest
                                            const remainingBalance = loanAmount - calculation.paymentBreakdown.principal * (i + 1)
                                            const interestPayment = remainingBalance * monthlyRate
                                            const principalPayment = monthlyPI - interestPayment

                                            return (
                                                <tr key={i} className="border-b">
                                                    <td className="p-2">{i + 1}</td>
                                                    <td className="text-right p-2">{formatCurrencyDetailed(monthlyPI)}</td>
                                                    <td className="text-right p-2">{formatCurrencyDetailed(principalPayment)}</td>
                                                    <td className="text-right p-2">{formatCurrencyDetailed(interestPayment)}</td>
                                                    <td className="text-right p-2">{formatCurrency(remainingBalance)}</td>
                                                </tr>
                                            )
                                        })}
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
