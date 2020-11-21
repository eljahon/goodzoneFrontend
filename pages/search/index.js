import SEO from "../../components/seo";
import ProductList from "../../components/product-list";
import CartPopup from "../../components/cart-popup";
import Footer from "../../components/footer";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchMultipleUrls } from "../../libs/fetchMultipleUrls";
import {
  clearFilters,
  getPrices,
} from "../../redux/actions/filterActions/filterActions";
import { i18n } from "../../i18n";

export default function Search({ searchResult, searchTerm, query }) {
  console.log("searchResult", searchResult);
  console.log("searchTerm", searchTerm);
  const dispatch = useDispatch();
  const products = searchResult.products;
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(true);
  const [productLimit, setProductLimit] = useState(20);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const selectDropdownFilter = useSelector(
    (state) => state.filters.selectDropdownFilter,
    shallowEqual
  );

  useEffect(() => {
    if (products) {
      const sortedProductsByPrice = products.sort(
        (a, b) => a.price.price - b.price.price
      );
      const prices = [
        +sortedProductsByPrice[0].price.price,
        +sortedProductsByPrice[sortedProductsByPrice.length - 1].price.price,
      ];

      dispatch(getPrices(prices));
    }
  }, [products]);

  useEffect(() => {
    dispatch(clearFilters());
  }, [query]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    const lastProductLoaded = document.querySelector(
      ".products_row > .products_col:last-child"
    );

    if (lastProductLoaded) {
      const lastProductLoadedOffset =
        lastProductLoaded.offsetTop + lastProductLoaded.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;

      if (pageOffset > lastProductLoadedOffset) {
        if (searchResult.count > productLimit) {
          setProductLimit(productLimit + 20);
        }
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.PRODUCT_API_URL}?active=true&lang=${i18n.language}&search=${searchTerm}&sort=price|${selectDropdownFilter}&limit=${productLimit}`
      )
      .then((data) => {
        const { products } = data.data;
        setFilteredProducts(products);
        setLoading(false);
      })
      .catch((error) => console.error("error", error));
  }, [searchTerm, selectDropdownFilter, productLimit]);

  return (
    <>
      <SEO />
      <ProductList
        search={search}
        products={filteredProducts}
        searchResult={searchTerm}
        loading={loading}
      />
      <CartPopup />
      <Footer />
    </>
  );
}

export async function getServerSideProps({ query, req }) {
  const searchTerm = encodeURI(query.search);
  const urls = [
    `${process.env.PRODUCT_API_URL}?active=true&search=${searchTerm}&lang=${req.i18n.language}`,
    `${process.env.CATEGORY_API_URL}?lang=${req.i18n.language}`,
  ];

  const [searchResult, categories] = await fetchMultipleUrls(urls);

  return {
    props: {
      searchResult,
      searchTerm,
      query,
      categories,
    },
  };
}
