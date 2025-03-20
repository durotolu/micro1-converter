"use client"

import { useState } from "react"
import { useFavorites, type CurrencyPair } from "@/context/favorites-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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

export function FavoritesList() {
  const { favorites, removeFavorite } = useFavorites()
  const [pairToDelete, setPairToDelete] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const calculateConversion = (pair: CurrencyPair) => {
    const fromRate = MOCK_RATES[pair.fromCurrency as keyof typeof MOCK_RATES]
    const toRate = MOCK_RATES[pair.toCurrency as keyof typeof MOCK_RATES]
    return (pair.amount / fromRate) * toRate
  }

  const handleDeleteClick = (id: string) => {
    setPairToDelete(id)
    setIsDialogOpen(true)
  }

  const confirmDelete = () => {
    if (pairToDelete) {
      removeFavorite(pairToDelete)
      setPairToDelete(null)
      setIsDialogOpen(false)
    }
  }

  const cancelDelete = () => {
    setPairToDelete(null)
    setIsDialogOpen(false)
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
        <p className="text-muted-foreground mb-6">Add currency pairs to your favorites from the converter page</p>
        <Link href="/">
          <Button>Go to Converter</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((pair) => {
          const convertedAmount = calculateConversion(pair)

          return (
            <Card key={pair.id} className="relative">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{pair.fromCurrency}</span>
                  <ArrowRight className="h-4 w-4 mx-2" />
                  <span>{pair.toCurrency}</span>
                </CardTitle>
                <CardDescription>
                  Saved amount: {pair.amount} {pair.fromCurrency}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {convertedAmount.toFixed(2)} {pair.toCurrency}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  1 {pair.fromCurrency} ={" "}
                  {(
                    MOCK_RATES[pair.toCurrency as keyof typeof MOCK_RATES] /
                    MOCK_RATES[pair.fromCurrency as keyof typeof MOCK_RATES]
                  ).toFixed(4)}{" "}
                  {pair.toCurrency}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Link href={`/?from=${pair.fromCurrency}&to=${pair.toCurrency}&amount=${pair.amount}`}>
                  <Button variant="outline" size="sm">
                    Use This Pair
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDeleteClick(pair.id)}
                  className="text-destructive hover:text-destructive"
                  aria-label="Remove from favorites"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this currency pair from your favorites? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

