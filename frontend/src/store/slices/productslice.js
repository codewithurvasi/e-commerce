import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';

/**
 * ✅ fetchProducts 
 * Explicitly named to resolve "does not provide an export named 'fetchProducts'"
 */
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', 
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/products');
      // Normalizing response: handles { data: [...] } or direct array
      return res.data.data || res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
});

// Alias to maintain compatibility with any 'getProducts' calls
export const getProducts = fetchProducts;

const productSlice = createSlice({
  name: 'products',
  initialState: { 
    items: [], 
    status: 'idle',
    error: null 
  },
  reducers: {
    // Add manual reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;