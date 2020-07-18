import React, { useState } from "react";
import { Row, Breadcrumb } from "react-bootstrap";
import ProductListItem from "./product-list-item";
import ProductListFilter from "./product-list-filter";
import { FaTh, FaBars, FaFilter } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { selectDropdownChange } from "../redux/actions/filterActions/filterActions";
import { useRouter } from "next/router";
import { withTranslation } from '../i18n'

function ProductList({ products, brands, t }) {
    const router = useRouter();

    const dispatch = useDispatch();
    const [view, setView] = useState("col");
    const [filterPopup, setFilterPopup] = useState(false);

    console.log(products)
    const [selectDropdownOptions] = useState([
        {
            value: "newness",
            title: t('sort-by-newness'),
        },
        {
            value: "asc",
            title: t('sort-by-price-ascending'),
        },
        {
            value: "desc",
            title: t('sort-by-price-descending'),
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
                        {t('main')}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        {products?.length ? products[0].category.name : null}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="control_bar">
                    <h3>{products?.length ? products[0].category.name : null}</h3>
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
                            <span className="btn_text">{t('filter')}</span>
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

export default withTranslation('common')(ProductList)