// import SEO from "../components/seo";
// import Footer from "../components/footer";
// import Link from "next/link";
// import { useState } from "react";

// export default function OrderReceived() {
//     const [payment, setPayment] = useState("click");
//     const handleChange = (e) => {
//         setPayment(e.target.value);
//     }
//     return (
//         <>
//             <SEO title="Заявка принята" />

//             <div className="order_received-wrapper">
//                 <div className="order_received-container">
//                     <Link href="/">
//                         <a className="btn home_btn">Вернуться на главную</a>
//                     </Link>
//                     <div className="order_info">
//                         <h2>Заявка принята</h2>
//                         <p>Спасибо. Ваш заказ был получен.</p>
//                         <div className="info_block-wrapper">
//                             <div className="info_block">
//                                 <p className="title">Номер заказа</p>
//                                 <p>200624-0002</p>
//                             </div>
//                             <div className="info_block">
//                                 <p className="title">Дата</p>
//                                 <p>июнь 24, 2020 - 22:38</p>
//                             </div>
//                             <div className="info_block">
//                                 <p className="title">Итоговая сумма</p>
//                                 <p>12 461 000 сум</p>
//                             </div>
//                             <div className="info_block">
//                                 <p className="title">Способ оплаты</p>
//                                 <p>Наличные</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="order_info">
//                         <h2>Информация о заказе</h2>
//                         <div className="list_item">
//                             <div className="list_title">
//                                 <p>Всего товаров</p>
//                             </div>
//                             <div className="list_desc">
//                                 <p>6 штук</p>
//                             </div>
//                         </div>
//                         <div className="list_item">
//                             <div className="list_title">
//                                 <p>Способ доставки</p>
//                             </div>
//                             <div className="list_desc">
//                                 <p>Самовывоз</p>
//                             </div>
//                         </div>
//                         <div className="list_item">
//                             <div className="list_title">
//                                 <p>Способ оплаты</p>
//                             </div>
//                             <div className="list_desc">
//                                 <p>Наличные</p>
//                             </div>
//                         </div>
//                         <div className="list_item">
//                             <div className="list_title">
//                                 <p>Итоговая сумма</p>
//                             </div>
//                             <div className="list_desc">
//                                 <p>12 461 000 сум</p>
//                             </div>
//                         </div>
//                         <div className="list_item pay_now">
//                             <div className="list_title">
//                                 <p>Заплатить сейчас:</p>
//                             </div>
//                             <div className="list_desc">
//                                 <select disabled name="payment" id="payment" defaultValue="click" onChange={(e) => handleChange(e)}>
//                                     <option value="cash">Наличные</option>
//                                     <option value="terminal">Терминал</option>
//                                     <option value="click">Click</option>
//                                     <option value="payme">Payme</option>
//                                     <option value="unired">Unired</option>
//                                 </select>
//                                 {(payment == "click" || payment == "payme") ? <button className="btn btn_pay">Заплатить сейчас</button> : ''}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <Footer />
//         </>
//     );
// }
