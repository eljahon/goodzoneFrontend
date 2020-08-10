import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaArrowDown, FaTimes } from "react-icons/fa";
import { i18n } from "../i18n";

export default function DepartmentsMenu({ categories, closeMenu }) {
    const vw = window.innerWidth;
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
        const vw = window.innerWidth;
        if (vw < 900) document.body.classList.add("overflow");
        return () => document.body.classList.remove("overflow");
    });

    return (
        <div className={`popover_content ${loaded ? "show" : ""}`}>
            <div className="drawer_header">
                <Link href={i18n.language === "ru" ? "/" : "/uz"}>
                    <a onClick={closeMenu}>
                        <img src="/logo.svg" alt="Goodzone" />
                    </a>
                </Link>
                <button className="btn btn_close" onClick={closeMenu}>
                    <span className="close_icon">
                        <FaTimes />
                    </span>
                </button>
            </div>
            <ul className="inner_wrap">
                {categories.map((item) => {
                    if (item.children) {
                        return (
                            <li key={item.id} className="menu_item bold">
                                <Link
                                    href={`${
                                        i18n.language === "ru" ? "" : "/uz"
                                    }/shop/[id]`}
                                    as={`${
                                        i18n.language === "ru" ? "" : "/uz"
                                    }/shop/${item.slug}`}
                                >
                                    <a onClick={(e) => e.preventDefault()}>
                                        <span className="label">
                                            {/* <span className="menu_icon">
                                        <img src={item.image} alt={item.name} className="img-fluid" />
                                    </span> */}
                                            {item.name}
                                        </span>
                                        <span className="menu_icon">
                                            <FaArrowRight />
                                        </span>
                                    </a>
                                </Link>
                                <ul
                                    className={`dropdown_menu ${
                                        item.children ? "" : "empty"
                                    }`}
                                >
                                    <div className="left">
                                        {item.children.map((child) => {
                                            return child.children ? null : (
                                                <li
                                                    key={child.id}
                                                    className={`menu_item bold ${
                                                        child.children
                                                            ? "with-children"
                                                            : "no-children"
                                                    }`}
                                                >
                                                    <Link
                                                        href={`${
                                                            i18n.language ===
                                                            "ru"
                                                                ? ""
                                                                : "/uz"
                                                        }/shop/[id]`}
                                                        as={`${
                                                            i18n.language ===
                                                            "ru"
                                                                ? ""
                                                                : "/uz"
                                                        }/shop/${child.slug}`}
                                                    >
                                                        <a
                                                            onClick={
                                                                child.children
                                                                    ? (e) =>
                                                                          e.preventDefault()
                                                                    : closeMenu
                                                            }
                                                        >
                                                            <span className="label">
                                                                {child.name}
                                                            </span>
                                                            {child.children ? (
                                                                <span className="menu_icon">
                                                                    {vw >
                                                                    576 ? (
                                                                        <FaArrowDown />
                                                                    ) : (
                                                                        <FaArrowRight />
                                                                    )}
                                                                </span>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </a>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </div>
                                    <div className="right">
                                        {item.children.map((child) => {
                                            return child.children ? (
                                                <li
                                                    key={child.id}
                                                    className={`menu_item bold ${
                                                        child.children
                                                            ? "with-children"
                                                            : "no-children"
                                                    }`}
                                                >
                                                    <Link
                                                        href={`${
                                                            i18n.language ===
                                                            "ru"
                                                                ? ""
                                                                : "/uz"
                                                        }/shop/[id]`}
                                                        as={`${
                                                            i18n.language ===
                                                            "ru"
                                                                ? ""
                                                                : "/uz"
                                                        }/shop/${child.slug}`}
                                                    >
                                                        <a
                                                            onClick={
                                                                child.children
                                                                    ? (e) =>
                                                                          e.preventDefault()
                                                                    : closeMenu
                                                            }
                                                        >
                                                            <span className="label">
                                                                {child.name}
                                                            </span>
                                                            {child.children ? (
                                                                <span className="menu_icon">
                                                                    <FaArrowRight />
                                                                </span>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </a>
                                                    </Link>
                                                    {child.children ? (
                                                        <ul className="sub-list">
                                                            {child.children.map(
                                                                (sub) => (
                                                                    <li
                                                                        key={
                                                                            sub.id
                                                                        }
                                                                        className={
                                                                            child
                                                                                .children
                                                                                .length >
                                                                            10
                                                                                ? "column"
                                                                                : ""
                                                                        }
                                                                    >
                                                                        <Link
                                                                            href={`${
                                                                                i18n.language ===
                                                                                "ru"
                                                                                    ? ""
                                                                                    : "/uz"
                                                                            }/shop/[id]`}
                                                                            as={`${
                                                                                i18n.language ===
                                                                                "ru"
                                                                                    ? ""
                                                                                    : "/uz"
                                                                            }/shop/${
                                                                                sub.slug
                                                                            }`}
                                                                        >
                                                                            <a
                                                                                className="normal"
                                                                                onClick={
                                                                                    closeMenu
                                                                                }
                                                                            >
                                                                                {
                                                                                    sub.name
                                                                                }
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    ) : (
                                                        ""
                                                    )}
                                                </li>
                                            ) : null;
                                        })}
                                    </div>
                                </ul>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
}
