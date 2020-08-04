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

export default function Search({ products, searchTerm, query }) {
    const dispatch = useDispatch();

    const [brands, setBrands] = useState([]);
    useEffect(() => {
        // axios
        //         .get(process.env.BRAND_API_URL)
        //         .then((response) => {
        //         const {
        //             data: { brands },
        //         } = response;
        //         setBrands(brands);
        //     })
        //     .catch((error) => console.error(error));

        const brands = products.map(item => {
            return item.brand
        }).filter((brands, index, self) =>
            index === self.findIndex((t) => (
                t.id === brands.id && t.name === brands.name
            ))
        )
        setBrands(brands)
    }, [products]);

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
        if (products) {
            const sortedProductsByPrice = products.sort(
                (a, b) => a.price.price - b.price.price
            );
            const prices = [
                +sortedProductsByPrice[0].price.price,
                +sortedProductsByPrice[sortedProductsByPrice.length - 1].price
                    .price,
            ];

            dispatch(getPrices(prices));
        }
    }, [products]);

    useEffect(() => {
        if (products) {
            dispatch(getProductsFromAPI(products));
        }
    }, [products]);

    useEffect(() => {
        dispatch(clearFilters());
    }, [query]);

    useEffect(() => {
        axios
            .get(
                `${process.env.PRODUCT_API_URL}?lang=${i18n.language}&brand=${filterBrands.join(
                    ","
                )}&search=${searchTerm}${
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
    }, [filterBrands, searchTerm, filterPriceRange, selectDropdownFilter]);

    return (
        <>
            <SEO />
            <ProductList products={filteredProducts} brands={brands} searchResult={searchTerm} />
            <CartPopup />
            <Footer />
        </>
    );
}

export async function getServerSideProps({ query, req }) {
    const searchTerm = query.id
    const urls = [`${process.env.PRODUCT_API_URL}?search=${searchTerm}&lang=${req.i18n.language}`];

    const [{ products }] = await fetchMultipleUrls(urls);

    return {
        props: {
            products,
            searchTerm,
            query
        },
    };
}
