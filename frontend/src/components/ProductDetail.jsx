// src/components/ProductDetail.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import api from "@/services/api";
import {
  ShoppingCart,
  ChevronRight,
  Heart,
  Package,
  RefreshCcw,
} from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/Skeleton";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { toggleFavorite } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { fetchProducts } from "@/store/slices/productSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const PROGRESS_DURATION = 1800;

  const { items: products, status } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { ids: wishlistIds } = useSelector((state) => state.wishlist);

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [cartState, setCartState] = useState("idle");
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isWishlisted = wishlistIds.some(
    (itemId) => itemId?.toString() === (product?._id || id)?.toString()
  );

  useEffect(() => {
    if (products.length === 0 && status === "idle") {
      dispatch(fetchProducts());
    }
  }, [products.length, status, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setNotFound(false);

    const loadProduct = async () => {
      setLoadingProduct(true);

      if (products.length > 0) {
        const found = products.find((p) => (p._id || p.id) === id);
        if (found) {
          setProduct(found);
          setSelectedVariant(found.variants?.find((v) => v.stock > 0) || null);
          setLoadingProduct(false);
          return;
        }
      }

      try {
        const res = await api.get(`/products/${id}`);
        const productData = res.data.product || res.data;

        if (!productData?._id) {
          setNotFound(true);
          setProduct(null);
        } else {
          setProduct(productData);
          setSelectedVariant(
            productData.variants?.find((v) => v.stock > 0) || null
          );
          setNotFound(false);
        }
      } catch (err) {
        if (err.response?.status === 404) setNotFound(true);
        else toast.error("Failed to load product");
        setProduct(null);
      } finally {
        setLoadingProduct(false);
      }
    };

    loadProduct();
  }, [id, products]);

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      toast.warning("Please login to use wishlist");
      return;
    }
    if (!product) return;
    dispatch(toggleFavorite(product));
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.warning("Please login to add items to cart");
      return;
    }

    if (!product) return;

    const productId = product._id || product.id;
    const hasVariants = product.variants?.length > 0;

    if (hasVariants && !selectedVariant) {
      toast.error("Please select a variant");
      return;
    }

    const availableStock = hasVariants
      ? selectedVariant?.stock ?? 0
      : product?.stock ?? 0;

    if (availableStock <= 0) {
      toast.error("This item is out of stock");
      return;
    }

    setCartState("loading");
    const startTime = Date.now();

    dispatch(
      addToCart({
        productId,
        variantId: hasVariants ? selectedVariant._id : null,
        quantity: 1,
        stock: availableStock,
      })
    )
      .unwrap()
      .then(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(PROGRESS_DURATION - elapsed, 0);
        

        setTimeout(() => {
          setCartState("success");
          toast.success("Added to cart");
          setTimeout(() => setCartState("idle"), 1200);
        }, remaining);
      })
      .catch(() => {
        toast.error("Failed to add to cart");
        setCartState("idle");
      });
  };

  const randomProducts = useMemo(() => {
    if (!products?.length || !product) return [];

    return products
      .filter((p) => (p._id || p.id) !== (product._id || product.id))
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, [products, product]);

  const { displayPrice, originalPrice, hasDiscount, discountPercent } =
    useMemo(() => {
      if (!product) return {};

      const price = selectedVariant?.price ?? product.price ?? 0;
      const old = product.original_price ?? Math.round(price * 1.2);
      const discount = old > price && old > 0;

      return {
        displayPrice: price,
        originalPrice: old,
        hasDiscount: discount,
        discountPercent:
  product.discount_percentage > 0
    ? product.discount_percentage
    : discount
      ? Math.round(((old - price) / old) * 100)
      : 0,
      };
    }, [product, selectedVariant]);

  if (loadingProduct) {
    return (
      <div className="min-h-screen bg-[#F4E7D0] px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-[420px] md:h-[560px] w-full rounded-none" />
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#F4E7D0] px-4 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-serif text-[#151512]">
          Product not available
        </h2>
        <p className="text-[#594724] mt-2">
          This product may have been removed or is temporarily unavailable.
        </p>
        <Link
          to="/shop"
          className="inline-block mt-6 px-6 py-3 bg-[#151512] text-[var(--primary)] font-bold uppercase tracking-widest text-xs hover:bg-[#D4AF37] hover:text-black transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const isOutOfStock =
    product?.variants?.length > 0
      ? !selectedVariant || (selectedVariant?.stock ?? 0) <= 0
      : (product?.stock ?? 0) <= 0;

  return (
    <div className="bg-[#F4E7D0] min-h-screen pb-20 text-[#151512]">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 py-5 flex items-center gap-2 text-xs md:text-sm text-[#8A6A2F]">
        <Link to="/" className="hover:text-[#151512]">
          Home
        </Link>
        <ChevronRight size={isMobile ? 12 : 14} />
        <Link to="/shop" className="hover:text-[#151512]">
          Shop
        </Link>
        <ChevronRight size={isMobile ? 12 : 14} />
        <span className="text-[#151512]">{product.category}</span>
      </nav>

      <main className="max-w-7xl mx-auto px-4">
       <div className="grid lg:grid-cols-12 gap-6 md:gap-8 mb-4 items-start">
          {/* Image Section */}
         <div className="lg:col-span-7 self-start">
            <div className="bg-[var(--card-bg)]/75 border border-[#D4AF37]/25 p-4 md:p-6 shadow-xl w-full h-fit">
              <div className="relative bg-[#F4E7D0] overflow-hidden">
                <img
                  src={product.images?.[selectedImage]?.url || "/placeholder.png"}
                  alt={product.title}
               className="w-full h-[280px] md:h-[400px] object-cover transition-all duration-500"
                />

                {hasDiscount && (
                  <span className="absolute top-4 left-4 bg-[#151512] text-[var(--primary)] px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
                    {discountPercent}% Off
                  </span>
                )}

                <button
                  onClick={handleWishlistToggle}
                  className={`absolute top-4 right-4 h-11 w-11 rounded-full flex items-center justify-center shadow-md transition ${
                    isWishlisted
                      ? "bg-[#D4AF37] text-black"
                      : "bg-[var(--card-bg)]/90 text-[#151512] hover:bg-[#D4AF37] hover:text-black"
                  }`}
                >
                  <Heart
                    className={isWishlisted ? "fill-current" : ""}
                    size={20}
                  />
                </button>
              </div>

              {product.images?.length > 1 && (
                <div className="flex gap-3 mt-2 justify-center flex-wrap">

                          {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 md:w-20 md:h-20 overflow-hidden border transition ${
                        selectedImage === i
                          ? "border-[#D4AF37] shadow-md"
                          : "border-[var(--border-soft)] hover:border-[#D4AF37]/70"
                      }`}
                    >
                      <img
                        src={img.url || img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
             <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
  <div className="bg-[#151512] text-[var(--primary)] p-4 border border-[#D4AF37]/30">
    <p className="text-[10px] uppercase tracking-[0.25em] font-bold">
      Premium Quality
    </p>
    <p className="mt-2 text-sm text-white/85">
      Carefully selected fashion pieces.
    </p>
  </div>

  <div className="bg-[var(--card-bg)]/85 p-4 border border-[#D4AF37]/25">
    <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#8A6A2F]">
      Fast Delivery
    </p>
    <p className="mt-2 text-sm font-semibold text-[#151512]">
      Quick shipping across India.
    </p>
  </div>

  <div className="bg-[var(--card-bg)]/85 p-4 border border-[#D4AF37]/25">
    <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#8A6A2F]">
      Easy Returns
    </p>
    <p className="mt-2 text-sm font-semibold text-[#151512]">
      Simple 7 day return support.
    </p>
  </div>
</div>

<div className="mt-2 bg-[var(--card-bg)]/85 border border-[#D4AF37]/25 p-4">
  <h3 className="text-lg font-serif text-[#151512] mb-3">
    Why You’ll Love It
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#594724]">
    <p>✨ Premium finish for a luxury look</p>
    <p>🧵 Comfortable fabric for daily wear</p>
    <p>🎁 Perfect for gifting and styling</p>
    <p>🛡 Quality checked before dispatch</p>
  </div>
</div>
        {product.color && (
  <div className="mt-3 bg-[var(--card-bg)]/85 border border-[#D4AF37]/25 p-4">
    <h3 className="text-lg font-serif text-[#151512] mb-3">
      Available Colours
    </h3>

    <div className="flex flex-wrap gap-3">
      {["Black", "White", "Beige", "Pink", product.color]
        .filter(Boolean)
        .filter((value, index, arr) => arr.indexOf(value) === index)
        .map((color) => (
          <button
            key={color}
            type="button"
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition ${
              color === product.color
                ? "bg-[#151512] text-[var(--primary)] border-[#151512]"
                : "bg-[#FBF6EA] text-[#594724] border-[#D4AF37]/30 hover:border-[#151512]"
            }`}
          >
            {color}
          </button>
        ))}
    </div>
  </div>
)}
          </div>

          

          {/* Details */}
          <div className="lg:col-span-5 space-y-5">
            <Badge className="rounded-none bg-[#151512] text-[var(--primary)] border border-[#D4AF37]/30 px-4 py-1 uppercase tracking-widest">
              {product.brand}
            </Badge>

            <h1 className="text-3xl md:text-5xl font-serif font-semibold leading-tight text-[#151512]">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-[#8A6A2F]">
              <Package size={16} />
              SKU: {product._id?.slice(-6)}
            </div>

            {/* Price */}
            <div className="bg-[var(--card-bg)]/80 border border-[#D4AF37]/25 p-5 md:p-6">
              <div className="flex gap-4 items-end">
                <span className="text-3xl md:text-4xl font-bold text-[#151512]">
                  ₹{Number(displayPrice).toLocaleString("en-IN")}
                </span>

                {hasDiscount && (
                  <span className="line-through text-[#8A6A2F]/70">
                    ₹{Number(originalPrice).toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {hasDiscount && (
                <p className="text-[#8A6A2F] font-semibold mt-2">
                  You save {discountPercent}% on this style
                </p>
              )}
            </div>

            {/* Variants */}
            {product?.variants?.length > 0 && (
              <div className="bg-[var(--card-bg)]/80 border border-[#D4AF37]/25 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-[#8A6A2F] font-bold mb-4">
                  Select Size
                </p>

                <div className="flex gap-3 flex-wrap">
                  {product.variants.map((v) => {
                    const isOut = v.stock <= 0;
                    const isActive = selectedVariant?._id === v._id;

                    return (
                      <button
                        key={v._id}
                        disabled={isOut}
                        onClick={() => !isOut && setSelectedVariant(v)}
                        className={`px-5 py-2 border text-sm font-bold transition ${
                          isOut
                            ? "border-[#D4AF37]/10 bg-[#E8D6B8] text-[#8A6A2F]/50 cursor-not-allowed"
                            : isActive
                              ? "border-[#151512] bg-[#151512] text-[var(--primary)]"
                              : "border-[var(--border-gold)] bg-[var(--card-bg)] text-[#151512] hover:border-[#151512]"
                        }`}
                      >
                        {v.size}
                        {isOut && <span className="ml-2 text-xs">(Out)</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          

            {/* Product Info */}
            <div className="bg-[var(--card-bg)]/80 border border-[#D4AF37]/25 p-5 md:p-6 space-y-5">
  {(product.shortDescription || product.description) && (
    <div>
      <h3 className="text-lg font-serif text-[#151512] mb-2">
        Product Details
      </h3>

      {product.shortDescription && (
        <p className="text-sm font-semibold text-[#151512] mb-2">
          {product.shortDescription}
        </p>
      )}

      {product.description && (
        <p className="text-sm text-[#594724] leading-7">
          {product.description}
        </p>
      )}
    </div>
  )}

  <div>
    <h3 className="text-lg font-serif text-[#151512] mb-3">
      Style & Material
    </h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
      {[
        ["Brand", product.brand],
        ["Category", product.category],
        ["Gender", product.gender],
        ["Material", product.material],
        ["Fit", product.fit],
        ["Color", product.color],
        ["Rating", product.rating ? `★ ${product.rating}` : ""],
        [
          "Stock",
          product?.variants?.length > 0
            ? `${product.variants.reduce(
                (sum, v) => sum + Number(v.stock || 0),
                0
              )} units`
            : `${product.stock || 0} units`,
        ],
      ]
        .filter(([, value]) => value !== undefined && value !== null && value !== "")
        .map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between gap-4 border-b border-[var(--border-soft)] pb-2"
          >
            <span className="text-[#8A6A2F]">{label}</span>
            <span className="font-semibold text-[#151512] text-right">
              {value}
            </span>
          </div>
        ))}
    </div>
  </div>

  {/* {product.tags && (
    <div>
      <h3 className="text-lg font-serif text-[#151512] mb-3">
        Tags
      </h3>

      <div className="flex flex-wrap gap-2">
        {product.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
          .map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-[#F4E7D0] border border-[#D4AF37]/30 text-[#594724]"
            >
              {tag}
            </span>
          ))}
      </div>
    </div>
  )} */}

  {product?.variants?.length > 0 && (
    <div>
      <h3 className="text-lg font-serif text-[#151512] mb-3">
        Available Sizes
      </h3>

      <div className="flex flex-wrap gap-2">
        {product.variants.map((v) => (
          <span
            key={v._id || v.size}
            className="text-xs px-3 py-1 rounded-full bg-[#151512] text-[var(--primary)]"
          >
            {v.size} · ₹{Number(v.price || 0).toLocaleString("en-IN")} ·{" "}
            {Number(v.stock || 0)} left
          </span>
        ))}
      </div>
    </div>
  )}
    

  {(product.isTrending || product.featured) && (
    <div className="text-sm text-[#594724] border-t border-[var(--border-soft)] pt-4 space-y-1">
      {product.isTrending && (
        <p>
          ✨ <span className="font-semibold">Trending</span>
        </p>
      )}

      {product.featured && (
        <p>
          💎 <span className="font-semibold">Featured</span>
        </p>
      )}
    </div>
  )}
</div>

        

  

            {/* Add To Cart */}
            <div className="relative">
              <motion.button
                onClick={handleAddToCart}
                disabled={isOutOfStock || cartState === "loading"}
                whileTap={{ scale: 0.97 }}
                className={`relative h-14 md:h-16 w-full overflow-hidden font-black uppercase tracking-widest text-sm transition ${
                  isOutOfStock
                    ? "bg-[#E8D6B8] text-[#8A6A2F] cursor-not-allowed"
                    : "bg-[#151512] text-[var(--primary)] hover:bg-[#D4AF37] hover:text-black"
                }`}
              >
                {cartState === "loading" && (
                  <motion.div
                    className="absolute inset-0 bg-[#D4AF37]/30"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.8 }}
                  />
                )}

                <div className="relative z-10 flex items-center justify-center gap-3">
                  {cartState === "idle" && (
                    <>
                      <ShoppingCart size={20} />
                      {isOutOfStock ? "Out of Stock" : "Add To Cart"}
                    </>
                  )}

                  {cartState === "loading" && "Adding..."}

                  {cartState === "success" && "✓ Added"}
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Related */}
        {randomProducts.length > 0 && (
        <section className="border-t border-[#D4AF37]/25 pt-4 -mt-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] tracking-[0.3em] text-[#8A6A2F] uppercase mb-1">
                  More Styles
                </p>
                <h2 className="text-2xl md:text-3xl font-serif text-[#151512] flex items-center gap-2">
                  Discover More <RefreshCcw size={20} />
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {randomProducts.map((p) => (
                <ProductCard key={p._id || p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}