import React from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "@/store/slices/wishlistSlice";
import { toast } from "sonner";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { ids: wishlistIds } = useSelector((state) => state.wishlist);

  if (!product) return null;

  const productId = (product._id || product.id)?.toString();
  const isWishlisted = wishlistIds.some((id) => id.toString() === productId);

  const imageUrl =
    product?.images?.[0]?.url ||
    product?.images?.[0] ||
    "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400";

  const isOutOfStock = product.stock <= 0;
  const isTrending = product?.trending || product?.isTrending || product?.featured;
  
  const brand =
  typeof product.brand === "object" ? product.brand?.name : product.brand;
  
  const category =
  typeof product.category === "object"
    ? product.category?.name
    : product.category;

  const description =
  product?.shortDescription ||
  product?.description ||
  "Premium fashion essential with elegant style.";

  const displayPrice =
    product.price > 0 ? product.price : product.variants?.[0]?.price || 0;

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.warning("Login to save favorites", {
        description: "Saved locally for now",
      });
    }

    dispatch(toggleFavorite(product));
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group relative bg-[var(--card-bg)] border border-[#D4AF37]/25 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-3 right-3 h-10 w-10 rounded-full flex items-center justify-center z-20 shadow-md transition ${
          isWishlisted
            ? "bg-pink-100 text-red-500"
            : "bg-[var(--card-bg)]/90"
        }`}
      >
        <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
      </button>

      <Link to={`/product/${productId}`} className="block">
        <div className="relative aspect-[3/4] bg-[#F4E7D0] overflow-hidden">
          <img
            src={imageUrl}
            alt={product?.title || "Product"}
            className="h-full w-full object-cover group-hover:scale-105 transition duration-700"
            loading="lazy"
          />

          {product.discount_percentage > 0 && (
            <div className="absolute top-3 left-3 bg-[#151512] text-[var(--primary)] text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
              {product.discount_percentage}% Off
            </div>
          )}
          {isTrending && (
  <div className="absolute top-3 left-3 bg-[#D4AF37] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
    Trending
  </div>
)}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-[var(--card-bg)] text-black px-4 py-2 text-xs font-bold uppercase">
                Sold Out
              </span>
            </div>
          )}
        </div>

        <div className="p-4 bg-[var(--card-bg)]">
          {product?.brand && (
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A6A2F] font-bold mb-2">
              {typeof product.brand === "object"
                ? product.brand?.name
                : product.brand}
            </p>
          )}

          <h3 className="text-sm font-semibold text-[#151512] line-clamp-2 min-h-[40px] group-hover:text-[#8A6A2F] transition">
            {product.title || product.name}
          </h3>
          <p className="mt-2 text-xs text-[#594724] leading-5 line-clamp-2 min-h-[40px]">
  {description}
</p>
          

          <div className="flex items-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < (product.rating || 4)
                    ? "fill-[#D4AF37] text-[var(--primary)]"
                    : "fill-[#E8D6B8] text-[#E8D6B8]"
                }`}
              />
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
  {category && (
    <span className="text-[10px] px-2 py-1 bg-[#FBF6EA] border border-[#D4AF37]/30 text-[#594724] rounded-full">
      {category}
    </span>
  )}

  {product?.material && (
    <span className="text-[10px] px-2 py-1 bg-[#FBF6EA] border border-[#D4AF37]/30 text-[#594724] rounded-full">
      {product.material}
    </span>
  )}

  {product?.color && (
    <span className="text-[10px] px-2 py-1 bg-[#FBF6EA] border border-[#D4AF37]/30 text-[#594724] rounded-full">
      {product.color}
    </span>
  )}
</div>

          <div className="mt-4 pt-4 border-t border-[var(--border-soft)] flex items-end justify-between gap-3">
            <div>
              <p className="text-xl font-bold text-[#151512]">
                ₹{displayPrice.toLocaleString("en-IN")}
              </p>

              {product?.original_price > displayPrice && (
                <p className="text-xs line-through text-[#8A6A2F]/70">
                  ₹{product.original_price.toLocaleString("en-IN")}
                </p>
              )}
            </div>

            <span className="text-[10px] uppercase tracking-widest text-[#8A6A2F]">
              View
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}