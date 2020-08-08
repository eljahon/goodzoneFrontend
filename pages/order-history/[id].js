import SEO from "../../components/seo";
import Footer from "../../components/footer";
import ProfileNav from "../../components/profile-nav";
import OrderDetails from "../../components/order-details";
import { fetchMultipleUrls } from "../../libs/fetchMultipleUrls";

function OrderHistory({ order }) {
    return (
        <>
            <SEO />
            <div className="profile_wrapper">
                <ProfileNav activeTab="order" />
                <div className="order_box">
                    <OrderDetails data={order} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default OrderHistory

export async function getServerSideProps({ params, req }) {
    const urls = [`${process.env.ORDER_API_URL}/${params.id}?lang=${req.i18n.language}`];

    const [order] = await fetchMultipleUrls(urls);

    return {
        props: { order },
    };
}
