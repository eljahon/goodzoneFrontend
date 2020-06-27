import React, { useState, useEffect, useCallback } from 'react'
import {FaBars, FaSortDown, FaSearch, FaSignInAlt } from 'react-icons/fa'
import Link from "next/link";
import DepartmentsMenu from "./departments-menu";

export default function Header({ logo }) {
    const [menu, setMenu] = useState(false);
    const [categories, getCategories] = useState([]);
    useEffect(() => {
        fetch(process.env.CATEGORY_API_URL)
            .then(res => res.json())
            .then(categories => getCategories(categories))
    })
    return (
        <>
            <header>
                <div className="left_menu">
                    <Link href="/">
                        <a className="logo"><img src={logo ? '../logo.png' : 'logo.png'} alt="Goodzone"/></a>
                    </Link>
                    <div className="menu">
                        <div className="popover">
                            <div className="popover_handler">
                                <button className="btn selected_item" onClick={() => setMenu(!menu)}>
                                <span>
                                    <span className="menu_icon"><FaBars/></span>
                                    <span>Все категории</span>
                                </span>
                                    <span className="menu_arrow"><FaSortDown/></span>
                                </button>
                            </div>
                            {menu ? <DepartmentsMenu data={categories} /> : ''}
                        </div>
                    </div>
                </div>
                <div className="search_box">
                    <div className="search_box-wrapper">
                        <div className="search_input-wrapper">
                            <form>
                                <span className="search_icon"><FaSearch/></span>
                                <input type="text" className="search_box-input"
                                       placeholder="Поиск по товарам"/>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="right_menu">
                    <div className="menu_item">
                        <Link href="/">
                            <a>Акции и скидки</a>
                        </Link>
                    </div>
                    <div className="menu_item">
                        <Link href="/">
                            <a>Магазины</a>
                        </Link>
                    </div>
                    <div className="menu_item">
                        <Link href="/">
                            <a>Доставка</a>
                        </Link>
                    </div>
                    <button className="btn join_btn">
                        <span className="join_icon"><FaSignInAlt /></span>
                        <span className="btn-text">Войти</span>
                    </button>
                </div>
            </header>
            <div className="base_header" />
        </>
    )
}