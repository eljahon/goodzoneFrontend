import SEO from "../../components/seo";
import Header from "../../components/header";
import ProductList from "../../components/product-list";
import CartPopup from "../../components/cart-popup";
import Footer from "../../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { getProductsFromAPI } from "../../redux/actions/productsActions/productsActions";
import { useEffect } from "react";
import ifetch from "isomorphic-fetch";

export default function Category({ products }) {
    const store = useSelector((state) => state);
    console.log("store", store);
    // console.log("products", products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsFromAPI(products));
    }, []);

    return (
        <>
            <SEO title="Интернет магазин GOODZONE" />
            <Header logo />
            <ProductList data={products} />
            <CartPopup />
            <Footer />
        </>
    );
}

export async function getServerSideProps() {
    const res = await ifetch(process.env.PRODUCT_API_URL);
    const { products, count } = await res.json();

    return {
        props: {
            products,
        },
    };
}
