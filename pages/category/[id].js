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
import { clearFilters } from "../../redux/actions/brandActions/brandActions";

export default function Category({
    products,
    categories,
    brands,
    categoryId,
    query,
}) {
    const dispatch = useDispatch();
    const filterBrands = useSelector((state) => state.brands, shallowEqual);

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        dispatch(getProductsFromAPI(products));
        dispatch(getCategoriesFromAPI(categories));
    }, []);

    useEffect(() => {
        dispatch(clearFilters());
    }, [query]);

    useEffect(() => {
        axios
            .get(
                `${process.env.PRODUCT_API_URL}?brand=${filterBrands.join(
                    ","
                )}&category=${categoryId}`
            )
            .then((data) => {
                const { products } = data.data;
                setFilteredProducts(products);
            })
            .catch((error) => console.log("error", error));
    }, [filterBrands, categoryId]);

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
    const urls = [
        process.env.PRODUCT_API_URL,
        process.env.CATEGORY_API_URL,
        process.env.BRAND_API_URL,
    ];

    const [{ products }, { categories }, { brands }] = await fetchMultipleUrls(
        urls
    );

    let categoryId;
    categories.forEach((category) => {
        const foundCategory = category.children.find(
            (ctg) => ctg.slug === query.id
        );
        if (foundCategory) categoryId = foundCategory.id;
    });

    return {
        props: {
            products,
            categories,
            brands,
            categoryId,
            query,
        },
    };
}
