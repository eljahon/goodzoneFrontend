import SEO from "../components/seo";
import Footer from "../components/footer";
import CheckoutForm from "../components/checkout-form";
import CheckoutItems from "../components/checkout-items";
import { withTranslation } from "../i18n";
import { useState } from "react";

function Checkout({ t }) {
    const [unired, setUnired] = useState(false);
    return (
        <>
            <SEO title={t("checkout")} />
            <div className="checkout_wrapper">
                <div className="checkout_container">
                    <CheckoutForm setUnired={setUnired} unired={unired} />
                    <CheckoutItems unired={unired} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withTranslation("checkout")(Checkout);
