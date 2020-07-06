import SEO from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";
import Link from "next/link";

export default function HowToOrder({ categories }) {
    return (
        <>
            <SEO title="Goodzone" />
            <section className="section_container">
                <article className="delivery_content">
                    <h1>Как сделать покупку?</h1>
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
                            <Link href="/how-to-order">
                                <a>Доставка и самовывоз</a>
                            </Link>
                        </h3>
                        <h3>
                            <Link href="/how-to-order">
                                <a>Рассрочка</a>
                            </Link>
                        </h3>
                        <h3>
                            <Link href="/how-to-order">
                                <a>Бонусы</a>
                            </Link>
                        </h3>
                        <h3>
                            <Link href="/how-to-order">
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

// export async function getServerSideProps() {
//     const urls = [process.env.CATEGORY_API_URL];
//     const [{ categories }] = await fetchMultipleUrls(urls);

//     return {
//         props: {
//             categories,
//         },
//     };
// }
