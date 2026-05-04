import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';

/* =========================
   LOGIN THUNK
   Saves individual fields to localStorage to persist 
   session even if the profile API is missing.
========================= */
export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token, user } = response.data;

    // Persist session details
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user._id || user.id || ""); // Store ID consistently
    localStorage.setItem('userName', user.name || "");
    localStorage.setItem('userEmail', user.email || "");
    localStorage.setItem('userPhone', user.phone || "");
    localStorage.setItem('userWallet', user.wallet || 0);
    localStorage.setItem('userRole', user.role || "user");
    localStorage.setItem('userRefer', user.referralCode || "");

    return user;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // Reconstruct user object from individual localStorage keys on startup
    user: localStorage.getItem('token') ? {
      id: localStorage.getItem('userId'), // Ensure ID is initialized
      name: localStorage.getItem('userName'),
      email: localStorage.getItem('userEmail'),
      phone: localStorage.getItem('userPhone'),
      wallet: Number(localStorage.getItem('userWallet')) || 0, // Parse wallet as number
      role: localStorage.getItem('userRole'),
      referralCode: localStorage.getItem('userRefer'),
    } : null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
  },
  reducers: {
    /* =========================
       LOGOUT
    ========================= */
    logout: (state) => {
      localStorage.clear(); // Clears token and all user fields
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    /* =========================
       SET USER (Manual Update)
       Used by Profile.jsx to update state after 
       successful API profile updates.
    ========================= */
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.isAuthenticated = true;

      // Keep localStorage in sync with manual updates
      if (action.payload.id || action.payload._id) {
          localStorage.setItem('userId', action.payload.id || action.payload._id);
      }
      if (action.payload.name) localStorage.setItem('userName', action.payload.name);
      if (action.payload.email) localStorage.setItem('userEmail', action.payload.email);
      if (action.payload.referralCode || action.payload.referralCode === "") localStorage.setItem('userRefer', action.payload.referralCode || "");
      if (action.payload.phone) localStorage.setItem('userPhone', action.payload.phone);
      if (action.payload.wallet !== undefined) localStorage.setItem('userWallet', action.payload.wallet);
      if (action.payload.role) localStorage.setItem('userRole', action.payload.role);
    },

    /* =========================
       UPDATE LOCAL USER
    ========================= */
    updateLocalUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      if (action.payload.name) localStorage.setItem('userName', action.payload.name);
      if (action.payload.phone) localStorage.setItem('userPhone', action.payload.phone);
      if (action.payload.email) localStorage.setItem('userEmail', action.payload.email);
    }
  },
  extraReducers: (builder) => {
    builder
      /* LOGIN CASES */
      .addCase(loginUser.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, setUser, updateLocalUser } = authSlice.actions;
export default authSlice.reducer;