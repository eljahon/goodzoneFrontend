import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { removeLocalStorage } from "../libs/localStorage";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions/authActions";

export default function ProfileMenu() {
    const router = useRouter();
    const dispatch = useDispatch();

    const logoutHandler = (e) => {
        e.preventDefault();
        router.push("/");
        removeLocalStorage("access_token");
        dispatch(logout());
    };
    return (
        <div className="popover_content">
            <ul className="inner_wrap">
                <li className="menu_item">
                    <Link href="/profile">
                        <a>
                            <span className="label">Пользователь</span>
                        </a>
                    </Link>
                    <Link href="/order">
                        <a>
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
