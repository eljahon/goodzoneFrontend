import SEO from "../components/seo";
import Header from "../components/header";
import HomeSplash from "../components/home-splash";
import CartPopup from "../components/cart-popup";
import Footer from "../components/footer";
import { useDispatch } from "react-redux";
import { getProductsFromAPI } from "../redux/actions/productsActions/productsActions";
import { useEffect } from "react";
import { getCategoriesFromAPI } from "../redux/actions/categoryActions/categoryActions";
import Products from "../components/products";
import Banner from "../components/banner";
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";

export default function Home({ products, categories }) {
    const dispatch = useDispatch();
    console.log("categories", categories);

    console.log("products", products);

    useEffect(() => {
        dispatch(getProductsFromAPI(products));
        dispatch(getCategoriesFromAPI(categories));
    }, []);

    return (
        <>
            <SEO title="Интернет магазин GOODZONE" />
            <Header categories={categories} />
            <HomeSplash />
            <Products title="Новые поступления" data={products} />
            <Banner double />
            <Products title="Популярные товары" data={products} />
            <Banner />
            <Products title="Лучшая подборка для вас" data={products} />
            <CartPopup />
            <Footer />
        </>
    );
}

export async function getServerSideProps() {
    // Please write to me if you have some problems with understanding this fetchMultipleUrls function
    // I wrote it for not repeating code and making us easier
    const urls = [process.env.PRODUCT_API_URL, process.env.CATEGORY_API_URL];
    const [{ products }, { categories }] = await fetchMultipleUrls(urls);

    return {
        props: {
            products,
            categories,
        },
    };
}
