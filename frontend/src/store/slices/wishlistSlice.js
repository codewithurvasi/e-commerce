// src/store/slices/wishlistSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const fetchFavorites = createAsyncThunk(
  "wishlist/fetchFavorites", 
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/favorites");
      const result = data.data || data.favorites || data.items || data;
      return Array.isArray(result) ? result : [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load wishlist");
    }
});

export const toggleFavorite = createAsyncThunk(
  "wishlist/toggle",
  async (product, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    const productId = product._id || product.id;
    
    if (!token) {
      toast.info("Please login to save favorites permanently");
      return { local: true, product };
    }

    try {
      const { data } = await API.post(`/favorites/${productId}/toggle`);
      const updatedData = data.ids || data.data || data.favorites || data;
      const idsOnly = Array.isArray(updatedData) 
        ? updatedData.map(item => String(typeof item === 'string' ? item : (item._id || item.id)))
        : [];

      return { local: false, ids: idsOnly, product };
    } catch (error) {
      toast.error("Failed to update wishlist");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const getInitialIds = () => {
  try {
    const saved = localStorage.getItem("favorites");
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.map(id => String(id)) : [];
  } catch {
    return [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [], 
    ids: getInitialIds(), 
    status: "idle",
    error: null,
  },
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
      state.ids = [];
      localStorage.removeItem("favorites");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        
        // 1. Get IDs from the Server response
        const serverProducts = Array.isArray(action.payload) ? action.payload : [];
        const serverIds = serverProducts.map(item => String(item._id || item.id || item));

        // 2. Get current Local IDs (already in Redux state from getInitialIds)
        const localIds = state.ids.map(id => String(id));

        // 3. ✅ SMART MERGE: Combine both and remove duplicates
        // This ensures items added locally are not deleted if the server returns []
        const mergedIds = Array.from(new Set([...localIds, ...serverIds]));

        state.items = serverProducts; 
        state.ids = mergedIds;
        
        localStorage.setItem("favorites", JSON.stringify(state.ids));
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { local, ids, product } = action.payload;
        const productId = String(product._id || product.id);

        if (local) {
          if (state.ids.includes(productId)) {
            state.ids = state.ids.filter(id => id !== productId);
            state.items = state.items.filter(item => String(item._id || item.id) !== productId);
          } else {
            state.ids.push(productId);
            state.items.push(product);
          }
        } else {
          // Sync with server list
          state.ids = ids.map(id => String(id));
          state.items = state.items.filter(item => state.ids.includes(String(item._id || item.id)));
        }
        
        localStorage.setItem("favorites", JSON.stringify(state.ids));
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;