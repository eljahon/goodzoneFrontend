import React, { useState } from "react";
import { Row } from "react-bootstrap";
import ProductListItem from "./product-list-item";
import ProductListFilter from "./product-list-filter";
import { FaTh, FaBars, FaFilter } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { selectDropdownChange } from "../redux/actions/filterActions/filterActions";

export default function ProductList({ products, brands }) {
    const dispatch = useDispatch();
    const [view, setView] = useState("col");
    const [filterPopup, setFilterPopup] = useState(false);

    const [selectDropdownOptions] = useState([
        {
            value: "newness",
            title: "Сортировка по новизне",
        },
        {
            value: "asc",
            title: "Сортировка по цене: по возрастанию",
        },
        {
            value: "desc",
            title: "Сортировка по цене: по убыванию",
        },
    ]);

    const handleSelectDropdownChange = (value) => {
        dispatch(selectDropdownChange(value));
    };

    return (
        <main>
            <ProductListFilter
                brands={brands}
                isOpenPopup={filterPopup}
                closePopup={() => setFilterPopup(false)}
            />
            <div className="content">
                <div className="control_bar">
                    <h3>Магазин</h3>
                    <div className="controls">
                        <span className="sort_by">
                            <select
                                name="sort"
                                id="sort"
                                onChange={(e) => {
                                    handleSelectDropdownChange(e.target.value);
                                }}
                            >
                                {selectDropdownOptions.map((option) => {
                                    const { value, title } = option;
                                    return (
                                        <option key={value} value={value}>
                                            {title}
                                        </option>
                                    );
                                })}
                            </select>
                        </span>
                        <button
                            className="btn btn_filter"
                            onClick={() => setFilterPopup(true)}
                        >
                            <span className="filter_icon">
                                <FaFilter />
                            </span>
                            <span className="btn_text">Фильтр</span>
                        </button>
                        <div>
                            <button
                                className={`controls_icon ${
                                    view === "col" ? "active" : ""
                                }`}
                                onClick={() => setView("col")}
                            >
                                <FaTh />
                            </button>
                            <button
                                className={`controls_icon ${
                                    view === "row" ? "active" : ""
                                }`}
                                onClick={() => setView("row")}
                            >
                                <FaBars />
                            </button>
                        </div>
                    </div>
                </div>
                <Row className="products_row">
                    {products
                        ? products.map((product) => {
                              return (
                                  <ProductListItem
                                      key={product.id}
                                      product={product}
                                      view={view}
                                  />
                              );
                          })
                        : "No products"}
                </Row>
            </div>
        </main>
    );
}
