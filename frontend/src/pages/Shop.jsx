// src/pages/Shop.jsx
import React, { useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '@/store/slices/productSlice';
import ProductCard from '@/components/ProductCard';
import { Loader2, ArrowLeft, LayoutGrid, Search, XCircle } from 'lucide-react';

export default function Shop() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  
  const categoryFilter = searchParams.get('category');
  const searchFilter = searchParams.get('search'); 
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // ✅ FUZZY SEARCH LOGIC
  const filteredProducts = useMemo(() => {
    let result = [...items];

    // 1. Filter by Search Param (Matches Title, Brand, Desc, or Category string)
    if (searchFilter) {
      const query = searchFilter.toLowerCase().trim();
      result = result.filter((p) => {
        const title = (p.title || p.name || "").toLowerCase();
        const brand = (p.brand || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const category = (p.category || "").toLowerCase();
        
        return title.includes(query) || brand.includes(query) || desc.includes(query) || category.includes(query);
      });
    }

    // 2. Filter by Category Param (Slug matching)
    if (categoryFilter && categoryFilter !== "all") {
      const normalizedFilter = categoryFilter.toLowerCase().trim();
      result = result.filter((p) => {
        if (!p.category) return false;
        const pCat = p.category.toLowerCase().trim();
        const pSlug = pCat.replace(/\s+/g, '-');
        return pSlug === normalizedFilter || pCat === normalizedFilter.replace(/-/g, ' ');
      });
    }

    return result;
  }, [items, categoryFilter, searchFilter]);

  if (status === 'loading' && items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--card-bg)]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
        <p className="text-slate-500 animate-pulse">Scanning inventory...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-[var(--card-bg)] border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-sm font-semibold text-black hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                {searchFilter ? `Results for "${searchFilter}"` : (categoryFilter ? categoryFilter.replace(/-/g, ' ') : 'All Products')}
              </h1>
              <p className="text-slate-500 mt-1 flex items-center font-medium">
                <LayoutGrid className="h-4 w-4 mr-2 text-slate-400" />
                Found {filteredProducts.length} items matching your criteria
              </p>
            </div>

            {(categoryFilter || searchFilter) && (
              <Link to="/" className="inline-flex items-center gap-2 text-sm bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 px-5 py-2.5 rounded-full transition-all font-bold">
                <XCircle size={16} /> Clear Filters
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10">
        {filteredProducts.length === 0 ? (
          <div className="bg-[var(--card-bg)] rounded-3xl p-20 text-center border-2 border-dashed border-slate-200">
            <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800">No matches found</h3>
            <p className="text-slate-500 mt-2 mb-8">Try adjusting your filters or search terms.</p>
            <Link to="/shop" className="bg-[#D4AF37] text-white px-8 py-3 rounded-full font-bold hover:bg-[#B89A2C] transition-all shadow-xl shadow-[#D4AF37]">
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p._id || p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}