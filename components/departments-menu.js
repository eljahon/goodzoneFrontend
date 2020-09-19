import React from "react";
import Link from "next/link";
import {
  FaTimes,
  FaArrowDown,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { i18n } from "../i18n";
import { useRouter } from "next/router";
import { withTranslation } from "../i18n";
import { useDispatch } from "react-redux";
import { clearFilters } from "../redux/actions/filterActions/filterActions";

function DepartmentsMenu({ categories, closeMenu, t }) {
  const vw = window.innerWidth;
  const dispatch = useDispatch();
  const router = useRouter();
  const hasDynamicRouting = router.query.id;

  const handleClose = () => {
    if (vw <= 850) closeMenu();
  };

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
              <img
                src={hasDynamicRouting ? "../logo.svg" : "/logo.svg"}
                alt="Goodzone"
              />
            </a>
          </Link>
        </div>
        <ul className="nav-list">
          <li>
            <Link href={i18n.language === "ru" ? "/promo" : "/uz/promo"}>
              <a>
                <button className="btn btn_promo">
                  <span>{t("promo")}</span>
                </button>
              </a>
            </Link>
          </li>
          {categories.map((item, i) => {
            return (
              <li key={item.id}>
                <Link
                  href={`${i18n.language === "ru" ? "" : "/uz"}/shop/[id]`}
                  as={`${i18n.language === "ru" ? "" : "/uz"}/shop/${
                    item.slug
                    }`}
                >
                  <a onClick={(e) => e.preventDefault()}>
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
                              i18n.language === "ru" ? "" : "/uz"
                              }/shop/[id]`}
                            as={`${i18n.language === "ru" ? "" : "/uz"}/shop/${
                              child.slug
                              }`}
                          >
                            <a
                              onClick={(e) => {
                                if (child.children) {
                                  e.preventDefault();
                                } else {
                                  handleClose();
                                  dispatch(clearFilters());
                                }
                              }}
                            >
                              {i >= categories.length - 2
                                ? child.children && <FaArrowLeft />
                                : ""}
                              <span>{child.name}</span>
                              {i < categories.length - 2
                                ? child.children && <FaArrowRight />
                                : ""}
                            </a>
                          </Link>
                          {child.children && (
                            <ul className="sub-menu">
                              {child.children.map((sub) => (
                                <li key={sub.id}>
                                  <Link
                                    href={`${
                                      i18n.language === "ru" ? "" : "/uz"
                                      }/shop/[id]`}
                                    as={`${
                                      i18n.language === "ru" ? "" : "/uz"
                                      }/shop/${sub.slug}`}
                                  >
                                    <a
                                      onClick={() => {
                                        handleClose();
                                        dispatch(clearFilters());
                                      }}
                                    >
                                      {sub.name}
                                    </a>
                                  </Link>
                                </li>
                              ))}
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

export default withTranslation("navigation")(DepartmentsMenu);
