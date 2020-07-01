import React, { useState } from "react";
import { Row } from "react-bootstrap";
import ProductListItem from "./product-list-item";
import ProductListFilter from "./product-list-filter";
import { FaTh, FaBars, FaFilter } from "react-icons/fa";

export default function ProductList({ products, brands }) {
    const [view, setView] = useState("col");
    const [filterPopup, setFilterPopup] = useState(false);
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
                            <select name="sort" id="sort">
                                <option value="newness">
                                    Сортировка по новизне
                                </option>
                                <option value="ascending">
                                    Сортировка по цене: по возрастанию
                                </option>
                                <option value="descending">
                                    Сортировка по цене: по убыванию
                                </option>
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
