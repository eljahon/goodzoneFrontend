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
            // const brands = categoryProducts.map(item => {
            //     return item.brand
            // }).filter((brands, index, self) =>
            //     index === self.findIndex((t) => (
            //         t.id === brands.id && t.name === brands.name && brands.active === true
            //     ))
            // )
            // setBrands(brands)
        }
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

    useEffect(() => {
        if (categoryProducts) {
            const sortedProductsByPrice = categoryProducts.sort(
                (a, b) => a.price.price - b.price.price
            );
            const prices = [
                +sortedProductsByPrice[0].price.price,
                +sortedProductsByPrice[sortedProductsByPrice.length - 1].price
                    .price,
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
        axios
            .get(
                `${process.env.PRODUCT_API_URL}?lang=${
                    i18n.language
                }&brand=${filterBrands.join(
                    ","
                )}&category=${categoryId}&limit=${productLimit}&${
                    filterPriceRange.length
                        ? `&price_from=${filterPriceRange[0]}&price_till=${filterPriceRange[1]}`
                        : ""
                }&sort=price|${selectDropdownFilter}`
            )
            .then((data) => {
                const { products } = data.data;
                setFilteredProducts(products);
                setLoading(false);
                console.log("products", products);
            })
            .catch((error) => {
                setLoading(false);
                console.error("error", error);
            });
        console.log("selectDropdownFilter", selectDropdownFilter);
    }, [filterBrands, filterPriceRange, selectDropdownFilter, productLimit]);

    return (
        <>
            <SEO
                title={
                    products.count > 0 ? categoryProducts[0].category.name : ""
                }
                description={
                    products.count > 0
                        ? categoryProducts[0].category.description
                        : ""
                }
                image={
                    products.count > 0 ? categoryProducts[0].category.image : ""
                }
            />
            <ProductList
                products={filteredProducts}
                brands={brands}
                loading={loading}
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
            foundCategory = category.children.find(
                (ctg) => ctg.slug === query.id
            );
            if (foundCategory) categoryId = foundCategory.id;
            if (!foundCategory) {
                category.children.forEach((childCategory) => {
                    if (childCategory.children) {
                        foundChildCategory = childCategory.children.find(
                            (item) => item.slug === query.id
                        );
                        if (foundChildCategory)
                            categoryId = foundChildCategory.id;
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
