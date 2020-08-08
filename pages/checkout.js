import SEO from "../components/seo";
import Footer from "../components/footer";
import CheckoutForm from "../components/checkout-form";
import CheckoutItems from "../components/checkout-items";
import { withTranslation } from '../i18n'

function Checkout({ t }) {
    return (
        <>
            <SEO title={t('checkout')} />
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

export default withTranslation('checkout')(Checkout)
