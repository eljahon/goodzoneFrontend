import SEO from "../components/seo";
import HomeSplash from "../components/home-splash";
import CartPopup from "../components/cart-popup";
import Footer from "../components/footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Products from "../components/products";
import Banner from "../components/banner";
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";
import { getLocalStorage } from "../libs/localStorage";
import { axiosAuth } from "../libs/axios/axios-instances";
import { setUser } from "../redux/actions/authActions/authActions";
import { withTranslation } from "../i18n";
import BannerContainer from "../components/bannerContainer";

function Home({
  new_products,
  recommended_products,
  popular_products,
  t,
  banners,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (getLocalStorage("access_token")) {
      axiosAuth
        .get("/profile")
        .then(({ data: { customer: user } }) => dispatch(setUser(user)))
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <>
      <SEO />
      <HomeSplash banners={banners} />
      <Products title={t("new-arrivals")} data={new_products.products} />
      <BannerContainer>
        <Banner size={9} name="banner-po-seredine-1300x260" />
        <Banner size={3} name="malyi-nizhnii-banner-420x260" />
      </BannerContainer>
      <Products title={t("popular-items")} data={popular_products.products} />
      <BannerContainer>
        <Banner size={12} name="pervyi-banner-1720x260" />
      </BannerContainer>
      <Products
        title={t("the-best-selection-for-you")}
        data={recommended_products.products}
      />
      <CartPopup />
      <Footer />
    </>
  );
}

export default withTranslation("common")(Home);

export async function getServerSideProps({ req }) {
  const urls = [
    `${process.env.PRODUCT_API_URL}?active=true&lang=${req.i18n.language}`,
    `${process.env.PRODUCT_API_URL}?active=true&lang=${req.i18n.language}&popular=true`,
    `${process.env.PRODUCT_API_URL}?active=true&lang=${req.i18n.language}&recommended=true`,
    `${process.env.BANNER_API_URL}?position=website-home-slider&active=true`,
    `${process.env.CATEGORY_API_URL}?lang=${req.i18n.language}`,
  ];

  const [
    new_products,
    popular_products,
    recommended_products,
    banners,
    categories,
  ] = await fetchMultipleUrls(urls);

  return {
    props: {
      new_products,
      popular_products,
      recommended_products,
      banners,
      categories,
    },
  };
}
