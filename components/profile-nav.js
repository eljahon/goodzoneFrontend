import { logout } from "../redux/actions/authActions/authActions";
import { useDispatch } from "react-redux";
import { removeLocalStorage } from "../libs/localStorage";
import { useRouter } from "next/router";
import { withTranslation, Link } from '../i18n'

function ProfileNav({ activeTab, t }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const logoutHandler = (e) => {
        e.preventDefault();
        router.push("/");
        removeLocalStorage("access_token");
        dispatch(logout());
    };
    return (
        <div className="sidebar">
            <div className="sidebar_wrapper">
                <div className="sidebar_top">
                    <div className="sidebar_menu">
                        <Link href="/profile">
                            <a
                                className={
                                    activeTab === "profile"
                                        ? "current_page"
                                        : ""
                                }
                            >
                                <span className="label">{t('personal-area')}</span>
                            </a>
                        </Link>
                    </div>
                    <div className="sidebar_menu">
                        <Link href="/order">
                            <a
                                className={
                                    activeTab === "order" ? "current_page" : ""
                                }
                            >
                                <span className="label">{t('orders')}</span>
                            </a>
                        </Link>
                    </div>
                    <div className="sidebar_menu">
                        <Link href="/account">
                            <a
                                className={
                                    activeTab === "dashboard"
                                        ? "current_page"
                                        : ""
                                }
                            >
                                <span className="label">{t('dashboard')}</span>
                            </a>
                        </Link>
                    </div>
                    <div className="sidebar_menu">
                        <Link href="/">
                            <a>
                                <span onClick={logoutHandler} className="label">
                                    {t('exit')}
                            </span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withTranslation('navigation')(ProfileNav)