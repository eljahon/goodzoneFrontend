import React from "react";
import Link from "next/link";

export default function ProfileMenu({ logout }) {
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
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
                        <a onClick={(e) => handleLogout(e)}>
                            <span className="label">Выйти</span>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
