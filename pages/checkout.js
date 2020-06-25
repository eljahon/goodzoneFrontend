import SEO from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import CheckoutForm from "../components/checkout-form";
import CheckoutItems from "../components/checkout-items";

export default function Home({ products }) {
   return (
    <>
        <SEO title="Оформить заказ | Интернет магазин GOODZONE" />
        <Header />
        <div className="checkout_wrapper">
          <div className="checkout_container">
            <CheckoutForm data={products} />
            <CheckoutItems data={products} />
          </div>
        </div>
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
