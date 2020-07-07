import SEO from "../components/seo";
import Footer from "../components/footer"

export default function ExchangeReturnRepair() {
    return (
        <>
            <SEO title="Goodzone" />
            <div className="delivery_splash">
                <img src="images/exchange.jpg" alt="Goodzone Questions" />
            </div>
            <section className="section_container">
                <article className="delivery_content">
                    <div className="content_block">
                        <h3>Могу ли я вернуть или обменять товар?</h3>
                        <p>Согласно ст.9 Закона «О защите прав потребителей», вы можете вернуть или обменять товар надлежащего качества, приобретённый в розничном магазине, в течение 10 дней, не считая дня покупки.</p>
                        <h3>Ремонт гарантийных товаров</h3>
                        <ul className="numeric_list">
                            <li>Для гарантийного обслуживания вы можете обратиться в авторизованный сервисный центр или ближайший розничный магазин «GOODZONE» в течение всего гарантийного срока товара.</li>
                            <li>Адреса авторизованных сервисных центров, проводящих гарантийный ремонт, можно найти на официальных сайтах производителей и в документах, прилагаемых к товару.</li>
                            <li>При обращении с товаром в сервисный центр или магазин «GOODZONE» потребуется кассовый чек, подтверждающий покупку данного товара.</li>
                            <li>В сервисном центре технику отремонтируют, а в случае невозможности ремонта будет выдано заключение о ремонтонепригодности. С заключением нужно обратиться в любой розничный магазин «GOODZONE»</li>
                        </ul>
                        <h3>Товары, не подлежащие обмену и возврату</h3>
                        <h3>Товары, не подлежащие обмену и возврату согласно «Закону о защите прав потребителей»:</h3>
                        <ul>
                            <li>Предметы санитарии и личной гигиены (эпиляторы, электробритвы, машинки для стрижки волос, фены и фены-щётки, щипцы для волос и термобигуди, зубные щётки и т.д.);</li>
                            <li>Товары для ухода за больными и детьми (термометры, массажные ванны, маникюрные наборы, детские весы и т.д.);</li>
                            <li>Бытовая химия;</li>
                            <li>Кабельная продукция (провода, шнуры, кабели), отпускаемые на метраж;</li>
                            <li>Товары, содержащие в комплекте SIM-карты;</li>
                            <li>Товары с активированной учётной записью пользователя;</li>
                            <li>Товары с активированным / обновлённым / изменённым программным обеспечением;</li>
                            <li>Товары в блистерной одноразовой упаковке, если упаковка была вскрыта или повреждена;</li>
                            <li>Некондиционные (уценённые) товары;</li>
                            <li>Программное обеспечение, цифровые коды, игры, фильмы, музыка (диски с записью).</li>
                        </ul>
                        <h3>Возврат / замена товара ненадлежащего качества</h3>
                        <ul className="numeric_list">
                            <li>Если в течение гарантийного срока в приобретённом вами товаре обнаружен недостаток, вы вправе по своему выбору заявить одно из требований, указанных в ст. 12 Закона РУз от №221-I 26.04.1996 «О защите прав потребителей».</li>
                            <li>Для замены / возврата товара ненадлежащего качества вы можете обратиться в любой розничный магазин «GOODZONE» с товаром и кассовым чеком. Вам предложат оформить письменное заявление с указанием требования в отношении товара с недостатком.</li>
                            <li>При предъявлении претензии в отношении товара ненадлежащего качества продавец вправе провести проверку качества товара. По результатам такой проверки качества продавец примет решение в соответствии с Законом РУз «О защите прав потребителей».</li>
                            <li>При оформлении замены / возврата товара ненадлежащего качества потребуется паспорт покупателя.</li>
                            <li>Способ возврата денежных средств определяется в зависимости от способа оплаты этого товара.</li>
                        </ul>
                    </div>
                </article>
            </section>
            <Footer />
        </>
    )
}
