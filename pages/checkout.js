import SEO from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import CheckoutForm from "../components/checkout-form";
import CheckoutItems from "../components/checkout-items";
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";

export default function Home() {
    return (
        <>
            <SEO title="Оформить заказ | Интернет магазин GOODZONE" />
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

// export async function getServerSideProps() {
//     const urls = [process.env.CATEGORY_API_URL];
//     const [{ categories }] = await fetchMultipleUrls(urls);

//     return {
//         props: {
//             categories,
//         },
//     };
// }
