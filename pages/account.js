import SEO from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import ProfileNav from "../components/profile-nav";
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";
import Link from "next/link";

export default function Account() {
    return (
        <>
            <SEO title="Goodzone" />
            <div className="profile_wrapper">
                <ProfileNav activeTab="dashboard" />
                <div className="profile_content">
                    <div className="settings_form">
                        <div className="settings_form-content">
                            <div className="heading">
                                <h3>Приборная доска</h3>
                            </div>
                            {/* <p>Здраствуйте 
                                <span className="user"> User </span>
                                 (Вы не <span className="user"> User? </span> 
                                 <Link href="/">
                                     <a> Выйти</a>
                                </Link>)
                            </p> */}
                            <p>
                                С панели управления вашей учетной записи вы
                                можете просмотреть Недавние заказы, управлять
                                своимадреса доставки и выставления счетов и
                                измените свой пароль и данные учетной записи.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

// export async function getServerSideProps() {
//     // Please write to me if you have some problems with understanding this fetchMultipleUrls function
//     // I wrote it for not repeating code and making us easier
//     const urls = [process.env.CATEGORY_API_URL];
//     const [{ categories }] = await fetchMultipleUrls(urls);

//     return {
//         props: {
//             categories,
//         },
//     };
// }
