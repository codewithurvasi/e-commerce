import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { fetchFavorites } from "@/store/slices/wishlistSlice";
import { fetchProducts } from "@/store/slices/productSlice";
import { Heart, ArrowLeft, ShoppingBag, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Wishlist() {
  const dispatch = useDispatch();


  const { items: allProducts, status: productsStatus } = useSelector(
    (state) => state.products
  );
  const {
    ids: wishlistIds,
    items: wishlistItems,
    status: wishlistStatus,
  } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchFavorites());
  }, [dispatch]);

  const wishlistedProducts = useMemo(() => {
    const safeIds = Array.isArray(wishlistIds)
      ? wishlistIds.map((id) => id.toString())
      : [];

    const filteredFromAll = allProducts.filter((product) => {
      const pId = (product._id || product.id)?.toString();
      return safeIds.includes(pId);
    });

    const filteredFromItems = wishlistItems.filter((item) => {
      const itemId = (item._id || item.id)?.toString();
      return safeIds.includes(itemId);
    });

    const combined = [...filteredFromAll, ...filteredFromItems];

    return Array.from(
      new Map(
        combined.map((item) => {
          const id = (item._id || item.id)?.toString();
          return [id, item];
        })
      ).values()
    );
  }, [allProducts, wishlistIds, wishlistItems]);

  const isInitialLoading =
    (productsStatus === "loading" || wishlistStatus === "loading") &&
    wishlistedProducts.length === 0;

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-[#F4E7D0] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 text-[var(--primary)] animate-spin" />
        <p className="text-[#8A6A2F] font-bold animate-pulse tracking-widest uppercase text-xs">
          Synchronizing Favorites...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F4E7D0] min-h-screen py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <p className="text-[10px] font-bold text-[#8A6A2F] uppercase tracking-[0.35em] mb-3">
              Saved Collection
            </p>

            <div className="flex items-center gap-3 mb-3">
              <div className="h-11 w-11 bg-red-100 flex items-center justify-center text-red border border-pink-300 rounded-full">
                <Heart size={18} className="fill-red-500 text-red-500" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#151512]">
                My Wishlist
              </h1>
            </div>

            <p className="text-[#594724] font-medium text-sm sm:text-base">
              {wishlistedProducts.length}{" "}
              {wishlistedProducts.length === 1 ? "item" : "items"} saved for
              later
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#151512] font-bold hover:text-[var(--primary)] transition-colors group text-sm uppercase tracking-widest"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Continue Shopping
          </Link>
        </header>

        <AnimatePresence mode="popLayout">
          {wishlistedProducts.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6"
            >
              {wishlistedProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.86, opacity: 0 }}
                  key={(product._id || product.id)?.toString()}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-[var(--card-bg)]/80 py-14 sm:py-24 px-6 sm:px-10 text-center border border-[#D4AF37]/25 shadow-xl"
            >
              <div className="h-20 w-20 bg-[#151512] flex items-center justify-center mx-auto mb-6 text-[var(--primary)] border border-[#D4AF37]/30">
                <ShoppingBag size={36} />
              </div>

              <p className="text-[10px] font-bold text-[#8A6A2F] uppercase tracking-[0.35em] mb-3">
                No saved styles
              </p>

              <h2 className="text-2xl sm:text-3xl font-serif text-[#151512] mb-3">
                Your wishlist is empty
              </h2>

              <p className="text-[#594724] mb-8 max-w-sm mx-auto font-medium text-sm leading-relaxed">
                Save your favorite outfits, premium styles, and must-have
                fashion picks here.
              </p>

              <Link
                to="/"
                className="inline-flex items-center gap-3 bg-[#151512] text-[var(--primary)] px-8 sm:px-10 py-4 font-black uppercase tracking-widest text-xs border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-black transition-all active:scale-95"
              >
                Start Shopping
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}