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
import { withTranslation } from '../i18n'

function Home({ products, t }) {
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
            <SEO />
            <HomeSplash />
            <Products title={t('new-arrivals')} data={products} />
            <Banner double />
            <Products title={t('popular-items')} data={products} />
            <Banner />
            <Products title={t('the-best-selection-for-you')} data={products} />
            <CartPopup />
            <Footer />
        </>
    );
}

export default withTranslation('common')(Home)


export async function getServerSideProps({ req }) {
    const urls = [`${process.env.PRODUCT_API_URL}?lang=${req.i18n.language}`];
    const [{ products }] = await fetchMultipleUrls(urls);

    return {
        props: {
            products,
        },
    };
}
