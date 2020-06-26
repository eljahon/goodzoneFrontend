import SEO from "../components/seo";
import Header from "../components/header";
import HomeSplash from "../components/home-splash";
import ProductList from "../components/product-list";
import CartPopup from "../components/cart-popup";
import { useEffect, useState } from "react";
import Footer from "../components/footer";

export default function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("/api/products")
            .then((res) => {
                console.log("res", res);
                return res.json();
            })
            .then((data) => {
                setData(data);
                console.log("data", data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <SEO title="Интернет магазин GOODZONE" />
            <Header />
            <HomeSplash />
            <ProductList data={data} />
            <CartPopup data={data} />
            <Footer />
        </>
    );
}
