"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CurrencySelector } from "@/components/currency-selector"
import { AmountPresets } from "@/components/amount-presets"
import { ArrowLeftRight, Star } from "lucide-react"
import { useFavorites } from "@/context/favorites-context"
import { toast } from "sonner"

// Mock exchange rates for demo purposes
const MOCK_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.59,
  CAD: 1.36,
  AUD: 1.52,
  CNY: 7.24,
  INR: 83.12,
  BRL: 5.05,
  MXN: 16.73,
}

export function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1)
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("EUR")
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { addFavorite, isFavorite } = useFavorites()

  // Perform conversion when inputs change
  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      convertCurrency()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, fromCurrency, toCurrency])

  const convertCurrency = async () => {
    setIsLoading(true)
    try {
      // In a real app, you would fetch from an API
      // For demo, we'll use mock rates
      const fromRate = MOCK_RATES[fromCurrency as keyof typeof MOCK_RATES]
      const toRate = MOCK_RATES[toCurrency as keyof typeof MOCK_RATES]

      const result = (amount / fromRate) * toRate
      setConvertedAmount(result)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (error) {
      toast.error("Conversion failed", {
        description: "There was an error converting the currency",
      })
      console.error("Error converting currency:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const handleAddFavorite = () => {
    if (amount && fromCurrency && toCurrency) {
      addFavorite({
        fromCurrency,
        toCurrency,
        amount,
      })
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    setAmount(isNaN(value) ? 0 : value)
  }

  const handlePresetClick = (presetAmount: number) => {
    setAmount(presetAmount)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Convert Currency</CardTitle>
        <CardDescription>Enter an amount and select currencies to convert</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" type="number" min="0" step="0.01" value={amount} onChange={handleAmountChange} />
          <AmountPresets onPresetClick={handlePresetClick} />
        </div>

        <div className="grid grid-cols-3 justify-between items-center">
          <div className="space-y-2">
            <Label htmlFor="from-currency">From</Label>
            <CurrencySelector id="from-currency" value={fromCurrency} onChange={setFromCurrency} />
          </div>

          <div className="self-end flex justify-center">
            <Button variant="outline" size="icon" onClick={swapCurrencies} className="self-end" aria-label="Swap currencies">
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to-currency">To</Label>
            <CurrencySelector id="to-currency" value={toCurrency} onChange={setToCurrency} />
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Converted Amount</p>
              <p className="text-2xl font-bold">
                {isLoading ? (
                  <span className="text-muted-foreground">Converting...</span>
                ) : (
                  <>{convertedAmount !== null ? `${convertedAmount.toFixed(2)} ${toCurrency}` : "-"}</>
                )}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                1 {fromCurrency} ={" "}
                {(
                  MOCK_RATES[toCurrency as keyof typeof MOCK_RATES] /
                  MOCK_RATES[fromCurrency as keyof typeof MOCK_RATES]
                ).toFixed(4)}{" "}
                {toCurrency}
              </p>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleAddFavorite}
              disabled={isFavorite(fromCurrency, toCurrency)}
              aria-label={isFavorite(fromCurrency, toCurrency) ? "Already in favorites" : "Add to favorites"}
            >
              <Star className={`h-4 w-4 ${isFavorite(fromCurrency, toCurrency) ? "fill-primary" : ""}`} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

