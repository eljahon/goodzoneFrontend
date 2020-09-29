import SEO from "../components/seo";
import Footer from "../components/footer";
import ProfileNav from "../components/profile-nav";
import OrderDetails from "../components/order-details";
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";

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
export async function getServerSideProps({ req }) {
    const urls = [`${process.env.CATEGORY_API_URL}?lang=${req.i18n.language}`];

    const [categories] = await fetchMultipleUrls(urls);

    return {
        props: {
            categories,
        },
    };
}
