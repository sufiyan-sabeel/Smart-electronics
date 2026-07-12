"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

type Theme = "light" | "dark" | "system"

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: "light" | "dark"
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">("light")
  const [mounted, setMounted] = React.useState(false)

  // Load saved theme on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null
    if (saved) {
      setThemeState(saved)
    }
    setMounted(true)
  }, [])

  // Resolve "system" to light/dark
  React.useEffect(() => {
    if (!mounted) return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const resolve = () => {
      let resolved: "light" | "dark"
      if (theme === "system") {
        resolved = mediaQuery.matches ? "dark" : "light"
      } else {
        resolved = theme
      }
      setResolvedTheme(resolved)

      // Apply class to html element for Tailwind dark mode
      if (resolved === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }

    resolve()
    mediaQuery.addEventListener("change", resolve)
    return () => mediaQuery.removeEventListener("change", resolve)
  }, [theme, mounted])

  const setTheme = React.useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
  }, [])

  // Prevent hydration flash
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()

  const toggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
        "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-graphite-800",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        className
      )}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun
        className={cn(
          "h-5 w-5 transition-all",
          resolvedTheme === "dark" ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-all",
          resolvedTheme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
        aria-hidden="true"
      />
    </button>
  )
}
