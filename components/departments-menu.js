import React from "react";
import Link from "next/link";
import { FaTimes, FaArrowDown, FaArrowRight } from "react-icons/fa";
import { i18n } from "../i18n";

export default function DepartmentsMenu({ categories, closeMenu }) {
    return (
        <>
            <nav className="departments_menu">
                <div className="drawer_header">
                    <Link href={i18n.language === "ru" ? "/" : "/uz"}>
                        <a>
                            <img src="./logo.svg" alt="Goodzone"/>
                        </a>
                    </Link>
                    <button className="btn btn_close" onClick={closeMenu}>
                        <span className="close_icon">
                            <FaTimes />
                        </span>
                    </button>
                </div>
                <ul className="nav-list">
                    {categories.map((item) => {
                        return (
                            <li key={item.id}>
                                <Link
                                    href={`${
                                        i18n.language === "ru" ? "" : "/uz"
                                        }/shop/[id]`}
                                    as={`${
                                        i18n.language === "ru" ? "" : "/uz"
                                        }/shop/${item.slug}`}
                                >
                                    <a onClick={e => e.preventDefault()}>
                                        <span>{item.name}</span>
                                        <FaArrowRight />
                                    </a>
                                </Link>
                                {item.children && (
                                    <ul className="sub-menu">
                                        {item.children.map((child) => {
                                            return (
                                                <li key={child.id}>
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
                                                        <a onClick={e => child.children ? e.preventDefault() : console.log(e)}>
                                                            <span>{child.name}</span>
                                                            {child.children && (
                                                                <FaArrowRight />
                                                            )}
                                                        </a>
                                                    </Link>
                                                    {child.children && (
                                                        <ul className="sub-menu">
                                                            {child.children.map(
                                                                (sub) => (
                                                                    <li
                                                                        key={
                                                                            sub.id
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
                                                                            <a>
                                                                                {
                                                                                    sub.name
                                                                                }
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}
