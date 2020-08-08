import SEO from "../components/seo";
import Footer from "../components/footer";
import ProfileNav from "../components/profile-nav";
import { withTranslation } from '../i18n'

function Account({ t }) {
    return (
        <>
            <SEO />
            <div className="profile_wrapper">
                <ProfileNav activeTab="dashboard" />
                <div className="profile_content">
                    <div className="settings_form">
                        <div className="settings_form-content">
                            <div className="heading">
                                <h3>{t('dashboard')}</h3>
                            </div>
                            {/* <p>Здраствуйте 
                                <span className="user"> User </span>
                                 (Вы не <span className="user"> User? </span> 
                                 <Link href="/">
                                     <a> Выйти</a>
                                </Link>)
                            </p> */}
                            <p>{t('dashboard-description')}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withTranslation('navigation')(Account)