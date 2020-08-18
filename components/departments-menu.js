import React from "react";
import Link from "next/link";
import { FaTimes, FaArrowDown, FaArrowRight } from "react-icons/fa";
import { i18n } from "../i18n";
import { useRouter } from "next/router";

export default function DepartmentsMenu({ categories, closeMenu }) {
    const vw = window.innerWidth;

    const router = useRouter();
    const hasDynamicRouting = router.query.id;

    const handleClose = () => {
        if (vw <= 850) closeMenu()
    }

    return (
        <>
            <nav className="departments_menu">
                <div className="drawer_header">
                    <button className="btn btn_close" onClick={closeMenu}>
                        <span className="close_icon">
                            <FaTimes />
                        </span>
                    </button>
                    <Link href={i18n.language === "ru" ? "/" : "/uz"}>
                        <a onClick={() => closeMenu()}>
                            <img src={
                                hasDynamicRouting
                                    ? "../logo.svg"
                                    : "/logo.svg"
                            }
                                alt="Goodzone" />
                        </a>
                    </Link>
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
                                                        <a onClick={e => {
                                                            if (child.children) {
                                                                e.preventDefault()
                                                            } else {
                                                                handleClose()
                                                            }
                                                        }}>
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
                                                                            <a onClick={() => handleClose()}>
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
