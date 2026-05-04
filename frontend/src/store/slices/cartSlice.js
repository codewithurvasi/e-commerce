import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

/* =========================
   NORMALIZER (BACKEND → UI)
========================= */
const normalizeCartItems = (items = []) =>
  items.map((item, index) => ({
    cartItemId:
      item._id ||
      item.id ||
      `${item.product?._id}-${item.variantId ?? "base"}-${index}`,
    productId: item.product?._id || item.productId,
    product: item.product,
    variant: item.variant || null,
    variantId: item.variantId ?? item.variant?._id ?? null,
    stock: Number(item.variant?.stock ?? item.product?.stock ?? 0),
    quantity: Number(item.quantity) || 1,
  }));

/* =========================
   THUNKS (OLD PROJECT COMPATIBLE)
========================= */

// Fetch Cart
export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/cart");
      const rawItems = res.data?.items || res.data?.cart?.items || [];
      return normalizeCartItems(rawItems);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

// Add to Cart
export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, variantId, quantity = 1, stock }, { rejectWithValue }) => {
    try {
      const qty = Math.min(quantity, stock || 999);

      if (!productId) {
        throw new Error("Product ID missing");
      }

      const payload = {
        productId,
        quantity: qty,
      };

      // ✅ ONLY include variantId if it exists
      if (variantId) {
        payload.variantId = variantId;
      }

      const res = await api.post("/cart/add", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);


// ✅ UPDATE CART (BODY-BASED — OLD BACKEND CONTRACT)
export const updateCartItem = createAsyncThunk(
  "cart/update",
  async ({ productId, variantId, quantity, stock }, { rejectWithValue }) => {
    try {
      const clampedQty = Math.max(1, Math.min(quantity, stock || 999));

      // 👇 VERY IMPORTANT
      const urlVariant = variantId ?? "null";

      const res = await api.put(`/cart/${productId}/${urlVariant}`, {
        productId,
        variantId: variantId ?? null, // backend logic uses BODY
        quantity: clampedQty,
      });

      return res.data; // full cart
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Update failed"
      );
    }
  }
);


// ✅ REMOVE ITEM (BODY-BASED — OLD BACKEND CONTRACT)
export const removeItemFromCart = createAsyncThunk(
  "cart/remove",
  async ({ productId, variantId }, { rejectWithValue }) => {
    try {
      const urlVariant = variantId ?? "null";

      const res = await api.delete(`/cart/${productId}/${urlVariant}`, {
        data: {
          productId,
          variantId: variantId ?? null,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Remove failed"
      );
    }
  }
);


/* =========================
   SLICE
========================= */
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    clearCartItems: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ================= FETCH ================= */
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalQuantity = state.items.reduce(
          (s, i) => s + i.quantity,
          0
        );
        state.status = "succeeded";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      /* ================= ADD ================= */
      .addCase(addToCart.fulfilled, (state, action) => {
        const rawItems =
          action.payload?.items || action.payload?.cart?.items || [];
        state.items = normalizeCartItems(rawItems);
        state.totalQuantity = state.items.reduce(
          (s, i) => s + i.quantity,
          0
        );
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* ================= UPDATE ================= */
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const rawItems =
          action.payload?.items || action.payload?.cart?.items || [];
        state.items = normalizeCartItems(rawItems);
        state.totalQuantity = state.items.reduce(
          (s, i) => s + i.quantity,
          0
        );
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* ================= REMOVE ================= */
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        const rawItems =
          action.payload?.items || action.payload?.cart?.items || [];
        state.items = normalizeCartItems(rawItems);
        state.totalQuantity = state.items.reduce(
          (s, i) => s + i.quantity,
          0
        );
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
