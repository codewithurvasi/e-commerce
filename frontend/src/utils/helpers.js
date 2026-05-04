/**
 * Formats a number as Indian Rupee (INR) currency
 * Used in: ProductCard.jsx, Cart.jsx
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Calculates the percentage discount between original and current price
 * Used in: ProductCard.jsx
 */
export const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

/**
 * Validates Indian Phone Numbers
 * Used in: Contact.jsx, Careers.jsx
 */
export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/;
  return re.test(phone);
};

/**
 * Truncates long text with ellipses
 * Used for product titles in grids
 */
export const truncateText = (text, limit = 40) => {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + '...';
};