import SEO from '../components/seo'
import Footer from '../components/footer'
import { fetchMultipleUrls } from '../libs/fetchMultipleUrls'
import Page from '../components/page'

export default function PaymentPlanRules() {
  return (
    <>
      <SEO />
      <Page slug='payment-plan-rules' />
      {/* <section className="section_container">
                <article className="delivery_content payment_plan-rules">
                    <h1>Публичная оферта по рассрочке</h1>
                    <p className="subtitle">
                        Публичная оферта по рассрочке от 01.07.2018 г.
                    </p>
                    <div className="content_block">
                        <h3>1. Термины и понятия.</h3>
                        <ul>
                            <li>
                                1.1. Продавец – сеть магазинов бытовой техники и
                                электроники ООО «GOODZONE TRADING».
                            </li>
                            <li>
                                1.2. Покупатель – гражданин проживающий в
                                Республике Узбекистан, изъявивший желание
                                приобрести товар.
                            </li>
                            <li>
                                1.3. Рассроченный платеж (далее Рассрочка) –
                                выплата Покупателем стоимости товара на условиях
                                деления стоимости на определенное количество
                                месяцев, 3,6,9,12 и более месяцев.
                            </li>
                            <li>
                                1.4. Договор Рассрочки – договор (контракт)
                                заключаемый между Продавцом и Покупателем в
                                момент оформления Рассрочки, в котором описаны
                                все условия, в том числе условия оплаты
                            </li>
                            <li>
                                1.5. Первоначальный взнос – первая оплата
                                стоимости товара в момент оформления договора
                                Рассрочки, не является статическим процентом от
                                общей стоимости и определяется Продавцом
                                самостоятельно.
                            </li>
                            <li>
                                1.6. Ежемесячное погашение – оплата Покупателем
                                части стоимости товара, определённая в Договоре
                                Рассрочки.
                            </li>
                            <li>
                                1.7. Риск невозврата – риск возникновения
                                ситуации, при которой Покупатель ненамеренно или
                                намерено отказывается от Ежемесячного погашения
                                Продавцу.
                            </li>
                            <li>
                                1.8. Скоринг тест – система проверки Продавцом
                                Покупателя на благонадёжность и финансовую
                                дееспособность, тест проводится с целью
                                уменьшения возникновения Риска невозврата.
                            </li>
                            <li>
                                1.9. Регион проживания – регион проживания
                                гражданина по прописке.
                            </li>
                            <li>
                                1.10. Место проживания – место постоянного или
                                длительного проживания в независимости от
                                прописки.
                            </li>
                        </ul>
                    </div>
                    <div className="content_block">
                        <h3>2. Условия продаж в Рассрочку.</h3>
                        <ul>
                            <li>
                                2.1. Регион проживания г. Ташкент и Ташкентская
                                область, при наличии филиала сети в другом
                                регионе для жителей этого региона также
                                доступная Рассрочка.
                            </li>
                            <li>
                                2.2. При отсутствии прописки в г. Ташкент и
                                Ташкентской области, Место проживание г. Ташкент
                                от 2-х лет и выше, при наличии временной
                                регистрации и постоянной работы. Наличие детей,
                                посещающих заведения МНО – являются
                                дополнительным положительным фактором.
                            </li>
                            <li>2.3. Успешное прохождение скоринг теста.</li>
                            <li>
                                2.4. Возраст от 18 лет и выше, при этом
                                Покупатель в возрасте 18-22 года имеет право
                                приобрести в Рассрочку только при поручительстве
                                родителей или законных опекунов, покупатели в
                                возрасте 60 лет и выше также имеют право
                                приобрести товар в Рассрочку только при
                                поручительстве прямых потомков (дети и внуки)
                                или законных опекунов.
                            </li>
                        </ul>
                    </div>
                    <div className="content_block">
                        <h3>3. Процесс оформления Рассрочки.</h3>
                        <ul>
                            <li>
                                3.1. После выбора товара, Покупатель изъявляет
                                желание приобрести товар в Рассрочку продавцу
                                консультанту или сотрудникам кассы.
                            </li>
                            <li>
                                3.2. После этого Покупатель должен ознакомиться
                                с публичной офертой и подписать заявку на товар,
                                подписание заявки означает что покупатель
                                согласен со всеми пунктами публичной оферты и
                                принимает их.
                            </li>
                            <li>
                                3.3. После подписания заявки, уполномоченный
                                сотрудник начинает проводить скоринг тест
                                Покупателя, при успешном прохождении, сотрудник
                                оформляет Договор и принимает первую оплату.
                            </li>
                        </ul>
                    </div>
                    <div className="content_block">
                        <h3>4. Скоринг тест.</h3>
                        <ul>
                            <li>
                                4.1. Продавец несет Риск невозврата и поэтому
                                проводит скоринг тест. В процессе скоринг теста
                                уполномоченный сотрудник имеет право по
                                согласованию с Покупателем задавать любые
                                вопросы и совершать любые действия в рамках
                                законодательства РУз и этики. При этом все
                                вопросы и действия не является обязательными и
                                определяются индивидуально, Покупатель при этом
                                имеет право отказаться отвечать на вопросы и не
                                давать разрешение на совершение определённых
                                действий. Однако это может послужить причиной
                                отказать в сервисе Рассрочки
                            </li>
                        </ul>
                    </div>
                    <div className="content_block">
                        <h3>
                            4.2. В рамках Скоринг теста, уполномоченный
                            сотрудник имеет право:
                        </h3>
                        <ul>
                            <li>
                                4.2.1. Узнать номера прямых родственников:
                                супруги, родители, дети
                            </li>
                            <li>
                                4.2.2. Узнать номера телефонов: домашний
                                телефон, рабочий телефон, телефон работодателя и
                                прямого руководителя.
                            </li>
                            <li>
                                4.2.3. Позвонить по указным номерам и сообщить о
                                том, что Покупатель планирует приобрести товар в
                                Рассрочку.
                            </li>
                            <li>
                                4.2.4. Узнать причину и цель покупки в Рассрочку
                                (подарок, обновление техники, покупка нового
                                жилья, переезд и прочее).
                            </li>
                            <li>
                                4.2.5. Запросить дополнительные справки, о
                                доходах, с места работы.
                            </li>
                            <li>
                                4.2.6. Попросить продемонстрировать фото места
                                жительства, место установки и использования
                                товара.
                            </li>
                            <li>
                                4.2.7. Узнать каким товаров Покупатель
                                пользовался до этого.
                            </li>
                            <li>4.2.8. Узнать кредитную историю Покупателя</li>
                            <li>
                                4.2.9. Задать прочие вопросы в рамках соблюдения
                                этики и сугубо личной (неприкосновенной)
                                информации Покупателя.
                            </li>
                        </ul>
                    </div>
                    <div className="content_block">
                        <h3>
                            4.3. Все действия по разделу 4, публичной оферты, не
                            являются непременными и обязательными и
                            согласовываются с Покупателем.
                        </h3>
                        <h3>
                            4.4. При не прохождении скоринг теста, Продавец
                            извещает Покупателя об отказе, при этом Продавец не
                            обязан называть конкретную причину, с целью
                            соблюдения «прав личности» Покупателя.
                        </h3>
                    </div>
                    <div className="content_block">
                        <h3>5. Условия поставки товаров.</h3>
                        <ul>
                            <li>
                                5.1. Мелкогабаритные товары покупатель имеет
                                право забрать самовывозом или заказать доставку,
                                доставка в этом случае – платная.
                            </li>
                            <li>
                                5.2. Крупногабаритные товары: телевизоры с
                                диагональю от 50 дм. и выше, холодильники,
                                стиральные машины, газовые плиты, морозильные
                                шкафы, кондиционеры, посудомоечные машины,
                                встраиваемая техника и т.п – доставляются по
                                умолчанию бесплатно. В этом случае покупатель не
                                имеет право забрать товар самовывозом.
                            </li>
                            <li>
                                5.3. Подъем крупногабаритных товаров до этажа
                                осуществляется за отдельную согласованную
                                оплату.
                            </li>
                            <li>
                                5.4. При доставке крупногабаритных товаров,
                                упаковка и уплотнительные материалы снимаются с
                                товаров и вывозятся на хранение.
                            </li>
                            <li>
                                5.5. В момент поставки товаров уполномоченные
                                сотрудники имеют право убедиться в соответствии
                                места жительства и классу и техническим
                                характеристика товаров и при явном
                                несоответствии помещения и товара имеют право
                                отказать от поставки до дальнейших
                                разбирательств.
                            </li>
                            <li>
                                (пример: товар класса премиум в небольшом
                                помещении, которое нуждается в серьезном
                                ремонте). Данный пункт не является обязательным,
                                однако не исключен.
                            </li>
                            <li>
                                5.6. В случае возникновения негативной ситуации
                                по п.п. 5.5., договор считается расторгнутым, а
                                оплата возвращается Покупателю в течении 3-х
                                банковских дней.
                            </li>
                        </ul>
                    </div>
                    <div className="content_block">
                        <h3>6. Оплата и погашения.</h3>
                        <ul>
                            <li>
                                6.1. Оплата и погашения принимаются наличными
                                и/или дебетовыми картами, UzCard, HUMO, Visa,
                                физических лиц.
                            </li>
                            <li>
                                6.2. В случае непогашения задолженности
                                своевременно, Продавец оставляет за собой право
                                применить штрафные санкции в соответствии с
                                Договором.
                            </li>
                        </ul>
                    </div>
                </article>
            </section> */}
    </>
  )
}
export async function getServerSideProps({ req }) {
  const urls = [`${process.env.CATEGORY_API_URL}?lang=${req.i18n.language}`]

  const [categories] = await fetchMultipleUrls(urls)

  return {
    props: {
      categories,
    },
  }
}
