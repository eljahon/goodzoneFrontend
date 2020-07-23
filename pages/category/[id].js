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
import { i18n } from '../../i18n'

export default function Category({ categoryProducts, categoryId, query }) {
    const dispatch = useDispatch();

    const [brands, setBrands] = useState([]);
    useEffect(() => {
        axios
                .get(process.env.BRAND_API_URL)
                .then((response) => {
                const {
                    data: { brands },
                } = response;
                setBrands(brands);
            })
            .catch((error) => console.error(error));
    }, []);

    const [filteredProducts, setFilteredProducts] = useState([]);

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
        axios
            .get(
                `${process.env.PRODUCT_API_URL}?lang=${i18n.language}&brand=${filterBrands.join(
                    ","
                )}&category=${categoryId}${
                    filterPriceRange.length
                        ? `&price_from=${filterPriceRange[0]}&price_till=${filterPriceRange[1]}`
                        : ""
                }&sort=price|${selectDropdownFilter}`
            )
            .then((data) => {
                const { products } = data.data;
                setFilteredProducts(products);
                console.log("products", products);
            })
            .catch((error) => console.error("error", error));
        console.log("selectDropdownFilter", selectDropdownFilter);
    }, [filterBrands, categoryId, filterPriceRange, selectDropdownFilter]);

    return (
        <>
            <SEO title="Интернет магазин GOODZONE" />
            <ProductList products={filteredProducts} brands={brands} />
            <CartPopup />
            <Footer />
        </>
    );
}

export async function getServerSideProps({ query, req }) {
    const urls = [process.env.CATEGORY_API_URL];

    const [{ categories }] = await fetchMultipleUrls(urls);

    let categoryId;
    categories.forEach((category) => {
        let foundCategory;
        if (category.children) {
            foundCategory = category.children.find(
                (ctg) => ctg.slug === query.id
            );
        }

        if (foundCategory) categoryId = foundCategory.id;
    });

    const [{ products: categoryProducts }] = await fetchMultipleUrls([
        `${process.env.PRODUCT_API_URL}?category=${categoryId}&lang=${req.i18n.language}`,
    ]);

    return {
        props: {
            categoryProducts,
            categories,
            categoryId,
            query,
        },
    };
}
