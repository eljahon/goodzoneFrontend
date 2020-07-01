import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaTimes } from "react-icons/fa";

export default function DepartmentsMenu({ categories, closeMenu, logo }) {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
        document.body.classList.add("overflow");
        return () => document.body.classList.remove("overflow");
    });
    return (
        <div className={`popover_content ${loaded ? "show" : ""}`}>
            <div className="drawer_header">
                <Link href="/">
                    <a>
                        <img
                            src={logo ? "../logo.png" : "logo.png"}
                            alt="Goodzone"
                        />
                    </a>
                </Link>
                <button className="btn btn_close" onClick={closeMenu}>
                    <span className="close_icon">
                        <FaTimes />
                    </span>
                </button>
            </div>
            <ul className="inner_wrap">
                {categories.map((item) => (
                    <li key={item.id} className="menu_item">
                        <Link
                            href="/category/[id]"
                            as={`/category/${item.slug}`}
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
                        <ul className="dropdown_menu">
                            <li>
                                <div className="content">
                                    {item.children
                                        ? item.children.map((child) => (
                                              <Link
                                                  key={child.id}
                                                  href="/category/[id]"
                                                  as={`/category/${child.slug}`}
                                              >
                                                  <a>{child.name}</a>
                                              </Link>
                                          ))
                                        : ""}
                                </div>
                            </li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
