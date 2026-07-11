"use client"

import { useState, useEffect, useCallback } from "react"

export type Toast = {
  id: string
  title: string
  description?: string
  variant?: "default" | "destructive" | "success" | "warning"
  action?: {
    label: string
    onClick: () => void
  }
}

// Global toast store (works outside React)
let toastId = 0
let globalToasts: Toast[] = []
const listeners = new Set<(toasts: Toast[]) => void>()

function notifyListeners() {
  const snapshot = [...globalToasts]
  listeners.forEach((fn) => fn(snapshot))
}

/** Add a toast globally (can be called anywhere, not just React components) */
export function toast(options: Omit<Toast, "id">): string {
  const newToast: Toast = {
    ...options,
    id: `toast-${++toastId}`,
  }
  globalToasts = [...globalToasts, newToast]
  notifyListeners()
  return newToast.id
}

/** Dismiss a toast by ID */
export function dismissToast(id: string) {
  globalToasts = globalToasts.filter((t) => t.id !== id)
  notifyListeners()
}

/** React hook to subscribe to toast state */
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>(globalToasts)

  useEffect(() => {
    const handler = (snapshot: Toast[]) => setToasts(snapshot)
    listeners.add(handler)
    return () => {
      listeners.delete(handler)
    }
  }, [])

  return {
    toasts,
    toast,
    dismiss: dismissToast,
  }
}
