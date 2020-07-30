import SEO from "../../components/seo";
import Footer from "../../components/footer";
import { fetchMultipleUrls } from "../../libs/fetchMultipleUrls";

export default function NewSingle({ data }) {
    console.log(data)
    return (
        <>
            <SEO />
            <section className="section_container">
                <article className="delivery_content">
                    <div className="img_wrapper">
                        <img src="../images/carousel_4.jpg" alt="Новости" />
                    </div>
                    <p className="date">13 июня</p>
                    <h2>Описание и условия акции</h2>
                    <p>Samsung переосмыслила традиционную роль телевизора в гостиной. Буквально недавно это был огромный прямоугольник, зияющий своей черной пустотой на всю комнату. Сегодня телевизор The Frame украшает интерьер, отображая в специальном режиме «Картина» лучшие произведения живописи и фотографии.</p>
                    <h2>Искусство и телевизор</h2>
                    <p>Благодаря сменным рамкам (черного, белого, бежевого цветов и под орех) The Frame органично вписывается в любой интерьер. Специальный кронштейн позволяет разместить телевизор максимально плотно к стене. В таком случае он растворяется среди висящих картин или фотографий. Однако при желании можно пойти еще дальше и докупить специальную подставку-мольберт.</p>
                </article>
            </section>
            <Footer />
        </>
    );
}

export async function getServerSideProps({ params, req }) {

    const urls = [`${process.env.NEWS_API_URL}/${params.id}?lang=${req.i18n.language}`];

    const [{ data }] = await fetchMultipleUrls(urls);

    console.log(urls)

    return {
        props: { data },
    };
}
