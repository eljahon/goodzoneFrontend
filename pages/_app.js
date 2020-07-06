import "../styles/main.scss";

import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import { Router } from "next/router";
import "react-multi-carousel/lib/styles.css";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState);
    const persistor = persistStore(store);
    console.log("store", store.getState());
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    );
}
