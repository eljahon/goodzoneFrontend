import React, { useState, memo, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useEffect } from "react";
import useDebounce from "../libs/hooks/useDebounce";
import axios from "axios";
import Link from "next/link";
import { numberToPrice } from "../libs/numberToPrice";
import { Spinner } from "react-bootstrap";
import { LazyImage } from "./lazy-image";
import { withTranslation } from "../i18n";
import { useRouter } from "next/router";
import { transliterate } from "../libs/transliterate";
import { Router } from "next/router";

const SearchBar = ({ t }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  const router = useRouter();

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsFetching(true);
        axios
          .get(
            `${process.env.PRODUCT_API_URL}?active=true&limit=3&search=${debouncedSearchTerm}`
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (debouncedSearchTerm) {
      localStorage.setItem("search", debouncedSearchTerm);
      router.push({
        pathname: "/search",
        query: { search: debouncedSearchTerm },
        shallow: true,
      });
      setProducts([]);
      document.getElementById("searchTerm").value = "";
    }
  };

  Router.events.on("routeChangeStart", (url) => {
    setSearchTerm("");
  });

  const wrapperRef = useRef(null);
  useOutsideCloseMenu(wrapperRef);

  function useOutsideCloseMenu(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setProducts([]);
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
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              className="search_box-input"
              placeholder={t("product-search")}
              id="searchTerm"
            />
            <button className="btn search_icon" type="submit">
              <span>
                <FaSearch />
              </span>
            </button>
          </form>
        </div>
      </div>
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
                    <li className="search_result" key={product.id}>
                      <Link
                        href="/product/[id]"
                        as={`/product/${product.slug}`}
                      >
                        <a className="product_card">
                          <div className="product_image">
                            <LazyImage src={product.image} alt={product.name} />
                          </div>
                          <div className="product_info">
                            <h3>{product.name}</h3>
                            <span className="price">
                              {numberToPrice(product.price.price)}
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
                  <a onClick={(e) => handleSubmit(e)}>
                    {t("view-all-products")}
                  </a>
                </Link>
              </div>
            </>
          )}
        </div>
      ) : null}
      {searchTerm.length && !products ? (
        <div className="search_results">
          <div className="msg">{t("products-not-found")}</div>
        </div>
      ) : null}
    </div>
  );
};

export default withTranslation("common")(memo(SearchBar));
