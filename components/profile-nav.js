import Link from "next/link";
import { logout } from "../redux/actions/authActions/authActions";
import { useDispatch } from "react-redux";
import { removeLocalStorage } from "../libs/localStorage";

export default function ProfileNav({ activeTab }) {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        removeLocalStorage("access_token");
        dispatch(logout());
    };
    return (
        <div className="sidebar">
            <div className="sidebar_wrapper">
                <div className="sidebar_top">
                    <div className="sidebar_menu">
                        <Link href="/account">
                            <a
                                className={
                                    activeTab === "dashboard"
                                        ? "current_page"
                                        : ""
                                }
                            >
                                <span className="label">Приборная доска</span>
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
                                <span className="label">Заказы</span>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="sidebar_bottom">
                    <div className="sidebar_menu">
                        <Link href="/profile">
                            <a
                                className={
                                    activeTab === "profile"
                                        ? "current_page"
                                        : ""
                                }
                            >
                                <span className="label">Личный кабинет</span>
                            </a>
                        </Link>
                    </div>
                    <div className="sidebar_menu">
                        <Link href="/">
                            <a>
                                <span onClick={logoutHandler} className="label">
                                    Выйти
                                </span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
