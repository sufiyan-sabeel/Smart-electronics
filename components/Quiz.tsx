"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { products } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Sparkles, Smartphone, Laptop, Zap, Gamepad2, Monitor, ChevronRight, CheckCircle2 } from "lucide-react"

type Answer = string | null

const questions = [
  {
    id: "budget",
    icon: Zap,
    question: "What's your budget range?",
    options: [
      { value: "budget", label: "Under ₹15,000", icon: Monitor },
      { value: "mid", label: "₹15,000 - ₹50,000", icon: Monitor },
      { value: "premium", label: "₹50,000 - ₹1,00,000", icon: Monitor },
      { value: "flagship", label: "Above ₹1,00,000", icon: Monitor },
    ],
  },
  {
    id: "use",
    icon: Gamepad2,
    question: "What will you use it for most?",
    options: [
      { value: "daily", label: "Daily & Social Media", icon: Smartphone },
      { value: "work", label: "Work & Productivity", icon: Laptop },
      { value: "gaming", label: "Gaming & Entertainment", icon: Gamepad2 },
      { value: "creative", label: "Creative & Design", icon: Monitor },
    ],
  },
  {
    id: "category",
    icon: Sparkles,
    question: "Which category interests you most?",
    options: [
      { value: "smartphones", label: "Smartphones", icon: Smartphone },
      { value: "laptops", label: "Laptops", icon: Laptop },
      { value: "audio", label: "Audio & Headphones", icon: Sparkles },
      { value: "accessories", label: "Accessories", icon: Zap },
    ],
  },
  {
    id: "priority",
    icon: Zap,
    question: "What matters most to you?",
    options: [
      { value: "performance", label: "Performance & Speed", icon: Zap },
      { value: "camera", label: "Camera Quality", icon: Smartphone },
      { value: "battery", label: "Battery Life", icon: Zap },
      { value: "design", label: "Design & Portability", icon: Laptop },
    ],
  },
]

const recommendations: Record<string, string> = {
  "budget_daily_smartphones_performance": "galaxy-s24-ultra",
  "budget_work_laptops_performance": "dell-xps-14",
  "mid_daily_smartphones_camera": "iphone-15-pro-max",
  "mid_work_laptops_battery": "macbook-air-m3",
  "premium_daily_smartphones_camera": "iphone-15-pro-max",
  "premium_work_laptops_performance": "macbook-air-m3",
  "premium_gaming_laptops_performance": "dell-xps-14",
  "flagship_daily_smartphones_camera": "iphone-15-pro-max",
  "flagship_creative_laptops_design": "macbook-air-m3",
}

function getRecommendation(answers: Answer[]): string {
  const key = answers.filter(Boolean).join("_")
  return recommendations[key] || products[Math.floor(Math.random() * products.length)].id
}

export function Quiz() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([null, null, null, null])
  const [recommended, setRecommended] = useState<string | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
  }, [])

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[step] = value
    setAnswers(newAnswers)

    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      const rec = getRecommendation(newAnswers)
      setRecommended(rec)
    }
  }

  const reset = () => {
    setStep(0)
    setAnswers([null, null, null, null])
    setRecommended(null)
    setIsOpen(false)
  }

  const currentQuestion = questions[step]
  const recommendedProduct = recommended ? products.find(p => p.id === recommended) : null

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-blue-600 text-white text-sm font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] transition-all"
        aria-label="Find your perfect device quiz"
      >
        <Sparkles className="h-4 w-4" />
        <span className="hidden sm:inline">Find Your Device</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && reset()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="w-full max-w-lg"
            >
              <Card className="border-slate-200 dark:border-graphite-700 shadow-2xl">
                <CardContent className="p-6 sm:p-8">
                  {!recommendedProduct ? (
                    <>
                      {/* Progress bar */}
                      <div className="flex gap-1.5 mb-8">
                        {questions.map((_, i) => (
                          <motion.div
                            key={i}
                            className={cn(
                              "h-1.5 flex-1 rounded-full transition-colors",
                              i <= step ? "bg-primary-500" : "bg-slate-200 dark:bg-graphite-700"
                            )}
                            layout
                            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                          />
                        ))}
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                        >
                          <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                              <currentQuestion.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                Question {step + 1} of {questions.length}
                              </p>
                              <h3 className="text-lg font-semibold text-graphite-900 dark:text-white">
                                {currentQuestion.question}
                              </h3>
                            </div>
                          </div>

                          <div className="space-y-2.5">
                            {currentQuestion.options.map((opt, i) => (
                              <motion.button
                                key={opt.value}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: prefersReducedMotion ? 0 : i * 0.08 }}
                                onClick={() => handleAnswer(opt.value)}
                                className={cn(
                                  "w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200",
                                  "border border-slate-200 dark:border-graphite-700",
                                  "hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20",
                                  "active:scale-[0.99]"
                                )}
                              >
                                <opt.icon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                                <span className="font-medium text-graphite-900 dark:text-white">{opt.label}</span>
                                <ChevronRight className="h-4 w-4 ml-auto text-slate-400" />
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </>
                  ) : (
                    /* Result */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
                      className="text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: prefersReducedMotion ? 0 : 0.1 }}
                        className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-4"
                      >
                        <CheckCircle2 className="h-8 w-8" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-graphite-900 dark:text-white mb-2">
                        We Found Your Match!
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-6">
                        Based on your preferences, we recommend:
                      </p>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
                        className="p-4 rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border border-primary-200 dark:border-primary-800/30 mb-6"
                      >
                        <p className="font-bold text-lg text-graphite-900 dark:text-white">
                          {recommendedProduct.name}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          {recommendedProduct.brand} • ₹{recommendedProduct.price.toLocaleString("en-IN")}
                        </p>
                      </motion.div>

                      <div className="flex gap-3">
                        <Button className="flex-1" asChild>
                          <a href={`/products/${recommendedProduct.id}`}>View Product</a>
                        </Button>
                        <Button variant="outline" onClick={reset}>
                          Try Again
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
