import SEO from "../components/seo";
import Footer from "../components/footer";
import ProfileNav from "../components/profile-nav";
import OrderDetails from "../components/order-details";
import OrderList from "../components/order-list";
import OrderListMobile from "../components/order-list-mobile";

export default function Order() {
    return (
        <>
            <SEO title="Goodzone" />
            <div className="profile_wrapper">
                <ProfileNav activeTab="order" />
                <div className="order_box">
                    <OrderList />
                    <OrderListMobile />
                    <OrderDetails />
                </div>
            </div>
            <Footer />
        </>
    );
}
