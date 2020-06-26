import SEO from "../components/seo";
import Header from "../components/header";
import HomeSplash from "../components/home-splash";
import ProductList from "../components/product-list";
import CartPopup from "../components/cart-popup";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { getProductsFromAPI } from "../redux/actions/productsActions/productsActions";
import { useEffect } from "react";
import isoFetch from "isomorphic-fetch";

export default function Home({ products }) {
    const store = useSelector((state) => state);
    console.log("store", store);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsFromAPI(products));
    }, []);

    return (
        <>
            <SEO title="Интернет магазин GOODZONE" />
            <Header />
            <HomeSplash />
            <ProductList data={products} />
            <CartPopup data={products} dynamic />
            <Footer />
        </>
    );
}

export async function getServerSideProps() {
    const res = await isoFetch(process.env.API_URL);
    const products = await res.json();

    return {
        props: {
            products,
        },
    };
}
