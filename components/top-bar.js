import React, { useRef, useEffect, useState } from 'react'
import { FaUser, FaSignInAlt, FaLanguage, FaSortDown } from 'react-icons/fa'
import ProfileMenu from './profile-menu'
import { useSelector, shallowEqual } from "react-redux";
import LangMenu from './lang-menu';
import Link from 'next/link'

export default function TopBar({ profilePopup, togglePopup, closeMenu, openLoginMenu, hasDynamicRouting }) {
    const [langMenu, setLangMenu] = useState(false);
    const user = useSelector((state) => state.auth.user, shallowEqual);

    const wrapperRef = useRef(null);
    useOutsideCloseMenu(wrapperRef);

    function useOutsideCloseMenu(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    closeMenu();
                    setLangMenu(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };

        }, [ref]);
    }

    return (
        <div className="top_bar" ref={wrapperRef}>
            <ul className="top_bar-list">
                <li className="menu_item">
                    <Link href="/promo">
                        <a>Акции и скидки</a>
                    </Link>
                </li>
                <li className="menu_item">
                    <Link href="/shops">
                        <a>Магазины</a>
                    </Link>
                </li>
                <li className="menu_item">
                    <Link href="/delivery">
                        <a>Доставка</a>
                    </Link>
                </li>
                <li className="menu_item">
                    <Link href="/news">
                        <a>Блог</a>
                    </Link>
                </li>
            </ul>
            <ul className="top_bar-list">
                <li className="list_item">
                    <div className="popover">
                        <div className="popover_handler">
                            <button
                                className="btn join_btn"
                                onClick={() => setLangMenu(!langMenu)}
                            >
                                <span className="join_icon">
                                    <img src={hasDynamicRouting ? '../images/russia.svg' : 'images/russia.svg'} alt="Русский"/>
                                </span>
                                <span className="btn-text">Русский</span>
                            </button>
                        </div>
                        {langMenu ? <LangMenu hasDynamicRouting={hasDynamicRouting} closeMenu={() => setLangMenu(false)} /> : ""}
                    </div>
                </li>
                <li className="list_item">
                    {user ? (
                        <div className="popover">
                            <div className="popover_handler">
                                <button
                                    className="btn join_btn"
                                    onClick={togglePopup}
                                >
                                    <span className="join_icon">
                                        <FaUser />
                                    </span>
                                    <span className="btn-text">Личный кабинет</span>
                                    <span className="join_icon">
                                        <FaSortDown />
                                    </span>
                                </button>
                            </div>
                            {profilePopup ? <ProfileMenu closeMenu={closeMenu} /> : ""}
                        </div>
                    ) : (
                            <button
                                className="btn join_btn"
                                onClick={openLoginMenu}
                            >
                                <span className="join_icon">
                                    <FaSignInAlt />
                                </span>
                                <span className="btn-text">Войти</span>
                            </button>
                        )}
                </li>
            </ul>
        </div>
    )
}