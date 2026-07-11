"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Search, Filter, Grid, List, ChevronDown, X } from "lucide-react"
import { products, categories, brands } from "@/lib/data"
import { ProductCard } from "@/components/home/ProductCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { formatPrice } from "@/lib/utils"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000])
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating" | "newest">("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price
        case "price-high": return b.price - a.price
        case "rating": return b.rating - a.rating
        case "newest": return 0
        default: return 0
      }
    })
  }, [searchQuery, selectedCategory, selectedBrands, priceRange, sortBy])

  const activeFiltersCount = (selectedCategory !== "all" ? 1 : 0) + selectedBrands.length + (priceRange[0] > 0 || priceRange[1] < 200000 ? 1 : 0)

  return (
    <div className="min-h-screen bg-white dark:bg-graphite-900">
      <div className="pt-24 pb-8 bg-slate-50 dark:bg-graphite-800/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-graphite-900 dark:text-white mb-2">All Products</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Browse our complete catalog of premium electronics
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="primary" className="ml-2">{activeFiltersCount}</Badge>
                )}
                <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </Button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label className="block text-sm font-medium text-graphite-900 dark:text-white mb-2">Category</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name} ({cat.count})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="block text-sm font-medium text-graphite-900 dark:text-white mb-2">Brands</Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between h-auto py-2">
                            {selectedBrands.length === 0 ? "Select Brands" : `${selectedBrands.length} selected`}
                            <ChevronDown className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 max-h-64 overflow-y-auto">
                          <DropdownMenuLabel>Select Brands</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {brands.map(brand => (
                            <DropdownMenuCheckboxItem
                              key={brand.id}
                              checked={selectedBrands.includes(brand.id)}
                              onCheckedChange={checked => {
                                if (checked) setSelectedBrands([...selectedBrands, brand.id])
                                else setSelectedBrands(selectedBrands.filter(b => b !== brand.id))
                              }}
                            >
                              {brand.name} ({brand.productCount})
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div>
                      <Label className="block text-sm font-medium text-graphite-900 dark:text-white mb-2">
                        Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                      </Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="200000"
                          value={priceRange[0]}
                          onChange={e => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                          className="flex-1 accent-primary-600"
                        />
                        <input
                          type="range"
                          min="0"
                          max="200000"
                          value={priceRange[1]}
                          onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="flex-1 accent-primary-600"
                        />
                      </div>
                    </div>

                    {activeFiltersCount > 0 && (
                      <Button variant="ghost" size="sm" className="w-full text-red-600 hover:text-red-700" onClick={() => {
                        setSelectedCategory("all")
                        setSelectedBrands([])
                        setPriceRange([0, 200000])
                      }}>
                        <X className="h-4 w-4 mr-2" aria-hidden="true" />
                        Clear All Filters
                      </Button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                  aria-label="Search products"
                />
              </div>

              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy} className="w-44">
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-slate-200 dark:border-graphite-700 rounded-xl overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                  >
                    <Grid className="h-5 w-5" aria-hidden="true" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                  >
                    <List className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Showing <span className="font-semibold text-graphite-900 dark:text-white">{filteredProducts.length}</span> of {products.length} products
            </p>

            <AnimatePresence mode="popLayout">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                className={viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "space-y-4"
                }
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full flex flex-col items-center justify-center py-16 text-center"
                  >
                    <Search className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" aria-hidden="true" />
                    <h3 className="text-xl font-semibold text-graphite-900 dark:text-white mb-2">No products found</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">Try adjusting your filters or search terms</p>
                    <Button variant="ghost" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSelectedBrands([]); setPriceRange([0, 200000]) }}>
                      <X className="h-4 w-4 mr-2" aria-hidden="true" />
                      Clear All Filters
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {filteredProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-10 flex justify-center"
              >
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Load More Products
                </Button>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}