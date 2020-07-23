import SEO from "../components/seo";
import Footer from "../components/footer";
import ProfileNav from "../components/profile-nav";
import OrderList from "../components/order-list";
import OrderListMobile from "../components/order-list-mobile";

export default function Order() {
    return (
        <>
            <SEO />
            <div className="profile_wrapper">
                <ProfileNav activeTab="order" />
                <div className="order_box">
                    <OrderList />
                    <OrderListMobile />
                </div>
            </div>
            <Footer />
        </>
    );
}
