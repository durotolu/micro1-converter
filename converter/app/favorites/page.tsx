import { FavoritesList } from "@/components/favorites-list"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Favorite Currency Pairs",
  description: "Your saved currency pairs",
}

export default function FavoritesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Favorite Currency Pairs</h1>
      <FavoritesList />
    </main>
  )
}

