import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { toggleBrand } from "../redux/actions/brandActions/brandActions";
import RangeSlider from "./react-slider";
import { FaTimes } from "react-icons/fa";

export default function ProductListFilter({ brands, isOpenPopup, closePopup }) {
    const dispatch = useDispatch();

    const filterBrands = useSelector((state) => state.brands, shallowEqual);

    const handleScroll = () => {
        if (
            (document.body.scrollTop > 25 &&
                document.body.scrollTop < document.body.clientHeight - 800) ||
            (document.documentElement.scrollTop > 25 &&
                document.documentElement.scrollTop <
                    document.body.clientHeight - 800)
        ) {
            document.getElementById("sidebar").classList.add("sticky");
        } else {
            document.getElementById("sidebar").classList.remove("sticky");
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    const handleToggle = (id) => {
        dispatch(toggleBrand(id));
    };

    return (
        <aside className={`sidebar ${isOpenPopup ? "show" : ""}`} id="sidebar">
            <div className="category_wrapper">
                <div className="sidebar_wrapper">
                    <div className="outer_wrapper">
                        <div className="inner_wrapper">
                            <button
                                className="btn close_filter"
                                onClick={closePopup}
                            >
                                <FaTimes />
                            </button>
                            <form>
                                <h3>Фильтр</h3>
                                <div className="filter_group">
                                    <h5>Фильтрация по цене</h5>
                                    <RangeSlider />
                                </div>
                                <div className="filter_group">
                                    <h5>Бренды</h5>
                                    {brands
                                        ? brands.map((brand) => (
                                              <div
                                                  key={brand.id}
                                                  className="check_box"
                                              >
                                                  <input
                                                      onChange={() =>
                                                          handleToggle(brand.id)
                                                      }
                                                      type="checkbox"
                                                      name={brand.name}
                                                      id={brand.name}
                                                      checked={filterBrands.includes(
                                                          brand.id
                                                      )}
                                                  />
                                                  <label htmlFor={brand.name}>
                                                      {brand.name}
                                                  </label>
                                              </div>
                                          ))
                                        : null}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
