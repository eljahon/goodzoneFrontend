import SEO from "../components/seo";
import Footer from "../components/footer"
import Link from 'next/link'

export default function Bonuses() {
    return (
        <>
            <SEO title="Goodzone" />
            <div className="delivery_splash">
                <img src="images/bonus_1.png" alt="Goodzone бонусы" />
            </div>
            <section className="section_container">
                <article className="delivery_content">
                    <h1>Бонусы</h1>
                    <div className="content_block">
                        <h2>Теперь совершив любую покупку в наших магазинах, вы становитесь владельцем - карты лояльности GOODCARD!</h2>
                        <div className="img_wrapper">
                            <img src="/images/bonus_2.jpg" alt="Goodzone bonuses" />
                        </div>
                        <p>*Cash back (кэшбек) - возврат части уплаченной суммы, зачисляется в Бонусных баллах на Бонусный счёт. Один Бонусный балл равен одному сум Руз.</p>
                        <p>**Включает гарантированный cash back 2% и cash back по персональным предложениям и не превышает 25% от стоимости покупки.</p>
                        <Link href="/goodcart-bonus">
                            <a className="payment_plan-link">Правила программы лояльности GOODCARD</a>
                        </Link>
                    </div>
                </article>
            </section>
            <Footer />
        </>
    )
}
