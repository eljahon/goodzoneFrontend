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
import AreaModal from "./area-modal";
import { compareItemsTotalQuantitySelector } from "../redux/selectors/cartSelectors";

function Header({ categories, t }) {
  const vw = typeof window !== "undefined" ? window.innerWidth : 0;

  const [menu, setMenu] = useState(false);
  const [searchPopup, setSearchPopup] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  const [profilePopup, setProfilePopup] = useState(false);
  const [area, isArea] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [regions, setRegion] = useState("");
  const [compareCategories, setCompareCategories] = useState([]);
  useEffect(() => {
    vw <= 850 ? setMenu(false) : setMenu(true);
  }, []);

  const switchPopup = () => {
    setLoginPopup(!loginPopup);
    setRegisterPopup(!registerPopup);
  };

  const compareItems = useSelector(
    (state) => state.compare.compareItems,
    shallowEqual
  );

  useEffect(() => {
    const region = localStorage.getItem("region");

    if (region !== "null") {
      if (user && user.area) {
        localStorage.setItem("region", user.area);
      }
    } else {
      localStorage.setItem("region", t("area-tashkent"));
    }
  }, []);

  useEffect(() => {
    let categories = new Map();
    compareItems.map((value) => {
      if (!categories.has(value.category.id)) {
        categories.set(value.category.id, {
          id: value.category.id,
          name: value.category.name,
        });
      }
    });
    setCompareCategories(Array.from(categories.values()));
  }, [compareItems]);

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
        regions={regions}
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
          <button className="btn scale_icon">
            <img src="../scale_icon.svg" alt="icon" />
            <span className="scale_num">{compareItems.length}</span>
            {compareCategories.length ? (
              <div className="dropdown-compare">
                {compareCategories.map((item) => (
                  <Link href={`/compare?categoryId=${item.id}`}>
                    <a>{item.name}</a>
                  </Link>
                ))}
              </div>
            ) : (
              ""
            )}
          </button>
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

      {menu ? (
        <DepartmentsMenu
          categories={categories}
          closeMenu={() => setMenu(false)}
          menu={menu}
        />
      ) : (
        ""
      )}

      {searchPopup ? (
        <SearchModal closeModal={() => setSearchPopup(false)} />
      ) : (
        ""
      )}
      {loginPopup ? (
        <LoginModal
          closeModal={() => setLoginPopup(false)}
          goRegister={() => switchPopup()}
          isArea={isArea}
          setCustomer={setCustomer}
        />
      ) : (
        ""
      )}
      {registerPopup ? (
        <RegisterModal
          closeModal={() => setRegisterPopup(false)}
          login={() => switchPopup()}
          isArea={isArea}
          setCustomer={setCustomer}
        />
      ) : (
        ""
      )}
      {area ? (
        <AreaModal customer={customer} setRegion={setRegion} isArea={isArea} />
      ) : (
        ""
      )}
    </>
  );
}

export default withTranslation("common")(Header);
