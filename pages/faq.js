import SEO from "../components/seo";
import Footer from "../components/footer";
import Link from "next/link";
import { LazyImage } from "../components/lazy-image";
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";

export default function Faq() {
    return (
        <>
            <SEO />
            <div className="delivery_splash">
                <LazyImage src="images/faq.jpg" alt="Goodzone Questions" />
            </div>
            <section className="section_container">
                <article className="delivery_content">
                    <h1>
                        Ищете технику, но не хотите тратить время на изучение
                        сайта? <br /> Мы собрали инструкции по каждой стадии
                        оформления заказа на сайте «GOODZONE»
                    </h1>
                    <div className="content_block">
                        <h2>Регистрация и вход</h2>
                        <p>
                            Если вы впервые на сайте «GOODZONE.UZ», вы можете
                            зарегистрироваться и получить доступ к преимуществам
                            личного кабинета. Вам не придётся вводить свои
                            данные при каждом новом заказе — они будут
                            сохранены. Кроме того, в личном кабинете вы сможете
                            отслеживать статус заказа, копить и тратить Бонусные
                            баллы и просматривать историю заказов.
                        </p>
                        <p>
                            Если вы уже зарегистрированы, вам нужно войти в
                            учётную запись.
                        </p>
                    </div>
                    <div className="content_block">
                        <h3>
                            <Link href="/how-to-order">
                                <a>Как заказать товар</a>
                            </Link>
                        </h3>
                        <h3>Способы оплаты</h3>
                        <p>
                            Покупки можно оплатить при помощи наличного или
                            безналичного расчёта, в том числе пластиковыми
                            картами: онлайн (прямо на сайте) или при получении
                            товара.
                        </p>
                        <h3>
                            <Link href="/delivery">
                                <a>Доставка и самовывоз</a>
                            </Link>
                        </h3>
                        <h3>
                            <Link href="/payment-plan">
                                <a>Рассрочка</a>
                            </Link>
                        </h3>
                        <h3>
                            <Link href="/bonuses">
                                <a>Бонусы</a>
                            </Link>
                        </h3>
                        <h3>
                            <Link href="/exchange-return-repair">
                                <a>Обмен, возврат и ремонт</a>
                            </Link>
                        </h3>
                    </div>
                </article>
            </section>
            <Footer />
        </>
    );
}
export async function getServerSideProps({ req }) {
    const urls = [`${process.env.CATEGORY_API_URL}?lang=${req.i18n.language}`];

    const [categories] = await fetchMultipleUrls(urls);

    return {
        props: {
            categories,
        },
    };
}
