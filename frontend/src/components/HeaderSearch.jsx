import { Search, X, ArrowUpRight, Clock, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import api from "@/services/api";

const HeaderSearch = ({
  searchRef,
  localSearch,
  setLocalSearch,
  showSuggestions,
  setShowSuggestions,
  navigate,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trending, setTrending] = useState([]);

  /* =========================
     LOAD RECENT SEARCHES
  ========================= */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(saved);
  }, []);

  /* =========================
     FETCH TRENDING
  ========================= */
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await api.get("/products");
        setTrending(res.data || []);
      } catch {
        setTrending([]);
      }
    };
    fetchTrending();
  }, []);

  /* =========================
     DEBOUNCED SEARCH
  ========================= */
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!localSearch.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await api.get(`/products?search=${localSearch}`);
        setSuggestions(res.data || []);
      } catch {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [localSearch]);

  /* =========================
     SAVE RECENT
  ========================= */
  const saveRecent = (term) => {
    if (!term.trim()) return;

    let updated = [term, ...recentSearches.filter((t) => t !== term)];
    updated = updated.slice(0, 6);

    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setRecentSearches(updated);
  };

  /* =========================
     SMART FILTER
  ========================= */
  const filteredSuggestions = useMemo(() => {
    const query = localSearch.toLowerCase().trim();

    return suggestions.filter((p) => {
  const regex = new RegExp(`\\b${query}\\b`, "i");

  const titleMatch = regex.test(p.title || "");
  const nameMatch = regex.test(p.name || "");
  const brandMatch = regex.test(p.brand || "");
  const categoryMatch = p.category?.toLowerCase() === query;

  return titleMatch || nameMatch || brandMatch || categoryMatch;
});
  }, [suggestions, localSearch]);
  /* =========================
     🔥 PRICE FIX (IMPORTANT)
  ========================= */
  const getDisplayPrice = (product) => {
    if (product.variants && product.variants.length > 0) {
      const prices = product.variants
        .map((v) => Number(v.price))
        .filter((p) => p > 0);

      if (prices.length > 0) {
        return `From ₹${Math.min(...prices).toLocaleString()}`;
      }
    }

    if (product.price && product.price > 0) {
      return `₹${product.price.toLocaleString()}`;
    }

    return null;
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();

    const query = localSearch.trim();
    if (!query) return;

    saveRecent(query);
    setShowSuggestions(false);

    const normalizedQuery = query.toLowerCase();

    const categoryMap = {
      men: "men",
      women: "women",
      kids: "kids",
      clothing: "clothing",
      footwear: "footwear",
      accessories: "accessories",
      "new arrivals": "new-arrivals",
      trending: "trending",
    };

    if (categoryMap[normalizedQuery]) {
      navigate(`/shop?category=${categoryMap[normalizedQuery]}`);
    } else {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div ref={searchRef} className="w-full md:flex-1 md:max-w-xl relative">
      {/* INPUT */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <Input
          placeholder="Search products, brands, categories..."
          value={localSearch}
          onChange={(e) => {
            setLocalSearch(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="
            h-11 rounded-full
            bg-[#fffdf8]
            border border-[#dfc791]
            focus-visible:ring-2 focus-visible:ring-[#d4af37]
            pr-20 text-black font-semibold
          "
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
          {localSearch && (
            <button
              type="button"
              onClick={() => setLocalSearch("")}
              className="p-2 text-[var(--text-accent)]"
            >
              <X size={16} />
            </button>
          )}

          <button
            type="submit"
            className="p-2.5 bg-black text-[var(--primary)] rounded-full"
          >
            <Search size={16} />
          </button>
        </div>
      </form>

      {/* DROPDOWN */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="
              absolute top-full left-0 right-0 mt-2
              bg-[#fffdf8]
              border border-[#ead7ae]
              shadow-xl z-[100]
              overflow-hidden
            "
          >
            <div className="p-3 space-y-3">
              {/* RECENT */}
              {!localSearch && recentSearches.length > 0 && (
                <>
                  <p className="text-xs font-black text-[var(--text-accent)] uppercase">
                    Recent Searches
                  </p>
                  {recentSearches.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setLocalSearch(term);

                        const normalizedTerm = term.toLowerCase().trim();

                        const categoryMap = {
                          men: "men",
                          women: "women",
                          kids: "kids",
                          clothing: "clothing",
                          footwear: "footwear",
                          accessories: "accessories",
                          "new arrivals": "new-arrivals",
                          trending: "trending",
                        };

                        if (categoryMap[normalizedTerm]) {
                          navigate(
                            `/shop?category=${categoryMap[normalizedTerm]}`,
                          );
                        } else {
                          navigate(`/shop?search=${encodeURIComponent(term)}`);
                        }

                        setShowSuggestions(false);
                      }}
                      className="flex items-center gap-2 text-sm w-full text-left theme-hover p-2 rounded"
                    >
                      <Clock size={14} /> {term}
                    </button>
                  ))}
                </>
              )}

              {/* TRENDING */}
              {!localSearch && trending.length > 0 && (
                <>
                  <p className="text-xs font-black text-[var(--text-accent)] uppercase">
                    Trending
                  </p>
                  {trending.slice(0, 5).map((p) => (
                    <button
                      key={p._id}
                      onClick={() => navigate(`/product/${p._id}`)}
                      className="flex items-center gap-3 w-full theme-hover p-2 rounded"
                    >
                      <TrendingUp size={14} />
                      <span className="text-sm font-semibold">{p.title}</span>
                    </button>
                  ))}
                </>
              )}

              {/* SEARCH RESULTS */}
              {localSearch && (
                <>
                  <p className="text-xs font-black text-[var(--text-accent)] uppercase">
                    Results
                  </p>

                  {filteredSuggestions.map((product) => (
                    <button
                      key={product._id}
                      onClick={() => {
                        saveRecent(localSearch);
                        navigate(`/product/${product._id}`);
                        setShowSuggestions(false);
                      }}
                      className="flex items-center gap-3 w-full theme-hover p-2 rounded group"
                    >
                      {/* IMAGE */}
                      <div className="w-10 h-10 bg-[var(--card-bg)] border rounded overflow-hidden">
                        <img
                          src={product.images?.[0]?.url}
                          className="w-full h-full object-contain"
                          alt={product.title}
                        />
                      </div>

                      {/* TEXT */}
                      <div className="flex-1 text-left">
                        <p className="text-sm font-bold text-black truncate">
                          {product.title}
                        </p>

                        {/* ✅ FIXED PRICE */}
                        {getDisplayPrice(product) && (
                          <p className="text-xs text-[var(--text-accent)] font-semibold">
                            {getDisplayPrice(product)}
                          </p>
                        )}
                      </div>

                      <ArrowUpRight size={14} />
                    </button>
                  ))}
                </>
              )}
            </div>

            {/* VIEW ALL */}
            {localSearch && (
              <button
                onClick={handleSearchSubmit}
                className="w-full bg-[#f7edd9] p-3 text-sm font-bold text-black"
              >
                View all results for "{localSearch}"
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderSearch;
