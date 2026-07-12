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

const defaultContext: ThemeContextValue = {
  theme: "light",
  resolvedTheme: "light",
  setTheme: () => {},
}

const ThemeContext = React.createContext<ThemeContextValue>(defaultContext)

export function useTheme(): ThemeContextValue {
  return React.useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("light")
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">("light")
  const [mounted, setMounted] = React.useState(false)

  // Load saved theme on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null
    setThemeState(saved || "system")
    setMounted(true)
  }, [])

  // Resolve "system" to light/dark, apply class
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const applyTheme = () => {
      let resolved: "light" | "dark"
      if (theme === "system") {
        resolved = mediaQuery.matches ? "dark" : "light"
      } else {
        resolved = theme
      }
      setResolvedTheme(resolved)
      
      if (resolved === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }

    applyTheme()
    mediaQuery.addEventListener("change", applyTheme)
    return () => mediaQuery.removeEventListener("change", applyTheme)
  }, [theme])

  const setTheme = React.useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
  }, [])

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  )

  return (
    <ThemeContext.Provider value={value}>
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
