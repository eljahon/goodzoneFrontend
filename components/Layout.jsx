import React from "react";
import withYM from "next-ym";
import { Router } from "next/router";

const Layout = ({ children }) => {
    return <>{children}</>;
};

export default withYM("67755550", Router)(Layout);
