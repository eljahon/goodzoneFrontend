import SEO from "../../components/seo";
import ProductList from "../../components/product-list";
import CartPopup from "../../components/cart-popup";
import Footer from "../../components/footer";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { getProductsFromAPI } from "../../redux/actions/productsActions/productsActions";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchMultipleUrls } from "../../libs/fetchMultipleUrls";
import {
  clearFilters,
  getPrices,
} from "../../redux/actions/filterActions/filterActions";
import { i18n } from "../../i18n";

export default function Category({ products, categoryId, query }) {
  const dispatch = useDispatch();
  const categoryProducts = products.products;

  const [loading, setLoading] = useState(false);
  const [productLimit, setProductLimit] = useState(20);
  const [brands, setBrands] = useState([]);
  const [productProperty, setProductProperty] = useState([]);

  useEffect(() => {
    if (categoryProducts) {
      axios
        .get(`${process.env.BRAND_API_URL}?category=${categoryId}`)
        .then((response) => {
          const {
            data: { brands },
          } = response;
          setBrands(brands);
        })
        .catch((error) => console.error(error));
    }
    axios
      .get(`${process.env.CATEGORY_API_URL}/${query.id}`)
      .then((response) => {
        setProductProperty(response.data.category.product_properties);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryProducts]);

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
        if (products.count > productLimit) {
          setProductLimit(productLimit + 20);
        }
      }
    }
  };

  const [filteredProducts, setFilteredProducts] = useState(null);

  const filterPriceRange = useSelector(
    (state) => state.filters.filterPriceRange
  ); // after filtering
  const filterBrands = useSelector(
    (state) => state.filters.brands,
    shallowEqual
  );
  const selectDropdownFilter = useSelector(
    (state) => state.filters.selectDropdownFilter,
    shallowEqual
  );
  const filterProperties = useSelector(
    (state) => state.filters.properties,
    shallowEqual
  );

  useEffect(() => {
    if (categoryProducts) {
      const sortedProductsByPrice = categoryProducts.sort(
        (a, b) => a.price.price - b.price.price
      );
      const prices = [
        +sortedProductsByPrice[0].price.price,
        +sortedProductsByPrice[sortedProductsByPrice.length - 1].price.price,
      ];

      dispatch(getPrices(prices));
    }
  }, [categoryProducts]);

  useEffect(() => {
    if (categoryProducts) {
      dispatch(getProductsFromAPI(categoryProducts));
    }
  }, [categoryProducts]);

  useEffect(() => {
    dispatch(clearFilters());
  }, [query]);

  useEffect(() => {
    setLoading(true);
    const filterData = {
      active: true,
      brand: filterBrands.join(","),
      category: categoryId,
      inactive: true,
      lang: i18n.language,
      limit: productLimit.toString(),
      page: "1",
      price_from: filterPriceRange.length ? filterPriceRange[0] : "0",
      price_till: filterPriceRange.length ? filterPriceRange[1] : "0",
      properties: filterProperties,
      search: "",
      sort: selectDropdownFilter ? `price|${selectDropdownFilter}` : "",
    };
    console.log(filterData);
    axios.defaults.withCredentials = true;
    axios
      .post(`${process.env.PRODUCT_FILTER_API_URL}`, filterData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Request-Headers": "*",
          "Access-Control-Allow-Headers": "Origin, Content-Type",
          "Access-Control-Request-Method": "POST",
          "Access-Control-Allow-Headers": "x-auth-token, x-requested-with",
        },
        proxy: {
          host: "http://localhost",
          port: 3000,
        },
      })
      .then((data) => {
        const { products } = data.data;
        setFilteredProducts(products);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("error", error);
      });
  }, [
    filterBrands,
    filterPriceRange,
    selectDropdownFilter,
    productLimit,
    filterProperties,
  ]);

  return (
    <>
      <SEO
        title={products.count > 0 ? categoryProducts[0].category.name : ""}
        description={
          products.count > 0 ? categoryProducts[0].category.description : ""
        }
        image={products.count > 0 ? categoryProducts[0].category.image : ""}
      />
      <ProductList
        products={filteredProducts}
        brands={brands}
        loading={loading}
        productProperty={productProperty}
      />
      <CartPopup />
      <Footer />
    </>
  );
}

export async function getServerSideProps({ query, req }) {
  const urls = [process.env.CATEGORY_API_URL];

  const [{ categories }] = await fetchMultipleUrls(urls);

  let categoryId = null;
  let foundChildCategory = null;
  categories.forEach((category) => {
    let foundCategory;
    if (category.children) {
      foundCategory = category.children.find((ctg) => ctg.slug === query.id);
      if (foundCategory) categoryId = foundCategory.id;
      if (!foundCategory) {
        category.children.forEach((childCategory) => {
          if (childCategory.children) {
            foundChildCategory = childCategory.children.find(
              (item) => item.slug === query.id
            );
            if (foundChildCategory) categoryId = foundChildCategory.id;
          }
        });
      }
    }
  });
  console.log("categoryId :>> ", categoryId);
  const [products] = await fetchMultipleUrls([
    `${process.env.PRODUCT_API_URL}?category=${categoryId}&lang=${req.i18n.language}`,
  ]);

  return {
    props: {
      products,
      categories,
      categoryId,
      query,
    },
  };
}
