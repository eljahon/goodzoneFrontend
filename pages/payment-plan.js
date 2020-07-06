// import SEO from "../components/seo";
// import Header from "../components/header";
// import Footer from "../components/footer"
// import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";
// import Link from 'next/link'

// export default function PaymentPlan({ categories }) {
//     return (
//         <>
//             <SEO title="Goodzone" />
//             <Header categories={categories} />
//             <div className="delivery_splash">
//                 <img src="images/payment-plan_1.jpg" alt="Goodzone Questions" />
//             </div>
//             <section className="section_container">
//                 <article className="delivery_content">
//                     <h1>Рассрочка</h1>
//                     <div className="content_block">
//                         <h2>Не откладывайте мечты на завтра! <br /> Покупайте сейчас, платите потом по выгодной схеме.</h2>
//                         <div className="img_wrapper">
//                             <img src="/images/payment-plan_2.jpg" alt="Инструкция" />
//                         </div>
//                         <Link href="/payment-plan-rules">
//                             <a className="payment_plan-link">Публичная оферта по рассрочке</a>
//                         </Link>
//                     </div>
//                 </article>
//             </section>
//             <Footer />
//         </>
//     )
// }

// export async function getServerSideProps() {
//     const urls = [process.env.CATEGORY_API_URL];
//     const [{ categories }] = await fetchMultipleUrls(urls);

//     return {
//         props: {
//             categories,
//         },
//     };
// }
