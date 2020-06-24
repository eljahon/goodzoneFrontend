import SEO from "../components/seo";
import Header from "../components/header";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import CheckoutForm from "../components/checkout-form";
import CheckoutItems from "../components/checkout-items";

export default function Home() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    })
  return (
    <>
        <SEO title="Оформить заказ | Интернет магазин GOODZONE" />
        <Header />
        <div className="checkout_wrapper">
          <div className="checkout_container">
            <CheckoutForm data={data} />
            <CheckoutItems data={data} />
          </div>
        </div>
        <Footer />
    </>
  )
}
