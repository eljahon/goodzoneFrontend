import SEO from "../../components/seo";
import Footer from "../../components/footer";

export default function Template() {
    return (
        <>
            <SEO />
            <section className="section_container">
                <article className="delivery_content">
                    <div className="img_wrapper">
                        <img src="../images/carousel_3.jpg" alt="Акция" />
                    </div>
                    <h2>Описание и условия акции</h2>
                    <p>Кухня со скидкой от Haier</p>
                    <p>Ищите новое решение для кухни? - Оно у нас есть!</p>
                    <p>Дарим скидку на встраиваемую технику: варочные панели и духовки!</p>
                    <p>✅ Доступна рассрочка без переплат на 3 месяца.</p>
                    <p>Подробности: ☎️ 71 207-03-07</p>
                    <p>Период акции с 01.06.2020 по 22.06.2020.</p>
                    <p>Только в г. Ташкент</p>
                    <p>➖➖➖➖</p>
                    <p>⚡️ Haier oshxona texnikasi uchun chegirmalar</p>
                    <p>Oshxona uchun yangilik izlayapsizmi? Bizda yechim bor!</p>
                    <p>O’rnashuvchi texnika, ya’ni pishirish panellari va duxovkalar uchun chegirmalar e’lin qilamiz!</p>
                    <p>✅ 3 oylik foizsiz to’lov ham mavjud!</p>
                    <p>Ba’tafsil: ☎️ 71 207-03-07</p>
                    <p>Aksiya muddati: 01.06.2020-22.06.2020</p>
                    <p>Faqat Toshkent sh.</p>
                    <div className="promo_status">
                        <div className="status">
                            <span className="title">Статус на данный момент</span>
                            <span className="desc">Завершилась</span>
                        </div>
                        <div className="status">
                            <span className="title">Период проведения</span>
                            <span className="desc">2020-06-01 - 2020-06-22</span>
                        </div>
                    </div>
                </article>
            </section>
            <Footer />
        </>
    );
}
