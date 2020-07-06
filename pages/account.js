import SEO from "../components/seo";
import Footer from "../components/footer";
import ProfileNav from "../components/profile-nav";

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
