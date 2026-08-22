"use client";

import { use, useEffect, useState, useMemo } from "react";
import { products, Category, Size, Firmness } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import gsap from "gsap";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X, Filter } from "lucide-react";
import { useShopStore } from "@/lib/store";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function ShopPage({ params }: { params: Promise<{ category?: string[] }> }) {
  const unwrappedParams = use(params);
  const categoryParam = unwrappedParams.category?.[0];
  
  const { activeFilters, setFilter, clearFilters } = useShopStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Sync route category with store if present on mount
  useEffect(() => {
    if (categoryParam) {
      const formatted = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
      setFilter("categories", [formatted]);
    }
  }, [categoryParam]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    // Categories
    if (activeFilters.categories.length > 0) {
      result = result.filter(p => activeFilters.categories.includes(p.category));
    }

    // Sizes
    if (activeFilters.sizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => activeFilters.sizes.includes(s)));
    }

    // Firmness
    if (activeFilters.firmness.length > 0) {
      result = result.filter(p => p.firmness?.some(f => activeFilters.firmness.includes(f)));
    }

    // Price
    result = result.filter(p => p.price >= activeFilters.priceRange[0] && p.price <= activeFilters.priceRange[1]);

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // mock logic
        break;
      default:
        // featured
        break;
    }

    return result;
  }, [searchQuery, activeFilters, sortBy]);

  // Animate grid items on filter change
  useEffect(() => {
    const cards = document.querySelectorAll('.product-grid-item');
    if (cards.length > 0) {
      gsap.fromTo(cards, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [filteredProducts]);

  const FilterContent = () => (
    <div className="space-y-10">
      {/* Category */}
      <div>
        <h4 className="font-heading text-lg mb-4 text-core-ink">Category</h4>
        <div className="space-y-3">
          {["Mattresses", "Pillows", "Bedding", "Bundles"].map(cat => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox 
                id={`cat-${cat}`}
                checked={activeFilters.categories.includes(cat)}
                onCheckedChange={(checked) => {
                  const newCats = checked 
                    ? [...activeFilters.categories, cat] 
                    : activeFilters.categories.filter(c => c !== cat);
                  setFilter("categories", newCats);
                }}
              />
              <label htmlFor={`cat-${cat}`} className="text-sm font-medium leading-none text-core-ink">{cat}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="font-heading text-lg mb-4 text-core-ink">Price Range</h4>
        <Slider 
          defaultValue={[0, 3000]}
          value={activeFilters.priceRange}
          max={3000}
          step={50}
          onValueChange={(val) => setFilter("priceRange", val as [number, number])}
          className="mb-4"
        />
        <div className="flex justify-between text-xs text-core-muted-foreground">
          <span>${activeFilters.priceRange[0]}</span>
          <span>${activeFilters.priceRange[1]}</span>
        </div>
      </div>

      {/* Size */}
      <div>
        <h4 className="font-heading text-lg mb-4 text-core-ink">Size</h4>
        <div className="space-y-3">
          {["Twin", "Full", "Queen", "King", "Cal King", "Standard"].map(size => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox 
                id={`size-${size}`}
                checked={activeFilters.sizes.includes(size)}
                onCheckedChange={(checked) => {
                  const newSizes = checked 
                    ? [...activeFilters.sizes, size] 
                    : activeFilters.sizes.filter(s => s !== size);
                  setFilter("sizes", newSizes);
                }}
              />
              <label htmlFor={`size-${size}`} className="text-sm font-medium leading-none text-core-ink">{size}</label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Firmness */}
      <div>
        <h4 className="font-heading text-lg mb-4 text-core-ink">Firmness</h4>
        <div className="space-y-3">
          {["Plush", "Medium", "Firm"].map(firmness => (
            <div key={firmness} className="flex items-center space-x-2">
              <Checkbox 
                id={`firmness-${firmness}`}
                checked={activeFilters.firmness.includes(firmness)}
                onCheckedChange={(checked) => {
                  const newFirms = checked 
                    ? [...activeFilters.firmness, firmness] 
                    : activeFilters.firmness.filter(f => f !== firmness);
                  setFilter("firmness", newFirms);
                }}
              />
              <label htmlFor={`firmness-${firmness}`} className="text-sm font-medium leading-none text-core-ink">{firmness}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-core-bg min-h-screen pt-24 pb-32">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Header Area */}
        <div className="mb-12">
          <h1 className="font-heading text-4xl md:text-5xl text-core-ink mb-4">
            {categoryParam ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}` : "All Products"}
          </h1>
          <p className="text-core-muted-foreground">Find your perfect sleep setup.</p>
        </div>

        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-y border-core-line py-4 mb-12">
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Mobile Filter Trigger */}
            <Sheet>
              <SheetTrigger className="md:hidden flex items-center gap-2 border border-core-line px-4 py-2 rounded-sm text-sm uppercase tracking-widest font-medium">
                <Filter className="w-4 h-4" /> Filters
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-md bg-core-bg border-r border-core-line">
                <SheetHeader className="mb-8">
                  <SheetTitle className="font-heading text-2xl text-core-ink">Filters</SheetTitle>
                </SheetHeader>
                <FilterContent />
              </SheetContent>
            </Sheet>

            {/* Search */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-core-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border border-core-line rounded-sm pl-10 pr-4 py-2 text-sm text-core-ink focus:outline-none focus:border-core-gold"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
            <span className="text-sm text-core-muted-foreground">{filteredProducts.length} Results</span>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-transparent border-core-line">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading text-2xl text-core-ink">Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-xs uppercase tracking-widest text-core-muted-foreground hover:text-core-ink transition-colors"
                >
                  Clear All
                </button>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Active filter chips */}
            {(activeFilters.categories.length > 0 || activeFilters.sizes.length > 0 || activeFilters.firmness.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-8">
                {[...activeFilters.categories, ...activeFilters.sizes, ...activeFilters.firmness].map(chip => (
                  <span key={chip} className="inline-flex items-center gap-1 bg-core-muted px-3 py-1 rounded-sm text-xs font-medium uppercase tracking-wider text-core-ink">
                    {chip}
                    <button onClick={() => {
                      if (activeFilters.categories.includes(chip as any)) setFilter("categories", activeFilters.categories.filter(c => c !== chip));
                      if (activeFilters.sizes.includes(chip as any)) setFilter("sizes", activeFilters.sizes.filter(c => c !== chip));
                      if (activeFilters.firmness.includes(chip as any)) setFilter("firmness", activeFilters.firmness.filter(c => c !== chip));
                    }}>
                      <X className="w-3 h-3 hover:text-core-accent transition-colors" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="text-center py-32">
                <h3 className="font-heading text-2xl text-core-ink mb-4">No results found</h3>
                <p className="text-core-muted-foreground mb-8">Try adjusting your filters or search query.</p>
                <button onClick={clearFilters} className="border border-core-ink px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-core-ink hover:text-white transition-colors">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-grid-item opacity-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
