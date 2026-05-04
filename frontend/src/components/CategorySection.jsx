import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function CategorySection({ title, products }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleViewAll = () => {
    const categorySlug = title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/shop?category=${categorySlug}`);
  };

  if (!products || products.length === 0) return null;

  return (
    <>
      <style>
        {`
          .hide-scroll::-webkit-scrollbar {
            display: none;
          }
          .hide-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <section className="py-10 bg-[#F4E7D0] overflow-hidden">
        {/* 🔥 HEADER */}
        <div className="flex items-center justify-between px-4 md:px-8 mb-6">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#8A6A2F] uppercase mb-1">
              Collection
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#151512]">
              {title}
            </h2>
          </div>

          <button
            onClick={handleViewAll}
            className="text-[var(--primary)] font-bold text-xs tracking-widest uppercase border-b border-[#D4AF37] hover:text-black transition"
          >
            View All
          </button>
        </div>

        {/* 🔥 PRODUCTS */}
        <div className="relative overflow-x-auto hide-scroll px-4 md:px-8">
          <div className="flex gap-5 w-max">
            {products.map((product, i) => (
              <div
                key={`${product._id || product.id}-${i}`}
                className="
      w-[260px] sm:w-[280px] md:w-[300px] lg:w-[320px]
      flex-shrink-0
    "
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
