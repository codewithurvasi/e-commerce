import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  size: { type: String, default: null },
  price: { type: Number, min: 0, required: true },
  stock: { type: Number, default: 0 },
});

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },

    description: String,

    shortDescription: {
      type: String,
      default: "",
    },

    original_price: {
      type: Number,
      default: 0,
    },

    discount_percentage: {
      type: Number,
      default: 0,
    },

    material: {
      type: String,
      default: "",
    },

    fit: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "",
    },

    tags: {
      type: String,
      default: "",
    },

    isTrending: {
      type: Boolean,
      default: false,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    images: [
      {
        url: { type: String },
        public_id: { type: String },
      },
    ],

    price: { type: Number, min: 0 },
    variants: [variantSchema],

    category: { type: String, index: true },
    brand: { type: String, index: true },
    stock: { type: Number, default: 0 },
    lowStockThreshold: { type: Number, default: 10 },
    active: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (this.variants && this.variants.length > 0) {
    this.stock = this.variants.reduce((sum, v) => sum + (v.stock || 0), 0);
  }
  next();
});

export default mongoose.model("Product", productSchema);