import React, { useState } from "react";
import Header from "./header";
import { useEffect } from "react";
import axios from "axios";
import { i18n } from "../i18n";
import withYM from "next-ym";
import { Router } from 'next/router'

const Layout = ({ children }) => {
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        axios(`${process.env.CATEGORY_API_URL}?lang=${i18n.language}`)
            .then((response) => {
                const {
                    data: { categories },
                } = response;
                setCategories(categories);
            })
            .catch((err) => console.error(err));
    }, [i18n.language]);


    return (
        <>
            {categories && <Header categories={categories} />}
            {children}
        </>
    )
};

export default withYM("67755550", Router)(Layout);
