import SEO from "../../components/seo";
import Header from "../../components/header";
import ProductList from "../../components/product-list";
import CartPopup from "../../components/cart-popup";
import Footer from "../../components/footer";
import { useDispatch } from "react-redux";
import { getProductsFromAPI } from "../../redux/actions/productsActions/productsActions";
import { useEffect } from "react";
import ifetch from "isomorphic-fetch";
import { getCategoriesFromAPI } from "../../redux/actions/categoryActions/categoryActions";

export default function Category({ products, categories, brands }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsFromAPI(products));
        dispatch(getCategoriesFromAPI(categories));
    }, []);

    return (
        <>
            <SEO title="Интернет магазин GOODZONE" />
            <Header categories={categories} logo />
            <ProductList products={products} brands={brands} />
            <CartPopup />
            <Footer />
        </>
    );
}

export async function getServerSideProps() {
    const productsRes = await ifetch(process.env.PRODUCT_API_URL);
    const categoriesRes = await ifetch(process.env.CATEGORY_API_URL);
    const brandsRes = await ifetch("http://139.59.38.238:1235/v1/brand");
    const { products, count } = await productsRes.json();
    const { categories } = await categoriesRes.json();
    const { brands } = await brandsRes.json();

    return {
        props: {
            products,
            categories,
            brands,
        },
    };
}
