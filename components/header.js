import React, { useState, useRef, useEffect } from "react";
import {
    FaBars,
    FaSortDown,
    FaSearch,
    FaSignInAlt,
    FaUser,
    FaRegHeart
} from "react-icons/fa";
import DepartmentsMenu from "./departments-menu";
import SearchModal from "./search-modal";
import LoginModal from "./login-modal";
import RegisterModal from "./register-modal";
import ProfileMenu from "./profile-menu";
import { useSelector, shallowEqual } from "react-redux";
import SearchBar from "./search-bar";
import { useRouter } from 'next/router'
import TopBar from "./top-bar";
import Headroom from 'react-headroom'
import { Link, withTranslation } from '../i18n'

function Header({ categories, t }) {
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

    const router = useRouter();
    const hasDynamicRouting = router.query.id;

    const wrapperRef = useRef(null);
    useOutsideCloseMenu(wrapperRef);

    function useOutsideCloseMenu(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setMenu(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };

        }, [ref]);
    }

    return (
        <>
            <TopBar
                profilePopup={profilePopup}
                togglePopup={() => setProfilePopup(!profilePopup)}
                closeMenu={() => setProfilePopup(false)}
                openLoginMenu={() => setLoginPopup(true)}
                hasDynamicRouting={hasDynamicRouting}
            />
            <Headroom>
                <header ref={wrapperRef}>
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
                                <img src={hasDynamicRouting ? "../logo.svg" : "/logo.svg"} alt="Goodzone" />
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
                                            <span>{t('all-categories')}</span>
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
                        {/* <div className="menu_item">
                            <Link href="/promo">
                                <a><FaRegHeart /></a>
                            </Link>
                        </div> */}
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
                                        <span className="btn-text">{t('personal-area')}</span>
                                    </button>
                                    <Link href="/account">
                                        <a className="btn join_btn mobile">
                                            <span className="join_icon">
                                                <FaUser />
                                            </span>
                                        </a>
                                    </Link>
                                </div>
                                {profilePopup ? <ProfileMenu closeMenu={() => setProfilePopup(false)} /> : ""}
                            </div>
                        ) : (
                                <button
                                    className="btn join_btn"
                                    onClick={() => setLoginPopup(true)}
                                >
                                    <span className="join_icon">
                                        <FaSignInAlt />
                                    </span>
                                    <span className="btn-text">{t('login')}</span>
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
            </Headroom>
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

export default withTranslation('common')(Header)