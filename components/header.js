import { useState } from "react";
import {
    FaBars,
    FaSortDown,
    FaSearch,
    FaSignInAlt,
    FaUser,
} from "react-icons/fa";
import Link from "next/link";
import DepartmentsMenu from "./departments-menu";
import SearchModal from "./search-modal";
import LoginModal from "./login-modal";
import RegisterModal from "./register-modal";
import ProfileMenu from "./profile-menu";
import { useSelector, shallowEqual } from "react-redux";
import SearchBar from "./search-bar";

export default function Header({ categories }) {
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
                            <img src="logo.png" alt="Goodzone"/>
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
                <SearchBar />
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
                    <div className="menu_item">
                        <Link href="/blog">
                            <a>Блог</a>
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
                                </button>
                                <Link href="/account">
                                    <a className="btn join_btn mobile">
                                        <span className="join_icon">
                                            <FaUser />
                                        </span>
                                    </a>
                                </Link>
                            </div>
                            {profilePopup ? <ProfileMenu /> : ""}
                        </div>
                    ) : (
                        <button
                            className="btn join_btn"
                            onClick={() => setLoginPopup(true)}
                        >
                            <span className="join_icon">
                                <FaSignInAlt />
                            </span>
                            {/* <span className="btn-text">Войти</span> */}
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
