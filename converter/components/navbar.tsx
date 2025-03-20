"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Home, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Currency Converter</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/" ? "text-foreground" : "text-foreground/60",
              )}
            >
              Home
            </Link>
            <Link
              href="/favorites"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/favorites" ? "text-foreground" : "text-foreground/60",
              )}
            >
              Favorites
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="flex md:hidden">
              <Link href="/">
                <Button variant="ghost" size="icon" className={cn(pathname === "/" && "bg-accent")}>
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Home</span>
                </Button>
              </Link>
              <Link href="/favorites">
                <Button variant="ghost" size="icon" className={cn(pathname === "/favorites" && "bg-accent")}>
                  <Star className="h-5 w-5" />
                  <span className="sr-only">Favorites</span>
                </Button>
              </Link>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

