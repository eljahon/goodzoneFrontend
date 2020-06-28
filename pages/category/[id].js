import SEO from "../../components/seo";
import Header from "../../components/header";
import ProductList from '../../components/product-list'
import CartPopup from "../../components/cart-popup";
import Footer from "../../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { getProductsFromAPI } from "../../redux/actions/productsActions/productsActions";
import { useEffect } from "react";
import ifetch from "isomorphic-fetch";
import { getCategoriesFromAPI } from "../../redux/actions/categoryActions/categoryActions";

export default function Category({ products, categories }) {
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
            <Header categories={categories} logo />
            <ProductList products={products} />
            <CartPopup />
            <Footer />
        </>
    );
}

export async function getServerSideProps() {
    const productsRes = await ifetch(process.env.PRODUCT_API_URL);
    const categoriesRes = await ifetch(process.env.CATEGORY_API_URL);
    const { products, count } = await productsRes.json();
    const { categories } = await categoriesRes.json();

    return {
        props: {
            products,
            categories,
        },
    };
}
