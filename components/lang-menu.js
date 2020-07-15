import React from "react";
import Link from "next/link";

export default function LangMenu({ closeMenu, hasDynamicRouting }) {
    return (
        <div className="popover_content">
            <ul className="inner_wrap">
                <li className="menu_item lang_item">
                    <Link href="/en">
                        <a onClick={closeMenu}>
                            <img src={hasDynamicRouting ? '../images/uzb.svg' : 'images/uzb.svg'} alt="Uzb"/>
                            <span className="label">O'zbek</span>
                        </a>
                    </Link>
                    <Link href="/ru">
                        <a onClick={closeMenu}>
                            <img src={hasDynamicRouting ? '../images/russia.svg' : 'images/russia.svg'} alt="Russia"/>
                            <span className="label">Русский</span>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
