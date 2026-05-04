import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { useSearchParams } from "react-router-dom";
import { getProducts } from "@/store/slices/productSlice"; // Fixed casing to match standard

import HeroBanner from "@/components/HeroBanner";
import TopDeals from "@/components/TopDeals";
import CategorySection from "@/components/CategorySection";
import BrandLogos from "@/components/BrandLogos";
import TrustBadges from "@/components/TrustBadges";
import BulkOrderCTA from "@/components/BulkOrderCTA";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const dispatch = useDispatch();
  
  // ✅ 1. Read Search and Filter params from the URL
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const brandFilter = searchParams.get("brand");
  const searchQuery = searchParams.get("search") || ""; // Reads from ?search=...

  const { items: products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProducts());
    }
  }, [status, dispatch]);

  /* ===========================
      AUTO GROUP BY CATEGORY
  ============================ */
  const categoryMap = useMemo(() => {
    const map = {};
    products.forEach((product) => {
      const category = String(product?.category || "Other Items").trim();
      if (!map[category]) map[category] = [];
      map[category].push(product);
    });
    return Object.entries(map); 
  }, [products]);

  /* ===========================
      ✅ 2. UPDATED FILTER LOGIC
  ============================ */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (categoryFilter) {
      result = result.filter((p) =>
        p.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Brand Filter
    if (brandFilter) {
      result = result.filter((p) =>
        p.brand?.toLowerCase() === brandFilter.toLowerCase()
      );
    }

    // ✅ Activated Search Query Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) || // Check title
          p.name?.toLowerCase().includes(q) ||  // Check name
          p.brand?.toLowerCase().includes(q) || // Check brand
          p.category?.toLowerCase().includes(q) // Check category
      );
    }

    return result;
  }, [products, categoryFilter, brandFilter, searchQuery]);

  /* ===========================
      RENDER HELPERS
  ============================ */
  if (status === 'loading') {
    return (
      <div className="max-w-7xl mx-auto p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
           <Skeleton key={i} className="h-64 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="p-20 text-center">
        <h2 className="text-red-500 font-bold text-xl mb-2">Connection Failed</h2>
        <p className="text-slate-500">{error}</p>
      </div>
    );
  }

  const topDeals = products.filter((p) => p.is_featured === true);
  const isFiltering = !!(categoryFilter || brandFilter || searchQuery);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="">
        {!isFiltering ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HeroBanner />

            <TopDeals
              products={
                topDeals.length > 0
                  ? topDeals
                  : products.slice(0, 8)
              }
            />

            <BrandLogos />

            {categoryMap.map(([categoryName, categoryProducts], index) => (
              <CategorySection
                key={categoryName}
                title={categoryName}
                category={categoryName}
                products={categoryProducts}
                index={index} 
              />
            ))}

            <BulkOrderCTA />
            <TrustBadges />
          </motion.div>
        ) : (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 px-4 min-h-[70vh]"
          >
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-1">Results</p>
                <h2 className="text-4xl font-black text-slate-900">
                  {searchQuery ? `Searching: "${searchQuery}"` : (categoryFilter || brandFilter)}
                </h2>
              </div>
              <span className="bg-[var(--card-bg)] px-4 py-2 rounded-full shadow-sm border border-slate-100 text-slate-500 font-bold text-sm">
                {filteredProducts.length} Products Found
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-32 bg-[var(--card-bg)] rounded-[3rem] border border-dashed border-slate-200">
                <p className="text-slate-400 text-xl font-medium mb-4">No products match your criteria.</p>
                <button 
                   onClick={() => window.history.pushState(null, '', '/')}
                   className="text-blue-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div
                      layout
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      key={product._id || product.id}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.section>
        )}
      </div>
    </div>
  );
}