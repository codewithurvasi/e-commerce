// src/utils/createPageUrl.js
export const createPageUrl = (pageName) => {
  const routes = {
    Home: '/',
    About: '/about',
    Cart: '/cart',
    Help: '/help',
    Contact: '/contact',
    Careers: '/careers',
    Stories: '/stories',
    Corporate: '/corporate',
    PrivacyPolicy: '/privacy-policy',
    RefundPolicy: '/refund-policy',
    ShippingPolicy: '/shipping-policy',
    TermsAndConditions: '/terms-and-conditions',
    ConsumerPolicy: '/consumer-policy'
  };
  return routes[pageName] || '/';
};