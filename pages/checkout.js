import SEO from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import CheckoutForm from "../components/checkout-form";
import CheckoutItems from "../components/checkout-items";
import ifetch from "isomorphic-fetch";

export default function Home({ categories }) {
    return (
        <>
            <SEO title="Оформить заказ | Интернет магазин GOODZONE" />
            <Header categories={categories} />
            <div className="checkout_wrapper">
                <div className="checkout_container">
                    <CheckoutForm />
                    <CheckoutItems />
                </div>
            </div>
            <Footer />
        </>
    );
}

export async function getServerSideProps() {
    const response = await ifetch(process.env.CATEGORY_API_URL);
    const categories = await response.json();

    return {
        props: {
            categories,
        },
    };
}
