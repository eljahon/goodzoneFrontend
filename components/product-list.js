import React, { useState } from "react";
import { Row, Breadcrumb } from "react-bootstrap";
import ProductListItem from "./product-list-item";
import ProductListFilter from "./product-list-filter";
import { FaTh, FaBars, FaFilter } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { selectDropdownChange } from "../redux/actions/filterActions/filterActions";
import { useRouter } from "next/router";

export default function ProductList({ products, brands }) {
    const router = useRouter();

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
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => router.push("/")}>
                        Главная
                    </Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => router.push("/")}>
                        Телевизоры, Hi-Fi, аудио
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        {products?.length ? products[0].category.name : null}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="control_bar">
                    <h3>
                        {products?.length ? products[0].category.name : null}
                    </h3>
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
                                <span className="btn_icon">
                                    <FaTh />
                                </span>
                            </button>
                            <button
                                className={`controls_icon ${
                                    view === "row" ? "active" : ""
                                }`}
                                onClick={() => setView("row")}
                            >
                                <span className="btn_icon">
                                    <FaBars />
                                </span>
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
