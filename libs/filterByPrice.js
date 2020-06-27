export const filterByPrice = (lowest, highest, products) => {
    return products.filter(
        (product) => product.price >= lowest && product.price <= highest
    );
};
