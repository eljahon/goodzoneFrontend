import SEO from "../components/seo";
import Header from "../components/header";
import HomeSplash from "../components/home-splash";
import ProductList from "../components/product-list";
import CartPopup from "../components/cart-popup";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { getProductsFromAPI } from "../redux/actions/productsActions/productsActions";
import { useEffect } from "react";

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
            <CartPopup data={products} />
            <Footer />
        </>
    );
}

export async function getStaticProps() {
    const res = await fetch(process.env.API_URL);
    const products = await res.json();

    return {
        props: {
            products,
        },
    };
}
