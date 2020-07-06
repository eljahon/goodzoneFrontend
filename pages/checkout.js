import SEO from "../components/seo";
import Footer from "../components/footer";
import CheckoutForm from "../components/checkout-form";
import CheckoutItems from "../components/checkout-items";

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
