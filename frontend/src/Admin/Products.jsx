import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    images: [],
    category: "",
    gender: "",
    brand: "",
    stock: "",
    active: true,
    price: "",
    original_price: "",
    discount_percentage: "",
    shortDescription: "",
    material: "",
    fit: "",
    color: "",
    tags: "",
    isTrending: false,
    featured: false,
    variants: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const loadProducts = async () => {
    try {
      const { data } = await api.get("/products/admin/all");
      setProducts(data);

      setCategories([...new Set(data.map((p) => p.category).filter(Boolean))]);
      setBrands([...new Set(data.map((p) => p.brand).filter(Boolean))]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const getDisplayPrice = (product) => {
    if (Number(product.price) > 0) return Number(product.price);

    if (Array.isArray(product.variants) && product.variants.length > 0) {
      const prices = product.variants
        .map((v) => Number(v.price))
        .filter((price) => price > 0);

      if (prices.length > 0) return Math.min(...prices);
    }

    return 0;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      images: [],
      category: "",
      gender: "",
      brand: "",
      stock: "",
      active: true,
      price: "",
      original_price: "",
      discount_percentage: "",
      shortDescription: "",
      material: "",
      fit: "",
      color: "",
      tags: "",
      isTrending: false,
      featured: false,
      variants: [],
    });
    setImageFiles([]);
    setImagePreviews([]);
    setIsEditing(false);
    setEditId(null);
  };

  const startEdit = (product) => {
    setForm({ ...product, variants: product.variants || [] });
    setEditId(product._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const createOrUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("gender", form.gender);
      formData.append("brand", form.brand);
      formData.append("stock", Number(form.stock) || 0);
      formData.append("active", form.active ? "true" : "false");
      formData.append("price", Number(form.price) || 0);
      formData.append("original_price", Number(form.original_price) || 0);
formData.append("discount_percentage", Number(form.discount_percentage) || 0);
formData.append("shortDescription", form.shortDescription);
formData.append("material", form.material);
formData.append("fit", form.fit);
formData.append("color", form.color);
formData.append("tags", form.tags);
formData.append("isTrending", form.isTrending ? "true" : "false");
formData.append("featured", form.featured ? "true" : "false");

      imageFiles.forEach((file) => formData.append("images", file));

      form.variants.forEach((v, idx) => {
        if (v.size) formData.append(`variants[${idx}][size]`, v.size);
        formData.append(`variants[${idx}][price]`, Number(v.price) || 0);
        formData.append(`variants[${idx}][stock]`, Number(v.stock) || 0);
      });

      if (isEditing) {
        await api.put(`/products/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product updated successfully");
      } else {
        await api.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product created successfully");
      }

      resetForm();
      setShowModal(false);
      loadProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this product?")) return;

    try {
      await api.delete(`/products/${id}/destroy`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const filteredProducts = products.filter((p) => {
    const searchText = `${p.title || ""} ${p.category || ""} ${p.gender || ""} ${p.brand || ""}`;
    return searchText.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#F4E7D0] p-4 md:p-6 space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold text-[#8A6A2F] uppercase tracking-[0.35em] mb-2">
            Admin Collection
          </p>
          <h1 className="text-3xl md:text-4xl font-serif text-[#151512]">
            Products
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 ">
          <div className="relative flex-1 sm:flex-initial">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A6A2F]"
              size={18}
            />
            <Input
              placeholder="Search products, brands..."
              className="pl-10 w-full sm:w-72 h-11 rounded-none bg-[var(--card-bg)]/80 border border-[#D4AF37]/25 focus-visible:ring-[#D4AF37]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="h-22 w-32 rounded-full bg-[#151512] text-[var(--primary)] hover:bg-[#D4AF37] hover:text-black font-bold uppercase tracking-widest text-xs"
          >
            + Add Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 ">
        {filteredProducts.map((p) => {
          const displayPrice = getDisplayPrice(p);

          return (
            <div
              key={p._id}
              className="bg-[var(--card-bg)]/85 border border-[#D4AF37]/25 overflow-hidden group hover:shadow-2xl transition-all duration-300 rounded-[1.5rem]"
            >
              <div className="h-52 bg-#FFF relative overflow-hidden flex items-center justify-center p-4">
                {p.images?.[0] ? (
                  <img
                    src={p.images[0].url || p.images[0]}
                    className="h-full w-full object-contain group-hover:scale-105 transition duration-500"
                    alt={p.title}
                  />
                ) : (
                  <ImageIcon className="text-[#8A6A2F]/50" size={42} />
                )}

                <div className="absolute top-3 right-3 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => startEdit(p)}
                    className="p-2 bg-[#151512] text-[var(--primary)] shadow-md transition"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="p-2 bg-black text-[var(--primary)] shadow-md transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <span
                  className={`
    absolute top-3 left-3
    flex items-center gap-1.5
    text-[10px] font-bold uppercase tracking-wide
    px-3 py-1.5 rounded-full
    shadow-lg border
    ${
      p.active
        ? "bg-[#151512] text-[var(--primary)] border-[var(--border-gold)]"
        : "bg-[#E8D6B8] text-[#8A6A2F] border-[var(--border-soft)]"
    }
  `}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {p.active ? "Active" : "Draft"}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <p className="text-[10px] font-bold text-[#8A6A2F] uppercase tracking-[0.25em] mb-1">
                    {p.brand || "Fashion Brand"}
                  </p>
                  <h3 className="font-bold text-[#151512] text-sm sm:text-base line-clamp-1">
                    {p.title}
                  </h3>
                </div>

                <p className="text-xl font-serif text-[#151512]">
                  {displayPrice > 0
                    ? `₹${displayPrice.toLocaleString("en-IN")}`
                    : "Price not set"}
                </p>

                <div className="flex items-center justify-between text-[10px] font-bold text-[#8A6A2F] uppercase tracking-widest border-t border-[var(--border-soft)] pt-3">
                  <span className="truncate max-w-[120px]">{p.category}</span>
                  <span>{p.stock} Units</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#F4E7D0] w-full max-w-2xl max-h-[92vh] shadow-2xl overflow-hidden flex flex-col border border-[#D4AF37]/30">
            <div className="p-5 sm:p-6 border-b border-[#D4AF37]/25 flex items-center justify-between bg-[#151512] sticky top-0 z-10">
              <div>
                <p className="text-[10px] text-[var(--primary)] uppercase tracking-[0.3em]">
                  Product Form
                </p>
                <h2 className="text-xl sm:text-2xl font-serif text-white">
                  {isEditing ? "Edit Product" : "Add Product"}
                </h2>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="p-2 border border-[#D4AF37]/30 text-[var(--primary)] hover:bg-[#D4AF37] hover:text-black transition"
              >
                <X size={22} />
              </button>
            </div>

            <form
              onSubmit={createOrUpdateProduct}
              className="p-5 sm:p-8 overflow-y-auto space-y-6"
            >
              <Input
                placeholder="Product Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="rounded-none h-12 bg-[var(--card-bg)]/80 border-[#D4AF37]/25 focus-visible:ring-[#D4AF37]"
              />

              <textarea
                placeholder="Description"
                className="w-full min-h-[100px] p-4 border border-[#D4AF37]/25 rounded-none bg-[var(--card-bg)]/80 focus:ring-2 focus:ring-[#D4AF37] outline-none text-sm font-medium"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Category">
                  <Input
                    list="cats"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="rounded-none h-11 bg-[var(--card-bg)]/80 border-[#D4AF37]/25 focus-visible:ring-[#D4AF37]"
                  />
                  <datalist id="cats">
                    {categories.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </Field>

                <Field label="Brand">
                  <Input
                    list="brs"
                    value={form.brand}
                    onChange={(e) =>
                      setForm({ ...form, brand: e.target.value })
                    }
                    className="rounded-none h-11 bg-[var(--card-bg)]/80 border-[#D4AF37]/25 focus-visible:ring-[#D4AF37]"
                  />
                  <datalist id="brs">
                    {brands.map((b) => (
                      <option key={b} value={b} />
                    ))}
                  </datalist>
                </Field>
              </div>

              <Field label="Gender">
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="rounded-none h-11 bg-[var(--card-bg)]/80 border border-[#D4AF37]/25 focus:ring-[#D4AF37] w-full px-2"
                >
                  <option value="">Select Gender</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Price">
                  <div className="grid grid-cols-2 gap-4">
  <Field label="Original Price / MRP">
    <Input
      type="number"
      value={form.original_price}
      onChange={(e) => setForm({ ...form, original_price: e.target.value })}
      className="rounded-none h-11 bg-[var(--card-bg)]/80 border-[#D4AF37]/25 focus-visible:ring-[#D4AF37]"
    />
  </Field>

  <Field label="Discount %">
    <Input
      type="number"
      value={form.discount_percentage}
      onChange={(e) =>
        setForm({ ...form, discount_percentage: e.target.value })
      }
      className="rounded-none h-11 bg-[var(--card-bg)]/80 border-[#D4AF37]/25 focus-visible:ring-[#D4AF37]"
    />
  </Field>
</div>

<Field label="Short Description">
  <Input
    placeholder="Example: Soft cotton dress with elegant summer styling"
    value={form.shortDescription}
    onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
    className="rounded-none h-11 bg-[var(--card-bg)]/80 border-[#D4AF37]/25 focus-visible:ring-[#D4AF37]"
  />
</Field>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  <Field label="Material">
    <Input
      placeholder="Cotton, Silk..."
      value={form.material}
      onChange={(e) => setForm({ ...form, material: e.target.value })}
      className="rounded-none h-11 bg-[var(--card-bg)]/80 border-[#D4AF37]/25 focus-visible:ring-[#D4AF37]"
    />
  </Field>

  <Field label="Fit">
    <Input
      placeholder="Regular, Slim..."
      value={form.fit}
      onChange={(e) => setForm({ ...form, fit: e.target.value })}
      className="rounded-none h-11 bg-[var(--card-bg)]/80 border-[#D4AF37]/25 focus-visible:ring-[#D4AF37]"
    />
  </Field>

  <Field label="Color">
    <Input
      placeholder="Black, Red..."
      value={form.color}
      onChange={(e) => setForm({ ...form, color: e.target.value })}
      className="rounded-none h-11 bg-[var(--card-bg)]/80 border-[#D4AF37]/25 focus-visible:ring-[#D4AF37]"
    />
  </Field>
</div>

<Field label="Tags">
  <Input
    placeholder="trending, bestseller, premium"
    value={form.tags}
    onChange={(e) => setForm({ ...form, tags: e.target.value })}
    className="rounded-none h-11 bg-[var(--card-bg)]/80 border-[#D4AF37]/25 focus-visible:ring-[#D4AF37]"
  />
</Field>

<div className="grid grid-cols-2 gap-4 bg-[var(--card-bg)]/60 border border-[#D4AF37]/25 p-4">
  <label className="flex items-center gap-2 text-xs font-bold text-[#151512]">
    <input
      type="checkbox"
      checked={form.isTrending}
      onChange={(e) => setForm({ ...form, isTrending: e.target.checked })}
    />
    Trending Product
  </label>

  <label className="flex items-center gap-2 text-xs font-bold text-[#151512]">
    <input
      type="checkbox"
      checked={form.featured}
      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
    />
    Featured Product
  </label>
</div>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="rounded-none h-11 bg-[var(--card-bg)]/80 border-[#D4AF37]/25 focus-visible:ring-[#D4AF37]"
                  />
                </Field>

                <Field label="Stock">
                  <Input
                    type="number"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: e.target.value })
                    }
                    className="rounded-none h-11 bg-[var(--card-bg)]/80 border-[#D4AF37]/25 focus-visible:ring-[#D4AF37]"
                  />
                </Field>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#8A6A2F] uppercase tracking-widest ml-1">
                  Images
                </label>

                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#D4AF37]/35 cursor-pointer hover:bg-[var(--card-bg)]/70 transition">
                  <ImageIcon className="text-[#8A6A2F] mb-2" size={22} />
                  <p className="text-xs text-[#594724] font-bold">
                    Tap to upload product images
                  </p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    onClick={(e) => (e.target.value = null)}
                  />
                </label>

                {imagePreviews.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {imagePreviews.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        className="w-16 h-16 shrink-0 object-cover border border-[#D4AF37]"
                        alt=""
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-[var(--card-bg)]/65 p-4 sm:p-6 border border-[#D4AF37]/25 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-[#8A6A2F] uppercase tracking-widest">
                    Variants
                  </label>

                  <Button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        variants: [
                          ...form.variants,
                          { size: "", price: "", stock: "" },
                        ],
                      })
                    }
                    variant="outline"
                    size="sm"
                    className="rounded-none h-8 text-[10px] font-black uppercase border-[var(--border-gold)]"
                  >
                    + Add
                  </Button>
                </div>

                {form.variants.map((v, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-3 bg-[var(--card-bg)] p-3 border border-[var(--border-soft)]"
                  >
                    <Input
                      placeholder="Size"
                      value={v.size}
                      onChange={(e) => {
                        const newV = [...form.variants];
                        newV[idx].size = e.target.value;
                        setForm({ ...form, variants: newV });
                      }}
                      className="h-9 text-xs rounded-none"
                    />

                    <Input
                      placeholder="Price"
                      type="number"
                      value={v.price}
                      onChange={(e) => {
                        const newV = [...form.variants];
                        newV[idx].price = e.target.value;
                        setForm({ ...form, variants: newV });
                      }}
                      className="h-9 text-xs rounded-none"
                    />

                    <div className="flex gap-2 items-center">
                      <Input
                        placeholder="Stock"
                        type="number"
                        value={v.stock}
                        onChange={(e) => {
                          const newV = [...form.variants];
                          newV[idx].stock = e.target.value;
                          setForm({ ...form, variants: newV });
                        }}
                        className="h-9 text-xs rounded-none"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            variants: form.variants.filter((_, i) => i !== idx),
                          })
                        }
                        className="p-2 text-red-500 bg-red-50 hover:bg-red-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:flex-1 !bg-[#151512] !text-[var(--primary)] hover:!bg-[#D4AF37] hover:!text-black rounded-none h-12 font-black uppercase tracking-widest text-xs"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : isEditing ? (
                    "Update Product"
                  ) : (
                    "Create Product"
                  )}
                </Button>

                <Button
                  type="button"
                  onClick={() => setShowModal(false)}
                  variant="outline"
                  className="w-full sm:flex-1 rounded-none h-12 font-black uppercase tracking-widest text-xs border-[var(--border-gold)] text-[#151512]"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-[#8A6A2F] uppercase tracking-widest ml-1">
        {label}
      </label>
      {children}
    </div>
  );
}
