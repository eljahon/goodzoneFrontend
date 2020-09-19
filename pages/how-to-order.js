import SEO from "../components/seo";
import Footer from "../components/footer";

export default function HowToOrder() {
    return (
        <>
            <SEO />
            <section className="section_container">
                <article className="delivery_content">
                    <h1>Как сделать покупку?</h1>
                    <div className="content_block">
                        <h2>1. Пошаговая инструкция <br/> Выбор товара</h2>
                        <div className="img_wrapper">
                            <img src="images/order_1.jpg" alt="Как заказать"/>
                        </div>        
                        <p>Выбрать товар в нашем интернет магазине вы можете несколькими способами: поиск по сайту, выбор в каталоге, а также воспользовавшись всевозможными фильтрами.</p>
                        <p>Для того чтобы оформить заказ в интернет магазине, зайдите на страницу товара и нажмите кнопку «В корзину».</p>
                        <h2>2. Корзина</h2>
                        <div className="img_wrapper">
                            <img src="images/order_2.png" alt="Как заказать"/>
                        </div>
                        <p>Для оформления заказа необходимо нажать на кнопку с изображением корзины в правом верхнем углу интернет магазина. Зайдя в корзину, вы можете отредактировать выбранные вами товары: добавить или удалить, а также изменить количество. Оставив в корзине только те товары, которые вы действительно хотите приобрести, нажмите на кнопку «Оформить заказ».</p>
                        <h2>3. Платежные реквизиты</h2>
                        <div className="img_wrapper">
                            <img src="images/order_3.png" alt="Как заказать"/>
                        </div>
                        <p>Пожалуйста, внимательно вводите номера телефонов. Данная информация необходима для дальнейшего подтверждения заказа, а также согласования последующей доставки.</p>
                        <h2>4. Оплата заказа</h2>
                        <p>Оплатить товар вы можете двумя способами:</p>
                        <ul>
                            <li>наличный расчет;</li>
                            <li>пластиковой платежной картой UZCARD, HUMO;</li>
                            <li>пластиковой платежной картой MasterCard, Visa;</li>
                            <li>платежными системами Click, Payme.</li>
                        </ul>
                        <h2>5. Доставка и получение</h2>
                        <p>Доставка товара осуществляется только по городу Ташкент в течение 48 часов после подтверждения заказа. Прежде чем расписаться в получении и оплатить доставленный заказ проверьте его внешний вид и комплектацию. Вместе с полученным товаром вам предоставят соответствующие документы: для частных лиц – товарный чек.</p>
                    </div>
                </article>
            </section>
            <Footer />
        </>
    );
}
