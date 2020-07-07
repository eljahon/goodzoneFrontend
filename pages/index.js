import SEO from "../components/seo";
import HomeSplash from "../components/home-splash";
import CartPopup from "../components/cart-popup";
import Footer from "../components/footer";
import { useDispatch } from "react-redux";
import { getProductsFromAPI } from "../redux/actions/productsActions/productsActions";
import { useEffect } from "react";
import Products from "../components/products";
import Banner from "../components/banner";
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";
import { getLocalStorage } from "../libs/localStorage";
import { axiosAuth } from "../libs/axios/axios-instances";
import { setUser } from "../redux/actions/authActions/authActions";

export default function Home({ products }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsFromAPI(products));
        // dispatch(getCategoriesFromAPI(categories));
    }, []);

    useEffect(() => {
        if (getLocalStorage("access_token")) {
            axiosAuth
                .get("/profile")
                .then(({ data: { customer: user } }) => dispatch(setUser(user)))
                .catch((error) => console.error(error));
        }
    }, []);

    return (
        <>
            <SEO title="Интернет магазин GOODZONE" />
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
    const urls = [process.env.PRODUCT_API_URL];
    const [{ products }] = await fetchMultipleUrls(urls);

    return {
        props: {
            products,
        },
    };
}
