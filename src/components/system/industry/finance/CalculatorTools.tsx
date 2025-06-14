"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Home, Car, PiggyBank, TrendingUp } from "lucide-react"

interface CalculatorToolsProps {
    title?: string
    subtitle?: string
    backgroundColor?: string
    textColor?: string
}

export default function CalculatorTools({
                                            title = "Financial Calculators",
                                            subtitle = "Plan your financial future with our interactive tools",
                                            backgroundColor = "bg-gray-50",
                                            textColor = "text-gray-900",
                                        }: CalculatorToolsProps) {
    // Mortgage Calculator State
    const [loanAmount, setLoanAmount] = useState("300000")
    const [interestRate, setInterestRate] = useState("6.5")
    const [loanTerm, setLoanTerm] = useState("30")
    const [monthlyPayment, setMonthlyPayment] = useState(0)

    // Savings Calculator State
    const [initialAmount, setInitialAmount] = useState("10000")
    const [monthlyContribution, setMonthlyContribution] = useState("500")
    const [savingsRate, setSavingsRate] = useState("4")
    const [savingsYears, setSavingsYears] = useState("10")
    const [futureValue, setFutureValue] = useState(0)

    // Investment Calculator State
    const [investmentAmount, setInvestmentAmount] = useState("50000")
    const [investmentRate, setInvestmentRate] = useState("8")
    const [investmentYears, setInvestmentYears] = useState("20")
    const [investmentValue, setInvestmentValue] = useState(0)

    const calculateMortgage = () => {
        const principal = Number.parseFloat(loanAmount)
        const monthlyRate = Number.parseFloat(interestRate) / 100 / 12
        const numPayments = Number.parseFloat(loanTerm) * 12

        const payment =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)

        setMonthlyPayment(payment)
    }

    const calculateSavings = () => {
        const initial = Number.parseFloat(initialAmount)
        const monthly = Number.parseFloat(monthlyContribution)
        const rate = Number.parseFloat(savingsRate) / 100 / 12
        const months = Number.parseFloat(savingsYears) * 12

        const futureInitial = initial * Math.pow(1 + rate, months)
        const futureMonthly = monthly * ((Math.pow(1 + rate, months) - 1) / rate)

        setFutureValue(futureInitial + futureMonthly)
    }

    const calculateInvestment = () => {
        const principal = Number.parseFloat(investmentAmount)
        const rate = Number.parseFloat(investmentRate) / 100
        const years = Number.parseFloat(investmentYears)

        const value = principal * Math.pow(1 + rate, years)
        setInvestmentValue(value)
    }

    return (
        <section className={`py-16 ${backgroundColor}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>{title}</h2>
                    <p className={`text-lg ${textColor} opacity-80 max-w-2xl mx-auto`}>{subtitle}</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Tabs defaultValue="mortgage" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="mortgage" className="flex items-center gap-2">
                                <Home className="h-4 w-4" />
                                Mortgage
                            </TabsTrigger>
                            <TabsTrigger value="savings" className="flex items-center gap-2">
                                <PiggyBank className="h-4 w-4" />
                                Savings
                            </TabsTrigger>
                            <TabsTrigger value="investment" className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4" />
                                Investment
                            </TabsTrigger>
                            <TabsTrigger value="loan" className="flex items-center gap-2">
                                <Car className="h-4 w-4" />
                                Loan
                            </TabsTrigger>
                        </TabsList>

                        {/* Mortgage Calculator */}
                        <TabsContent value="mortgage">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Home className="h-5 w-5" />
                                        Mortgage Payment Calculator
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="loan-amount">Loan Amount ($)</Label>
                                                <Input
                                                    id="loan-amount"
                                                    type="number"
                                                    value={loanAmount}
                                                    onChange={(e) => setLoanAmount(e.target.value)}
                                                    placeholder="300,000"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                                                <Input
                                                    id="interest-rate"
                                                    type="number"
                                                    step="0.1"
                                                    value={interestRate}
                                                    onChange={(e) => setInterestRate(e.target.value)}
                                                    placeholder="6.5"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="loan-term">Loan Term (years)</Label>
                                                <Select value={loanTerm} onValueChange={setLoanTerm}>
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

                                            <Button onClick={calculateMortgage} className="w-full">
                                                <Calculator className="h-4 w-4 mr-2" />
                                                Calculate Payment
                                            </Button>
                                        </div>

                                        <div className="bg-blue-50 p-6 rounded-lg">
                                            <h3 className="text-lg font-semibold mb-4">Results</h3>
                                            {monthlyPayment > 0 && (
                                                <div className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <span>Monthly Payment:</span>
                                                        <span className="font-bold text-blue-600">
                              ${monthlyPayment.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                            </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Total Interest:</span>
                                                        <span className="font-bold">
                              $
                                                            {(
                                                                monthlyPayment * Number.parseFloat(loanTerm) * 12 -
                                                                Number.parseFloat(loanAmount)
                                                            ).toLocaleString("en-US", { maximumFractionDigits: 2 })}
                            </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Total Amount:</span>
                                                        <span className="font-bold">
                              $
                                                            {(monthlyPayment * Number.parseFloat(loanTerm) * 12).toLocaleString("en-US", {
                                                                maximumFractionDigits: 2,
                                                            })}
                            </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Savings Calculator */}
                        <TabsContent value="savings">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <PiggyBank className="h-5 w-5" />
                                        Savings Growth Calculator
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="initial-amount">Initial Amount ($)</Label>
                                                <Input
                                                    id="initial-amount"
                                                    type="number"
                                                    value={initialAmount}
                                                    onChange={(e) => setInitialAmount(e.target.value)}
                                                    placeholder="10,000"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="monthly-contribution">Monthly Contribution ($)</Label>
                                                <Input
                                                    id="monthly-contribution"
                                                    type="number"
                                                    value={monthlyContribution}
                                                    onChange={(e) => setMonthlyContribution(e.target.value)}
                                                    placeholder="500"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="savings-rate">Annual Interest Rate (%)</Label>
                                                <Input
                                                    id="savings-rate"
                                                    type="number"
                                                    step="0.1"
                                                    value={savingsRate}
                                                    onChange={(e) => setSavingsRate(e.target.value)}
                                                    placeholder="4.0"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="savings-years">Time Period (years)</Label>
                                                <Input
                                                    id="savings-years"
                                                    type="number"
                                                    value={savingsYears}
                                                    onChange={(e) => setSavingsYears(e.target.value)}
                                                    placeholder="10"
                                                />
                                            </div>

                                            <Button onClick={calculateSavings} className="w-full">
                                                <Calculator className="h-4 w-4 mr-2" />
                                                Calculate Growth
                                            </Button>
                                        </div>

                                        <div className="bg-green-50 p-6 rounded-lg">
                                            <h3 className="text-lg font-semibold mb-4">Results</h3>
                                            {futureValue > 0 && (
                                                <div className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <span>Future Value:</span>
                                                        <span className="font-bold text-green-600">
                              ${futureValue.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                            </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Total Contributions:</span>
                                                        <span className="font-bold">
                              $
                                                            {(
                                                                Number.parseFloat(initialAmount) +
                                                                Number.parseFloat(monthlyContribution) * Number.parseFloat(savingsYears) * 12
                                                            ).toLocaleString("en-US", { maximumFractionDigits: 2 })}
                            </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Interest Earned:</span>
                                                        <span className="font-bold">
                              $
                                                            {(
                                                                futureValue -
                                                                Number.parseFloat(initialAmount) -
                                                                Number.parseFloat(monthlyContribution) * Number.parseFloat(savingsYears) * 12
                                                            ).toLocaleString("en-US", { maximumFractionDigits: 2 })}
                            </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Investment Calculator */}
                        <TabsContent value="investment">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" />
                                        Investment Growth Calculator
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="investment-amount">Initial Investment ($)</Label>
                                                <Input
                                                    id="investment-amount"
                                                    type="number"
                                                    value={investmentAmount}
                                                    onChange={(e) => setInvestmentAmount(e.target.value)}
                                                    placeholder="50,000"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="investment-rate">Expected Annual Return (%)</Label>
                                                <Input
                                                    id="investment-rate"
                                                    type="number"
                                                    step="0.1"
                                                    value={investmentRate}
                                                    onChange={(e) => setInvestmentRate(e.target.value)}
                                                    placeholder="8.0"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="investment-years">Investment Period (years)</Label>
                                                <Input
                                                    id="investment-years"
                                                    type="number"
                                                    value={investmentYears}
                                                    onChange={(e) => setInvestmentYears(e.target.value)}
                                                    placeholder="20"
                                                />
                                            </div>

                                            <Button onClick={calculateInvestment} className="w-full">
                                                <Calculator className="h-4 w-4 mr-2" />
                                                Calculate Returns
                                            </Button>
                                        </div>

                                        <div className="bg-purple-50 p-6 rounded-lg">
                                            <h3 className="text-lg font-semibold mb-4">Results</h3>
                                            {investmentValue > 0 && (
                                                <div className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <span>Future Value:</span>
                                                        <span className="font-bold text-purple-600">
                              ${investmentValue.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                            </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Total Gain:</span>
                                                        <span className="font-bold">
                              $
                                                            {(investmentValue - Number.parseFloat(investmentAmount)).toLocaleString("en-US", {
                                                                maximumFractionDigits: 2,
                                                            })}
                            </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>ROI:</span>
                                                        <span className="font-bold">
                              {(
                                  ((investmentValue - Number.parseFloat(investmentAmount)) /
                                      Number.parseFloat(investmentAmount)) *
                                  100
                              ).toFixed(1)}
                                                            %
                            </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Loan Calculator */}
                        <TabsContent value="loan">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Car className="h-5 w-5" />
                                        Personal Loan Calculator
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-8">
                                        <p className="text-gray-600">Personal loan calculator coming soon!</p>
                                        <Button variant="outline" className="mt-4">
                                            Contact Us for Loan Information
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </section>
    )
}
