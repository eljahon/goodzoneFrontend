import SEO from "../components/seo";
import Header from "../components/header";
import HomeSplash from "../components/home-splash";
import ProductList from "../components/product-list";
import CartPopup from "../components/cart-popup";
import Footer from "../components/footer";

export default function Home({ products }) {
  return (
    <>
        <SEO title="Интернет магазин GOODZONE" />
        <Header />
        <HomeSplash />
        <ProductList data={products} />
        <CartPopup data={products} />
        <Footer />
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch(process.env.API_URL)
  const products = await res.json()
  return {
    props: {
      products,
    },
  }
}