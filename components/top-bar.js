import React, { useRef, useEffect, useState } from 'react'
import { FaUser, FaSignInAlt, FaSortDown, FaPhoneAlt } from 'react-icons/fa'
import ProfileMenu from './profile-menu'
import { useSelector, shallowEqual } from "react-redux";
import { Link, withTranslation, i18n } from '../i18n'

function TopBar({ openLoginMenu, t }) {
    const [profileMenu, setProfileMenu] = useState(false);
    const user = useSelector((state) => state.auth.user, shallowEqual);

    const wrapperRef = useRef(null);
    useOutsideCloseMenu(wrapperRef);

    function useOutsideCloseMenu(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setProfileMenu(false);
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
                        <a>{t('promo')}</a>
                    </Link>
                </li>
                <li className="menu_item">
                    <Link href="/shops">
                        <a>{t('shops')}</a>
                    </Link>
                </li>
                <li className="menu_item">
                    <Link href="/delivery">
                        <a>{t('delivery')}</a>
                    </Link>
                </li>
                <li className="menu_item">
                    <Link href="/news">
                        <a>{t('blog')}</a>
                    </Link>
                </li>
            </ul>
            <ul className="top_bar-list">
                <li className="list_item menu_item">
                    <a href="tel:+998712070307" className="phone_number"><FaPhoneAlt /> +998 (71) 207-03-07</a>
                </li>
                <li className="list_item">
                    {user ? (
                        <div className="popover">
                            <div className="popover_handler">
                                <button
                                    className="btn join_btn"
                                    onClick={() => setProfileMenu(!profileMenu)}
                                >
                                    <span className="join_icon">
                                        <FaUser />
                                    </span>
                                    <span className="btn-text">{t('personal-area')}</span>
                                    <span className="join_icon">
                                        <FaSortDown />
                                    </span>
                                </button>
                            </div>
                            {profileMenu ? <ProfileMenu closeMenu={() => setProfileMenu(false)} /> : ""}
                        </div>
                    ) : (
                            <button
                                className="btn join_btn"
                                onClick={openLoginMenu}
                            >
                                <span className="join_icon">
                                    <FaSignInAlt />
                                </span>
                                <span className="btn-text">{t('login')}</span>
                            </button>
                        )}
                </li>
            </ul>
        </div>
    )
}

export default withTranslation('navigation')(TopBar)