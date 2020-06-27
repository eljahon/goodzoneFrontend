import SEO from "../components/seo";
import Header from "../components/header";
import HomeSplash from "../components/home-splash";
import ProductList from "../components/product-list";
import CartPopup from "../components/cart-popup";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { getProductsFromAPI } from "../redux/actions/productsActions/productsActions";
import { useEffect } from "react";
import ifetch from "isomorphic-fetch";
import { getCategoriesFromAPI } from "../redux/actions/categoryActions/categoryActions";

export default function Home({ products, categories }) {
    const store = useSelector((state) => state);
    console.log("store", store);
    // console.log("products", products);
    // console.log("categories", categories);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsFromAPI(products));
        dispatch(getCategoriesFromAPI(categories));
    }, []);

    return (
        <>
            <SEO title="Интернет магазин GOODZONE" />
            <Header categories={categories} />
            <HomeSplash />
            <ProductList products={products} />
            <CartPopup />
            <Footer />
        </>
    );
}

export async function getServerSideProps() {
    const productsRes = await ifetch("http://139.59.38.238:1235/v1/product");
    const categoriesRes = await ifetch("http://139.59.38.238:1235/v1/category");
    const { products, count } = await productsRes.json();
    const { categories } = await categoriesRes.json();

    return {
        props: {
            products,
            categories,
        },
    };
}
