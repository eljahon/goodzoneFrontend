import { useState, useEffect } from "react";
import {
    FaBars,
    FaSortDown,
    FaSearch,
    FaSignInAlt,
    FaUser,
    FaSort,
} from "react-icons/fa";
import Link from "next/link";
import DepartmentsMenu from "./departments-menu";
import SearchModal from "./search-modal";
import LoginModal from "./login-modal";
import RegisterModal from "./register-modal";
import ProfileMenu from "./profile-menu";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { removeLocalStorage, getLocalStorage } from "../libs/localStorage";
import { logout, setUser } from "../redux/actions/authActions/authActions";
import { axiosAuth } from "../libs/axios/axios-instances";

export default function Header({ logo, categories }) {
    const dispatch = useDispatch();

    const [menu, setMenu] = useState(false);
    const [searchPopup, setSearchPopup] = useState(false);
    const [loginPopup, setLoginPopup] = useState(false);
    const [registerPopup, setRegisterPopup] = useState(false);
    const [profilePopup, setProfilePopup] = useState(false);
    const switchPopup = () => {
        setLoginPopup(!loginPopup);
        setRegisterPopup(!registerPopup);
    };

    const user = useSelector((state) => state.auth.user, shallowEqual);
    console.log("user", user);

    // useEffect(() => {
    //     if (getLocalStorage("access_token")) {
    //         console.log("HEADER FETCH");
    //         axiosAuth
    //             .get()
    //             .then(({ data: { customer: user } }) => dispatch(setUser(user)))
    //             .catch((error) => console.error(error));
    //     }
    // }, []);

    const logoutHandler = () => {
        removeLocalStorage("access_token");
        dispatch(logout());
    };

    return (
        <>
            <header>
                <div className="left_menu">
                    <button
                        className="btn hamburger_icon"
                        onClick={() => setMenu(true)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                    <Link href="/">
                        <a className="logo">
                            <img
                                src={logo ? "../logo.png" : "logo.png"}
                                alt="Goodzone"
                            />
                        </a>
                    </Link>
                    <div className="menu">
                        <div className="popover">
                            <div className="popover_handler">
                                <button
                                    className="btn selected_item"
                                    onClick={() => setMenu(!menu)}
                                >
                                    <span>
                                        <span className="menu_icon">
                                            <FaBars />
                                        </span>
                                        <span>Все категории</span>
                                    </span>
                                    <span className="menu_arrow">
                                        <FaSortDown />
                                    </span>
                                </button>
                            </div>
                            {menu ? (
                                <DepartmentsMenu
                                    logo
                                    categories={categories}
                                    closeMenu={() => setMenu(false)}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
                <div className="search_box">
                    <div className="search_box-wrapper">
                        <div className="search_input-wrapper">
                            <form>
                                <span className="search_icon">
                                    <FaSearch />
                                </span>
                                <input
                                    type="text"
                                    className="search_box-input"
                                    placeholder="Поиск по товарам"
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="right_menu">
                    <div className="menu_item">
                        <Link href="/promo">
                            <a>Акции и скидки</a>
                        </Link>
                    </div>
                    <div className="menu_item">
                        <Link href="/">
                            <a>Магазины</a>
                        </Link>
                    </div>
                    <div className="menu_item">
                        <Link href="/delivery">
                            <a>Доставка</a>
                        </Link>
                    </div>
                    {user ? (
                        <div className="popover">
                            <div className="popover_handler">
                                <button
                                    className="btn join_btn"
                                    onClick={() =>
                                        setProfilePopup(!profilePopup)
                                    }
                                >
                                    <span className="join_icon">
                                        <FaUser />
                                    </span>
                                    <span className="btn-text">
                                        Личный кабинет
                                    </span>
                                    <span className="join_icon">
                                        <FaSortDown />
                                    </span>
                                </button>
                                <Link href="/account">
                                    <a className="btn join_btn mobile">
                                        <span className="join_icon">
                                            <FaUser />
                                        </span>
                                    </a>
                                </Link>
                            </div>
                            {profilePopup ? (
                                <ProfileMenu logout={logoutHandler} />
                            ) : (
                                ""
                            )}
                        </div>
                    ) : (
                        <button
                            className="btn join_btn"
                            onClick={() => setLoginPopup(true)}
                        >
                            <span className="join_icon">
                                <FaSignInAlt />
                            </span>
                            <span className="btn-text">Войти</span>
                        </button>
                    )}
                    <button
                        className="btn search_btn mobile"
                        onClick={() => setSearchPopup(true)}
                    >
                        <span className="search_icon">
                            <FaSearch />
                        </span>
                    </button>
                </div>
            </header>
            <div className="base_header" />
            {searchPopup ? (
                <SearchModal closeModal={() => setSearchPopup(false)} />
            ) : (
                ""
            )}
            {loginPopup ? (
                <LoginModal
                    closeModal={() => setLoginPopup(false)}
                    goRegister={() => switchPopup()}
                />
            ) : (
                ""
            )}
            {registerPopup ? (
                <RegisterModal
                    closeModal={() => setRegisterPopup(false)}
                    login={() => switchPopup()}
                />
            ) : (
                ""
            )}
        </>
    );
}
