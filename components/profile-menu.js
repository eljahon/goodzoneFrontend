import React from "react";
import { useRouter } from "next/router";
import { removeLocalStorage } from "../libs/localStorage";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions/authActions";
import { withTranslation, Link } from '../i18n'

function ProfileMenu({ closeMenu, t }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const logoutHandler = (e) => {
        e.preventDefault();
        router.push("/");
        removeLocalStorage("access_token");
        dispatch(logout());
        closeMenu();
    };
    return (
        <div className="popover_content">
            <ul className="inner_wrap">
                <li className="menu_item">
                    <Link href="/profile">
                        <a onClick={closeMenu}>
                            <span className="label">{t('personal-area')}</span>
                        </a>
                    </Link>
                    <Link href="/order">
                        <a onClick={closeMenu}>
                            <span className="label">{t('my-orders')}</span>
                        </a>
                    </Link>
                    <Link href="/address">
                        <a onClick={closeMenu}>
                            <span className="label">{t('my-addresses')}</span>
                        </a>
                    </Link>
                    <Link href="/logout">
                        <a onClick={(e) => logoutHandler(e)}>
                            <span className="label">{t('exit')}</span>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default withTranslation('navigation')(ProfileMenu)