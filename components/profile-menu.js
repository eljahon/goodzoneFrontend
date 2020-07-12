import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { removeLocalStorage } from "../libs/localStorage";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions/authActions";

export default function ProfileMenu({ closeMenu }) {
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
                            <span className="label">Личный кабинет</span>
                        </a>
                    </Link>
                    <Link href="/order">
                        <a onClick={closeMenu}>
                            <span className="label">Заказы</span>
                        </a>
                    </Link>
                    <Link href="/logout">
                        <a onClick={(e) => logoutHandler(e)}>
                            <span className="label">Выйти</span>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
