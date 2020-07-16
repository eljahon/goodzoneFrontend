import "../styles/main.scss";

import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import { Router } from "next/router";
import "react-multi-carousel/lib/styles.css";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Layout from "../components/Layout";
import { appWithTranslation } from '../i18n'

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState);
    const persistor = persistStore(store);
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </PersistGate>
        </Provider>
    );
}

export default appWithTranslation(App)