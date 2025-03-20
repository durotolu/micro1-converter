"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"

export type CurrencyPair = {
  id: string
  fromCurrency: string
  toCurrency: string
  amount: number
}

type FavoritesContextType = {
  favorites: CurrencyPair[]
  addFavorite: (pair: Omit<CurrencyPair, "id">) => void
  removeFavorite: (id: string) => void
  isFavorite: (fromCurrency: string, toCurrency: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<CurrencyPair[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("currencyFavorites")
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (error) {
        console.error("Failed to parse favorites from localStorage", error)
      }
    }
  }, [])

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("currencyFavorites", JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (pair: Omit<CurrencyPair, "id">) => {
    const id = `${pair.fromCurrency}-${pair.toCurrency}-${Date.now()}`
    setFavorites((prev) => [...prev, { ...pair, id }])
    toast.success("Added to favorites", {
      description: `${pair.fromCurrency} to ${pair.toCurrency} added to favorites`,
    })
  }

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((pair) => pair.id !== id))
    toast.success("Removed from favorites", {
      description: "Currency pair removed from favorites",
    })
  }

  const isFavorite = (fromCurrency: string, toCurrency: string) => {
    return favorites.some((pair) => pair.fromCurrency === fromCurrency && pair.toCurrency === toCurrency)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

