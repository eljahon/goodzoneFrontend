import SEO from "../components/seo";
import Footer from "../components/footer";
import ProfileNav from "../components/profile-nav";
import OrderDetails from "../components/order-details";

export default function OrderSingle() {
    return (
        <>
            <SEO />
            <div className="profile_wrapper">
                <ProfileNav activeTab="order" />
                <div className="order_box">
                    <OrderDetails />
                </div>
            </div>
            <Footer />
        </>
    );
}
