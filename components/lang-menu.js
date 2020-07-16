import React from "react";
import Link from "next/link";
import { i18n, withTranslation } from '../i18n'

function LangMenu({ closeMenu, hasDynamicRouting, t }) {
    const changeLangToUz = (e) => {
        e.preventDefault();
        i18n.changeLanguage('uz');
        closeMenu();
    }
    const changeLangToRu = (e) => {
        e.preventDefault();
        i18n.changeLanguage('ru');
        closeMenu();
    }
    return (
        <div className="popover_content">
            <ul className="inner_wrap">
                <li className="menu_item lang_item">
                    <Link href="/uz">
                        <a onClick={(e) => changeLangToUz(e)}>
                            <img src={hasDynamicRouting ? '../images/uzb.svg' : 'images/uzb.svg'} alt="Uzb"/>
                            <span className="label">O'zbek</span>
                        </a>
                    </Link>
                    <Link href="/ru">
                        <a onClick={(e) => changeLangToRu(e)}>
                            <img src={hasDynamicRouting ? '../images/russia.svg' : 'images/russia.svg'} alt="Russia"/>
                            <span className="label">Русский</span>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default withTranslation('common')(LangMenu)
