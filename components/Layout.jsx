import React, { useState } from "react";
import Header from "./header";
import { useEffect } from "react";
import axios from "axios";
import { i18n } from '../i18n'

const Layout = ({ children }) => {
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        axios(`${process.env.CATEGORY_API_URL}?lang=${i18n.language}`).then((response) => {
            console.log("data :>> ", response);
            const {
                data: { categories },
            } = response;
            setCategories(categories);
        });
    }, [i18n.language]);
    
    console.log("categories :>> ", categories);

    return categories ? (
        <>
            <Header categories={categories} />
            {children}
        </>
    ) : null;
};

export default Layout;
