"use client"

import { useState, useCallback } from "react"

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

let toastId = 0
const toasts: Toast[] = []
const listeners: Set<(toasts: Toast[]) => void> = new Set()

function notify() {
  listeners.forEach(listener => listener([...toasts]))
}

export function useToast() {
  const [state, setState] = useState<Toast[]>(toasts)

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const newToast: Toast = {
      ...toast,
      id: `toast-${++toastId}`,
    }
    toasts.push(newToast)
    notify()
    return newToast.id
  }, [])

  const dismissToast = useCallback((id: string) => {
    const index = toasts.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.splice(index, 1)
      notify()
    }
  }, [])

  return {
    toasts: state,
    toast: addToast,
    dismiss: dismissToast,
  }
}

export function toast(options: Omit<Toast, "id">) {
  return useToast().toast(options)
}