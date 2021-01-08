import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaSignInAlt } from "react-icons/fa";
import DepartmentsMenu from "./departments-menu";
import SearchModal from "./search-modal";
import LoginModal from "./login-modal";
import RegisterModal from "./register-modal";
import ProfileMenu from "./profile-menu";
import { useSelector, shallowEqual } from "react-redux";
import SearchBar from "./search-bar";
import { useRouter } from "next/router";
import TopBar from "./top-bar";
import Headroom from "react-headroom";
import { Link, withTranslation } from "../i18n";
import BottomBar from "./bottom-bar";
import IconUser from "./icons/IconUser";
import IconMenu from "./icons/IconMenu";

function Header({ categories, t }) {
  const vw = typeof window !== "undefined" ? window.innerWidth : 0;

  const [menu, setMenu] = useState(false);
  const [searchPopup, setSearchPopup] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  const [profilePopup, setProfilePopup] = useState(false);

  useEffect(() => {
    vw <= 850 ? setMenu(false) : setMenu(true);
  }, []);

  const switchPopup = () => {
    setLoginPopup(!loginPopup);
    setRegisterPopup(!registerPopup);
  };

  const user = useSelector((state) => state.auth.user, shallowEqual);

  const router = useRouter();
  const hasDynamicRouting = router.query.id;

  const wrapperRef = useRef(null);
  useOutsideCloseMenu(wrapperRef);

  function useOutsideCloseMenu(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setProfilePopup(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <>
      <TopBar
        profilePopup={profilePopup}
        togglePopup={() => setProfilePopup(!profilePopup)}
        closeMenu={() => setProfilePopup(false)}
        openLoginMenu={() => setLoginPopup(true)}
        hasDynamicRouting={hasDynamicRouting}
      />
      <Headroom>
        <header>
          <div className="left_menu">
            <button
              className="btn hamburger_icon"
              onClick={() => setMenu(true)}
            >
              <IconMenu />
            </button>
            <Link href="/">
              <a className="logo">
                <img
                  src={hasDynamicRouting ? "../logo.svg" : "/logo.svg"}
                  alt="Goodzone"
                />
              </a>
            </Link>
          </div>
          <SearchBar />
          <div className="right_menu">
            {user ? (
              <div className="popover" ref={wrapperRef}>
                <div className="popover_handler">
                  <button
                    className="btn join_btn"
                    onClick={() => setProfilePopup(!profilePopup)}
                  >
                    <IconUser />
                    <span className="btn-text">{t("personal-area")}</span>
                  </button>
                  <Link href="/account">
                    <a className="btn join_btn mobile">
                      <IconUser />
                    </a>
                  </Link>
                </div>
                {profilePopup ? (
                  <ProfileMenu closeMenu={() => setProfilePopup(false)} />
                ) : (
                  ""
                )}
              </div>
            ) : (
              <button
                className="btn join_btn"
                onClick={() => setLoginPopup(true)}
              >
                <span className="join_icon">
                  <FaSignInAlt />
                </span>
                <span className="btn-text">{t("login")}</span>
              </button>
            )}
            <button
              className="btn search_btn mobile"
              onClick={() => setSearchPopup(true)}
            >
              <span className="search_icon">
                <FaSearch />
              </span>
            </button>
          </div>
        </header>
      </Headroom>

      <div className="base_header" />
      <BottomBar openLoginMenu={() => setLoginPopup(true)} />

      {
        <DepartmentsMenu
          categories={categories}
          closeMenu={() => setMenu(false)}
          menu={menu}
        />
      }

      {searchPopup ? (
        <SearchModal closeModal={() => setSearchPopup(false)} />
      ) : (
        ""
      )}
      {loginPopup ? (
        <LoginModal
          closeModal={() => setLoginPopup(false)}
          goRegister={() => switchPopup()}
        />
      ) : (
        ""
      )}
      {registerPopup ? (
        <RegisterModal
          closeModal={() => setRegisterPopup(false)}
          login={() => switchPopup()}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default withTranslation("common")(Header);
