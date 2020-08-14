import React from "react";
import Link from "next/link";
import { FaTimes, FaArrowDown, FaArrowRight } from "react-icons/fa";
import { i18n } from "../i18n";

export default function DepartmentsMenu({ categories, closeMenu }) {
    return (
        <>
            {/* <button className="btn btn_close" onClick={closeMenu}>
                <span className="close_icon">
                    <FaTimes />
                </span>
            </button> */}
            <nav>
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
                                    <>
                                        <a onClick={(e) => e.preventDefault()}>
                                            {item.name}
                                        </a>
                                        {item.children && <FaArrowDown />}
                                    </>
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
                                                        <>
                                                            <a
                                                                onClick={
                                                                    child.children
                                                                        ? (e) =>
                                                                              e.preventDefault()
                                                                        : closeMenu
                                                                }
                                                            >
                                                                {child.name}
                                                            </a>
                                                            {child.children && (
                                                                <FaArrowRight />
                                                            )}
                                                        </>
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
                                                                            <a
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
