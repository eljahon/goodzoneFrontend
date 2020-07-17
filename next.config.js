const { nextI18NextRewrites } = require('next-i18next/rewrites')
const localeSubpaths = {
    ru: 'ru',
    uz: 'uz'
}

module.exports = {
    env: {
        PRODUCT_API_URL: "https://dev.goodzone.uz/v1/product",
        CATEGORY_API_URL: "https://dev.goodzone.uz/v1/category",
        BRAND_API_URL: "https://dev.goodzone.uz/v1/brand",
        REGISTER_API_URL: "https://dev.goodzone.uz/v1/customer/register",
        LOGIN_API_URL: "https://dev.goodzone.uz/v1/customer/login",
        AUTHORIZE_API_URL: "https://dev.goodzone.uz/v1/customer",
        ORDER_API_URL: "https://dev.goodzone.uz/v1/order",
        PAYMENT_API_URL: "https://pay.goodzone.uz/redirectPayment",
    },
    publicRuntimeConfig: {
        localeSubpaths,
    },
    experimental: {
        async rewrites() {
            return [
                ...nextI18NextRewrites(localeSubpaths)
            ]
        }
    }
};
