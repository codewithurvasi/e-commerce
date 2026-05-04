import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import ProductCard from "@/components/ProductCard";

export default function TopDeals({ products: manualProducts }) {
  const { items, status, error } = useSelector((state) => state.products);

  const baseProducts =
    manualProducts && manualProducts.length > 0 ? manualProducts : items;

  const displayProducts = useMemo(() => {
    if (!baseProducts || baseProducts.length === 0) return [];
    return [...baseProducts].sort(() => Math.random() - 0.5).slice(0, 8);
  }, [baseProducts]);

  if (status === "loading" && displayProducts.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center bg-[#F4E7D0]">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)] mb-2" />
        <p className="text-[#594724] animate-pulse">
          Fetching premium deals...
        </p>
      </div>
    );
  }

  if (status === "failed" && displayProducts.length === 0) {
    return (
      <div className="py-10 text-center text-red-600 bg-[#F4E7D0]">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-16 bg-[#F4E7D0]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#8A6A2F] text-xs tracking-[0.3em] uppercase mb-3">
              <Sparkles className="h-4 w-4 text-[var(--primary)]" />
              Premium Picks
            </div>

            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-[#151512]">
              Featured Deals
            </h2>

         <p className="text-[#594724] mt-3 max-w-xl text-base md:text-lg leading-8 font-heading italic tracking-wide opacity-90">
  Curated fashion essentials with premium quality and elegant style.
</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {displayProducts.map((product, index) => (
            <TopDealCard
              key={product?._id || product?.id || index}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TopDealCard({ product, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const variants = Array.isArray(product?.variants) ? product.variants : [];
  const hasVariants = variants.length > 0;

  const firstAvailableVariant =
    variants.find((v) => Number(v.stock) > 0) || variants[0] || null;

  const [selectedVariant, setSelectedVariant] = useState(firstAvailableVariant);

  const name = product?.title || product?.name || "Product";
  const productId = product?._id || product?.id;
  const category = product?.category || "Fashion";
const brand = product?.brand || "Premium";
const isTrending = product?.trending || product?.isTrending || product?.featured;

  const price = hasVariants
    ? Number(selectedVariant?.price || 0)
    : Number(product?.price || product?.selling_price || 0);

  const originalPrice = Number(product?.original_price || price);

  let image = "/placeholder.png";
  if (Array.isArray(product?.images) && product.images.length > 0) {
    const firstImage = product.images[0];
    image = typeof firstImage === "object" ? firstImage.url : firstImage;
  } else {
    image = product?.image_url || product?.image || "/placeholder.png";
  }

  const availableStock = hasVariants
    ? Number(selectedVariant?.stock || 0)
    : Number(product?.stock ?? product?.quantity ?? 0);

  const isOutOfStock = availableStock <= 0;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return;
    }

    if (!productId) {
      toast.error("Invalid product");
      return;
    }

    if (hasVariants && !selectedVariant) {
      toast.error("Please select a size");
      return;
    }

    if (isOutOfStock) {
      toast.error("This item is out of stock");
      return;
    }

    dispatch(
      addToCart({
        productId,
        variantId: hasVariants ? selectedVariant._id : null,
        quantity: 1,
        stock: availableStock,
      }),
    )
      .unwrap()
      .then(() => {
        toast.success(`${name} added to cart`);
      })
      .catch((err) => {
        toast.error(err || "Failed to add to cart");
      });
  };

  return (
    <motion.div
  onClick={() => productId && navigate(`/product/${productId}`)}
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.05 }}
  className="group cursor-pointer relative overflow-hidden rounded-2xl bg-[var(--card-bg)] border border-[var(--border-soft)] p-5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.16),transparent_45%)] transition duration-500 pointer-events-none" />

      <div className="relative h-52 bg-[#FBF6EA] mb-4 overflow-hidden flex items-center justify-center rounded-xl">
        {originalPrice > price && (
          <span className="absolute top-3 left-3 bg-[#151512] text-[var(--primary)] text-[10px] font-bold tracking-widest uppercase px-3 py-1 z-10">
            Deal
          </span>
        )}

        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "/placeholder.png";
          }}
        />
      </div>

      <div className="relative space-y-3 text-center">
        <h3
          className="font-serif text-lg text-[#151512] line-clamp-1"
          title={name}
        >
          {name}
        </h3>

        <div className="flex items-center justify-center gap-2">
          <span className="text-lg font-bold text-[var(--primary)]">
            ₹{price.toLocaleString("en-IN")}
          </span>

          {originalPrice > price && (
            <span className="text-sm text-[#8A6A2F]/70 line-through">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {hasVariants && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {variants.map((variant) => {
              const isOut = Number(variant.stock) <= 0;
              const isActive = selectedVariant?._id === variant._id;

              return (
                <button
                  key={variant._id || variant.size}
                  type="button"
                  disabled={isOut}
                  onClick={() => !isOut && setSelectedVariant(variant)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-semibold transition ${
                    isOut
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : isActive
                        ? "bg-[#151512] text-[var(--primary)]"
                        : "bg-[var(--card-bg)] border border-gray-300 text-[#151512] hover:border-[#D4AF37]"
                  }`}
                >
                  {variant.size}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="relative mt-auto pt-6 flex justify-center">
        <Button
         onClick={(e) => {
  e.stopPropagation();
  handleAddToCart();
}}
          disabled={isOutOfStock}
          className={`w-full h-11 rounded-lg font-semibold text-sm transition-all ${
            isOutOfStock
              ? " cursor-not-allowed"
              : "!bg-[#151512] !text-[var(--primary)] hover:bg-[#c49d2e]"
          }`}
        >
          <div className="flex items-center justify-center gap-2 ">
            <ShoppingCart className="h-5 w-5" />
            <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
          </div>
        </Button>
      </div>
    </motion.div>
  );
}
