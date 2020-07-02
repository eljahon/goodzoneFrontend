import SEO from '../components/seo'
import Header from '../components/header'
import Footer from '../components/footer';
import ProfileNav from '../components/profile-nav'
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";
import OrderDetails from '../components/order-details';
import OrderList from '../components/order-list';


export default function Order({ categories }) {
    return (
        <>
            <SEO title="Goodzone" />
            <Header categories={categories} />
            <div className="profile_wrapper">
                <ProfileNav activeTab="order" />
                <div className="order_box">
                    <OrderList />
                    <OrderDetails />
                </div>
            </div>
            <Footer />
        </>
    )
}

export async function getServerSideProps() {
    // Please write to me if you have some problems with understanding this fetchMultipleUrls function
    // I wrote it for not repeating code and making us easier
    const urls = [process.env.CATEGORY_API_URL];
    const [{ categories }] = await fetchMultipleUrls(urls);

    return {
        props: {
            categories,
        },
    };
}