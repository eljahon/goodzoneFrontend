import SEO from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer"
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";

export default function About({ categories }) {
    return (
        <>
            <SEO title="Goodzone" />
            <Header categories={categories} />
            <div className="delivery_splash">
                <div className="about_splash">
                    <img src="images/about_splash.jpg" alt="Goodzone О компании"/>
                </div>
                <div className="about_content">
                    <h2 className="title">Goodzone <br/> интернет магазин</h2>
                </div>
            </div>
            <section className="section_container">
                <article className="delivery_content">
                    <h1>О компании</h1>
                    <div className="content_block">
                        <p>Розничная сеть «GOODZONE» осуществляет свою деятельность с 2018 года. Основным видом деятельности компании является организация розничной торговли бытовой техники и электроники. На сегодняшний день сеть насчитывает 5 магазинов по всей Республике Узбекистан</p>
                        <p>Ритейлер предлагает своим покупателям несколько тысяч наименований аудио/видео и цифровой техники, мелкой и крупной бытовой техники, медиатоваров, а также аксессуаров. Магазины «GOODZONE» имеют единую специальную концепцию дизайна.</p>
                        <p>Помимо эффективного формата розничной торговли и ориентированной на покупателя концепции магазина, компания предлагает клиентам высококлассную сервисную поддержку. Эксперты отдела рассрочки помогут быстро заполнить анкету и получить одобрение сразу от нескольких банков-партнёров.</p>
                        <h3>Миссия компании</h3>
                        <p>Мы верим, что каждая компания должна иметь свою твёрдую жизненную позицию. Если мы берёмся за что-то, то вкладываем в это дело всю душу и стараемся сделать это так хорошо, как только можем!</p>
                        <h3>Мы работаем ради клиентов</h3>
                        <p>Мы отбираем товары достойных брендов, чтобы наш покупатель был всегда доволен выбором.</p>
                        <p>Нам важно, чтобы каждый наш клиент купил именно то, что ему нужно, и мы помогаем сделать правильный выбор.</p>
                        <p>Мы стараемся знать и понимать своего покупателя. Нам важны искренние и долгосрочные отношения.</p>
                        <p>Поэтому один из главных принципов «GOODZONE» – хороший выбор в хорошем месте.</p>
                    </div>
                </article>
            </section>
            <Footer />
        </>
    )
}

export async function getServerSideProps() {
    const urls = [process.env.CATEGORY_API_URL];
    const [{ categories }] = await fetchMultipleUrls(urls);

    return {
        props: {
            categories,
        },
    };
}
