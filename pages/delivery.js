import SEO from "../components/seo";
import Footer from "../components/footer";

export default function Delivery() {
    return (
        <>
            <SEO title="Goodzone" />
            <div className="delivery_splash">
                <img src="images/delivery_splash.jpg" alt="Goodzone delivery" />
            </div>
            <section className="section_container">
                <article className="delivery_content">
                    <h1>Доставка</h1>
                    <p className="subtitle">
                        Интернет магазин GOODZONE.UZ производит бесплатную
                        доставку товаров по городу Ташкент. Доставка
                        производится в течение 48 часов с момента подтверждения
                        заказа покупателем.
                    </p>
                    <div className="content_block">
                        <h2>Ташкент</h2>
                        <p>
                            Доставка в течение 48 рабочих часов в черте города
                            Ташкент
                        </p>
                        <p>
                            Доставка мелкой бытовой техники и электроники
                            стоимостью более 500 000 сум – Бесплатно
                        </p>
                        <p>
                            Доставка мелкой бытовой техники и электроники
                            стоимостью менее 500 000 сум – 20 000 сум
                        </p>
                        <p>Доставка крупной бытовой техники – Бесплатно</p>
                        <p>
                            Доставка аксессуаров (чехлы, наушники, клавиатуры,
                            мышки и т.д.) – 20 000 сум
                        </p>
                        <h3>Внимание!</h3>
                        <p>
                            Доставка крупной бытовой техники, участвующей в
                            акциях и продающейся со скидкой – 40 000 сум
                        </p>
                        <p>
                            Доставка смартфонов, телевизоров диагональю до 32
                            дюймов, аксессуаров и мелкой бытовой техники,
                            участвующих в акциях и продающихся со скидкой – 20
                            000 сум
                        </p>
                    </div>
                    <div className="content_block">
                        <h2>Ташкентская область</h2>
                        <p>
                            Доставка в течение 48 рабочих часов в радиусе до 15
                            км вокруг города Ташкент
                        </p>
                        <p>
                            Стоимость доставки всех категорий товаров – 75 000
                            сум
                        </p>
                        <p>
                            Доставка всех категорий товаров на расстояние свыше
                            15 км, оплачивается по схеме 75 000 сум + 3 000 сум
                            за каждый дополнительный километр пути.
                        </p>
                        <p>
                            Максимальная дистанция работы службы доставки
                            интернет-магазина GOODZONE.UZ до 20 км от черты
                            города Ташкент.
                        </p>
                        <p>
                            Доставка товаров на дистанцию свыше 20 км
                            осуществляется курьерской службой доставки BTS
                            Express. Стоимость доставки высчитывается
                            индивидуально исходя из габаритов груза и дистанции.
                        </p>
                        <h3>Заказали товар после 16:00?</h3>
                        <p>
                            Заказы, поступающие позже 16:00, доставляются не
                            раньше чем на следующий день в порядке очереди.
                        </p>
                        <h3>Срочность доставки</h3>
                        <p>
                            Ускоренная доставка осуществляется в течение 4 часов
                            с момента подтверждения заказа.
                        </p>
                        <p>
                            Стоимость ускоренной доставки в черте города Ташкент
                            – 20 000 сум за мелко бытовую технику и 40 000 сум
                            за крупно бытовую технику.
                        </p>
                        <p>
                            Бесплатная доставка осуществляется только в черте
                            города Ташкент.
                        </p>
                        <p>Подъем крупной бытовой техники</p>
                        <p>
                            Подъем крупной бытовой техники выше второго этажа
                            осуществляется за дополнительную плату.
                        </p>
                        <p>
                            Подъем крупной бытовой техники более 50 кг - 10 000
                            сум за 1 этаж
                        </p>
                        <h3>
                            Получить более подробную информацию можно, позвонив
                            по номеру call-центра интернет-магазина <br />{" "}
                            GOODZONE.UZ: +998 71 207 03 07.
                        </h3>
                    </div>
                    <div className="content_block">
                        <h2>Регионы</h2>
                        <p>
                            Доставка товаров по регионам в интернет-магазине
                            GOODZONE.UZ осуществляется сервисом BTS Express.
                            Курьер доставит заказ в течение 48 рабочих часов.
                        </p>
                        <p>
                            Получить товар в своем регионе покупатель может в
                            местном отделении компании BTS Express в рабочие дни
                            с 9:00 до 18:00.
                        </p>
                        <p>
                            Стоимость доставки в регионы высчитывается
                            индивидуально по тарифным планам BTS Express.
                        </p>
                    </div>
                </article>
            </section>
            <Footer />
        </>
    );
}
