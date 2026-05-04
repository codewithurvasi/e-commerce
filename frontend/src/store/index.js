import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// ✅ FIX: Ensure the import case matches your filename exactly (usually productSlice)
import productReducer from './slices/productSlice'; 
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // ✅ SUCCESS: This key must be 'products' (plural) to match your 
    // useSelector((state) => state.products) calls in Wishlist.jsx
    products: productReducer, 
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});