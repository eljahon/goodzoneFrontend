import React, { memo, useState, useRef, useEffect } from "react";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { useRouter, Router } from "next/router";
import { transliterate } from "../libs/transliterate";
import { withTranslation } from "../i18n";
import useDebounce from "../libs/hooks/useDebounce";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { LazyImage } from "./lazy-image";
import Link from "next/link";
import { numberToPrice } from "../libs/numberToPrice";

function SearchModal({ closeModal, t }) {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (debouncedSearchTerm) {
      router.push(`/search/${transliterate(debouncedSearchTerm)}`);
      setProducts([]);
      document.getElementById("searchTerm").value = "";
    }
  };

  Router.events.on("routeChangeStart", (url) => {
    closeModal();
  });

  const wrapperRef = useRef(null);
  useOutsideCloseMenu(wrapperRef);

  function useOutsideCloseMenu(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          closeModal();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div className="search_modal-wrapper">
      <div className="search_modal-holder">
        <div className="inner_block">
          <div className="search" ref={wrapperRef}>
            <div className="search_modal">
              <button className="btn close_btn" onClick={closeModal}>
                <FaArrowLeft />
              </button>
              <form className="search_form" onSubmit={(e) => handleSubmit(e)}>
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  name="search"
                  id="search"
                  placeholder={t("product-search")}
                />
                <button type="submit" className="btn btn_search">
                  <FaSearch />
                </button>
              </form>
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
                                  <LazyImage
                                    src={product.image}
                                    alt={product.name}
                                  />
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
        </div>
      </div>
    </div>
  );
}

export default withTranslation("common")(memo(SearchModal));
