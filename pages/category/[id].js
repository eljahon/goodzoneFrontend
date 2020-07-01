import SEO from "../../components/seo";
import Header from "../../components/header";
import ProductList from "../../components/product-list";
import CartPopup from "../../components/cart-popup";
import Footer from "../../components/footer";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { getProductsFromAPI } from "../../redux/actions/productsActions/productsActions";
import { useEffect, useState } from "react";
import { getCategoriesFromAPI } from "../../redux/actions/categoryActions/categoryActions";
import axios from "axios";
import { fetchMultipleUrls } from "../../libs/fetchMultipleUrls";
import {
    clearFilters,
    getPrices,
} from "../../redux/actions/filterActions/filterActions";

export default function Category({
    categoryProducts,
    categories,
    brands,
    categoryId,
    query,
}) {
    const dispatch = useDispatch();

    const [filteredProducts, setFilteredProducts] = useState([]);

    const filterPriceRange = useSelector(
        (state) => state.filters.filterPriceRange
    ); // after filtering
    const filterBrands = useSelector(
        (state) => state.filters.brands,
        shallowEqual
    );

    useEffect(() => {
        const sortedProductsByPrice = categoryProducts.sort(
            (a, b) => a.price.price - b.price.price
        );
        const prices = [
            +sortedProductsByPrice[0].price.price,
            +sortedProductsByPrice[sortedProductsByPrice.length - 1].price
                .price,
        ];
        dispatch(getPrices(prices));
    }, [categoryProducts]);

    useEffect(() => {
        dispatch(getProductsFromAPI(categoryProducts));
        dispatch(getCategoriesFromAPI(categories));
    }, [categoryProducts, categories]);

    useEffect(() => {
        dispatch(clearFilters());
    }, [query]);

    useEffect(() => {
        axios
            .get(
                `${process.env.PRODUCT_API_URL}?brand=${filterBrands.join(
                    ","
                )}&category=${categoryId}&price_from=${
                    filterPriceRange.length && filterPriceRange[0]
                }&price_till=${filterPriceRange.length && filterPriceRange[1]}`
            )
            .then((data) => {
                const { products } = data.data;
                setFilteredProducts(products);
                console.log("products", products);
            })
            .catch((error) => console.log("error", error));
    }, [filterBrands, categoryId, filterPriceRange]);

    return (
        <>
            <SEO title="Интернет магазин GOODZONE" />
            <Header categories={categories} logo />
            <ProductList products={filteredProducts} brands={brands} />
            <CartPopup />
            <Footer />
        </>
    );
}

export async function getServerSideProps({ query }) {
    const urls = [process.env.CATEGORY_API_URL, process.env.BRAND_API_URL];

    const [{ categories }, { brands }] = await fetchMultipleUrls(urls);

    let categoryId;
    categories.forEach((category) => {
        let foundCategory;
        if (category.children) {
            foundCategory = category.children.find(
                (ctg) => ctg.slug === query.id
            );
        }

        if (foundCategory) categoryId = foundCategory.id;
    });

    const [{ products: categoryProducts }] = await fetchMultipleUrls([
        `${process.env.PRODUCT_API_URL}?category=${categoryId}`,
    ]);

    return {
        props: {
            categoryProducts,
            categories,
            brands,
            categoryId,
            query,
        },
    };
}
