import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useEffect } from "react";
import useDebounce from "../libs/hooks/useDebounce";
import axios from "axios";

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

    return (
        <div className="search_box">
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
                        />
                    </form>
                </div>
            </div>
            {console.log("searchTerm :>> ", searchTerm)}
            {products?.length ? (
                <div className="search_results">
                    {isFetching ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <h4>ТОВАРЫ</h4>
                            <ul className="results_list">
                                {products.map((product) => {
                                    return (
                                        <li
                                            className="search_result"
                                            key={product.id}
                                        >
                                            {product.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    )}
                </div>
            ) : null}
            {searchTerm.length && !products ? (
                <div className="search_results">
                    <h4>ТОВАРЫ</h4>
                    <p>No Prodcuts</p>
                </div>
            ) : null}
        </div>
    );
};

export default SearchBar;
