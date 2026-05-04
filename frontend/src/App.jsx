import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux'; 
import { store } from '@/store'; 
import { Toaster } from 'sonner';
import { fetchProducts } from '@/store/slices/productSlice';
import { fetchCart } from '@/store/slices/cartSlice';
import { fetchFavorites } from '@/store/slices/wishlistSlice';

// Components
import LoadingScreen from '@/components/LoadingScreen';

// Layout
import Layout from '@/components/Layout';

// Public Pages
import Home from '@/pages/Home';
import Shop from '@/pages/Shop'; 
import ProductDetail from '@/components/ProductDetail';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import About from '@/pages/About';
import Cart from '@/pages/Cart';
import Help from '@/pages/Help';
import Contact from '@/pages/Contact';
import Careers from '@/pages/Careers';
import Stories from '@/pages/Stories';
import Corporate from '@/pages/Corporate';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import RefundPolicy from '@/pages/RefundPolicy';
import ShippingPolicy from '@/pages/ShippingPolicy';
import TermsAndConditions from '@/pages/TermsAndConditions';
import ConsumerPolicy from '@/pages/ConsumerPolicy';

// User Pages
import Profile from '@/pages/Profile'; 
import Wishlist from '@/pages/Wishlist'; 
import MyOrders from '@/pages/MyOrders'; 

// Admin
import AdminLayout from './AdminLayout'; 
import Dashboard from './Admin/Dashboard';
import Products from './Admin/Products';
import Orders from './Admin/Orders';
import Analytics from './Admin/Analytics';
import Payments from './Admin/PaymentInfo';
import AdminCoupons from './AdminCoupons';

/* =========================
   AUTH GUARDS
========================= */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return isAuthenticated && user?.role === 'admin'
    ? children
    : <Navigate to="/" replace />;
};

function AppContent() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { status: productsStatus } = useSelector((state) => state.products);
  const { status: cartStatus } = useSelector((state) => state.cart);
  const { status: wishlistStatus } = useSelector((state) => state.wishlist);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Always fetch products first
        dispatch(fetchProducts());
        
        // If user is authenticated, fetch cart and wishlist
        if (isAuthenticated) {
          dispatch(fetchCart());
          dispatch(fetchFavorites());
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initializeApp();
  }, [dispatch, isAuthenticated]);

  // Check if all necessary data has loaded
  useEffect(() => {
    const productsLoaded = productsStatus === 'succeeded' || productsStatus === 'failed';
    const cartLoaded = !isAuthenticated || (cartStatus === 'succeeded' || cartStatus === 'failed');
    const wishlistLoaded = !isAuthenticated || (wishlistStatus === 'succeeded' || wishlistStatus === 'failed');
    
    // Hide loading screen as soon as all required data has been fetched
    if (productsLoaded && cartLoaded && wishlistLoaded) {
      // Small delay for smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [productsStatus, cartStatus, wishlistStatus, isAuthenticated]);

  // Calculate loading progress for the loading screen
  const calculateProgress = () => {
    let progress = 0;
    let steps = 1; // Always have products

    // Products step (40% of progress)
    if (productsStatus === 'succeeded' || productsStatus === 'failed') {
      progress += 40;
    } else if (productsStatus === 'loading') {
      progress += 20; // Partial progress while loading
    }

    if (isAuthenticated) {
      steps += 2; // Cart and wishlist if authenticated
      
      // Cart step (30% of progress)
      if (cartStatus === 'succeeded' || cartStatus === 'failed') {
        progress += 30;
      } else if (cartStatus === 'loading') {
        progress += 15;
      }
      
      // Wishlist step (30% of progress)
      if (wishlistStatus === 'succeeded' || wishlistStatus === 'failed') {
        progress += 30;
      } else if (wishlistStatus === 'loading') {
        progress += 15;
      }
    } else {
      // If not authenticated, give remaining progress to products
      if (productsStatus === 'succeeded' || productsStatus === 'failed') {
        progress += 60;
      }
    }

    return Math.min(progress, 100);
  };

  const loadingProgress = calculateProgress();
  const currentStep = Math.floor((loadingProgress / 100) * 5); // 5 steps total

  if (isLoading) {
    return <LoadingScreen progress={loadingProgress} currentStep={currentStep} />;
  }

  return (
    <Router>
      <Routes>

        {/* 🔥 MAIN SITE LAYOUT (ONLY ONCE) */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected User Routes */}
          <Route
            path="profile"
            element={<ProtectedRoute><Profile /></ProtectedRoute>}
          />
          <Route
            path="wishlist"
            element={<ProtectedRoute><Wishlist /></ProtectedRoute>}
          />
          <Route
            path="my-orders"
            element={<ProtectedRoute><MyOrders /></ProtectedRoute>}
          />

          {/* Info Pages */}
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="help" element={<Help />} />
          <Route path="contact" element={<Contact />} />
          <Route path="careers" element={<Careers />} />
          <Route path="stories" element={<Stories />} />
          <Route path="corporate" element={<Corporate />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="refund-policy" element={<RefundPolicy />} />
          <Route path="shipping-policy" element={<ShippingPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="consumer-policy" element={<ConsumerPolicy />} />
        </Route>

        {/* 🔐 ADMIN PANEL */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="payments" element={<Payments />} />
          <Route path="coupons" element={<AdminCoupons />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      <Toaster position="top-center" richColors />
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
