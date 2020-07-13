import React, { useState, memo, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useEffect } from "react";
import useDebounce from "../libs/hooks/useDebounce";
import axios from "axios";
import Link from "next/link";
import { numberToPrice } from "../libs/numberToPrice";
import { Spinner } from "react-bootstrap";
import { LazyImage } from "./lazy-image";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(
        () => {
            if (debouncedSearchTerm) {
                setIsFetching(true);
                axios
                    .get(
                        `${process.env.PRODUCT_API_URL}?limit=3&search=${debouncedSearchTerm}`
                    )
                    .then((data) => {
                        const {
                            data: { products },
                        } = data;
                        setProducts(products);
                    })
                    .catch((error) => console.error(error))
                    .finally(() => setIsFetching(false));
            } else {
                setProducts([]);
            }
        },
        [debouncedSearchTerm] // Only call effect if debounced search term changes
    );

    const wrapperRef = useRef(null);
    useOutsideCloseMenu(wrapperRef);

    function useOutsideCloseMenu(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setSearchTerm("");
                    setProducts([]);
                    document.getElementById("searchTerm").value = "";
                }
            }
            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };

        }, [ref]);
    }

    return (
        <div className="search_box" ref={wrapperRef}>
            <div className="search_box-wrapper">
                <div className="search_input-wrapper">
                    <form>
                        <span className="search_icon">
                            <FaSearch />
                        </span>
                        <input
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="text"
                            className="search_box-input"
                            placeholder="Поиск по товарам"
                            id="searchTerm"
                        />
                    </form>
                </div>
            </div>
            {console.log("searchTerm :>> ", searchTerm)}
            {products?.length ? (
                <div className="search_results">
                    {isFetching ? (
                        <div className="spinner">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <>
                            <ul className="results_list">
                                {products.map((product) => {
                                    return (
                                        <li
                                            className="search_result"
                                            key={product.id}
                                        >
                                            <Link
                                                href="/product/[id]"
                                                as={`/product/${product.slug}`}
                                            >
                                                <a className="product_card">
                                                    <div className="product_image">
                                                        <LazyImage
                                                            src={product.image}
                                                            alt={product.name}
                                                        />
                                                    </div>
                                                    <div className="product_info">
                                                        <h3>{product.name}</h3>
                                                        <span className="price">
                                                            {numberToPrice(
                                                                product.price
                                                                    .price
                                                            )}
                                                        </span>
                                                    </div>
                                                </a>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="product_meta">
                                <Link href="/">
                                    <a>Посмотреть все товары</a>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            ) : null}
            {searchTerm.length && !products ? (
                <div className="search_results">
                    {/* <h4>ТОВАРЫ</h4> */}
                    <div className="msg">Товары не найдены</div>
                </div>
            ) : null}
        </div>
    );
};

export default memo(SearchBar);
