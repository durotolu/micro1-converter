import { CurrencyConverter } from "@/components/currency-converter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Currency Converter",
  description: "Convert currencies with ease",
}

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Currency Converter</h1>
      <CurrencyConverter />
    </main>
  )
}

