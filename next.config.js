const { nextI18NextRewrites } = require("next-i18next/rewrites");
const localeSubpaths = {
  uz: "uz",
};

module.exports = {
  env: {
    PERCENT: 20,
    REVIEW_API_URL: "https://api.goodzone.uz/v1/review",
    PRODUCT_API_URL: "https://api.goodzone.uz/v1/product",
    CATEGORY_API_URL: "https://api.goodzone.uz/v1/category",
    BRAND_API_URL: "https://api.goodzone.uz/v1/brand",
    REGISTER_API_URL: "https://api.goodzone.uz/v1/customer/register",
    LOGIN_API_URL: "https://api.goodzone.uz/v1/customer/login",
    CHECK_USER_API_URL: "https://api.goodzone.uz/v1/customer/exists",
    COSTUMER_CARD_CHECK_USER_API_URL:"https://api.goodzone.uz/v1/customer-card/check-code",
    COSTUMER_CARD_GET_API_URL:"https://api.goodzone.uz/v1/check-customer-card/exists",
    COSTUMER_CARD_GET_API_SEND_CODE_URL:"https://api.goodzone.uz/v1/customer-card/send-code",
    CUSTUMER_CARD_GET_CARDS_API_URL:"https://api.goodzone.uz/v1/get-customer-card",
    AUTHORIZE_API_URL: "https://api.goodzone.uz/v1/customer",
    RESER_PASSWORD_API_URL: "https://api.goodzone.uz/v1/customer/send-code",
    CHECK_CODE_API_URL: "https://api.goodzone.uz/v1/customer/check-code",
    CHANGE_PASSWORD_API_URL: "https://api.goodzone.uz/v1/customer/profile",
    ORDER_API_URL: "https://api.goodzone.uz/v1/order",
    PAYMENT_API_URL: "https://pay.goodzone.uz/redirectPayment",
    NEWS_API_URL: "https://api.goodzone.uz/v1/new",
    PROMO_API_URL: "https://api.goodzone.uz/v1/promo",
    MY_ORDERS_API_URL: "https://api.goodzone.uz/v1/my-orders",
    SHOPS_API_URL: "https://api.goodzone.uz/v1/shop",
    BANNER_API_URL: "https://api.goodzone.uz/v1/banner",
    PROFILE_API_URL: "https://api.goodzone.uz/v1/customer/profile",
    PRODUCT_FILTER_API_URL: "https://api.goodzone.uz/v1/v2/product/filter",
    FEEDBACK_API_URL: "https://api.goodzone.uz/v1/feedback",
    PAGE_API_URL: "https://api.goodzone.uz/v1/page",
    HOME_CONTENT_API_URL: "https://api.goodzone.uz/v1/home-content",
    AREA_API_URL: "https://api.goodzone.uz/v1/customer/area",
    UZCARD_REG_API_URL:
      "https://pay.myuzcard.uz/api/payment/paymentWithoutRegistration",
    UZCARD_CONF_API_URL: "https://pay.myuzcard.uz/api/payment/confirmPayment",
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
