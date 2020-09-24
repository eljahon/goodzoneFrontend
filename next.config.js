const { nextI18NextRewrites } = require("next-i18next/rewrites");
const localeSubpaths = {
  uz: "uz",
};

module.exports = {
  env: {
    PRODUCT_API_URL: "https://dev.goodzone.uz/v1/product",
    CATEGORY_API_URL: "https://dev.goodzone.uz/v1/category",
    BRAND_API_URL: "https://dev.goodzone.uz/v1/brand",
    REGISTER_API_URL: "https://dev.goodzone.uz/v1/customer/register",
    LOGIN_API_URL: "https://dev.goodzone.uz/v1/customer/login",
    CHECK_USER_API_URL: "https://dev.goodzone.uz/v1/customer/exists",
    AUTHORIZE_API_URL: "https://dev.goodzone.uz/v1/customer",
    RESER_PASSWORD_API_URL: "https://dev.goodzone.uz/v1/customer/send-code",
    CHECK_CODE_API_URL: "https://dev.goodzone.uz/v1/customer/check-code",
    CHANGE_PASSWORD_API_URL: "https://dev.goodzone.uz/v1/customer/profile",
    ORDER_API_URL: "https://dev.goodzone.uz/v1/order",
    PAYMENT_API_URL: "https://pay.goodzone.uz/redirectPayment",
    NEWS_API_URL: "https://dev.goodzone.uz/v1/new",
    PROMO_API_URL: "https://dev.goodzone.uz/v1/promo",
    MY_ORDERS_API_URL: "https://dev.goodzone.uz/v1/my-orders",
    SHOPS_API_URL: "https://dev.goodzone.uz/v1/shop",
    BANNER_API_URL: "https://dev.goodzone.uz/v1/banner",
    PROFILE_API_URL: "https://dev.goodzone.uz/v1/customer/profile",
    PRODUCT_FILTER_API_URL: "https://dev.goodzone.uz/v1/product/filter",
    FEEDBACK_API_URL: "https://dev.goodzone.uz/v1/feedback",
  },
  publicRuntimeConfig: {
    localeSubpaths,
  },
  experimental: {
    async rewrites() {
      return [...nextI18NextRewrites(localeSubpaths)];
    },
  },
};
