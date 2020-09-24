import SEO from "../../components/seo";
import Footer from "../../components/footer";
import { fetchMultipleUrls } from "../../libs/fetchMultipleUrls";
import { getLocaleDate } from '../../libs/getLocaleDate'

export default function NewSingle({ data }) {
    console.log(data)
    return (
        <>
            <SEO 
                title={data.new.meta.title || data.new.title}
                description={data.new.meta.description || data.new.description.replace(/(<([^>]+)>)/gi, "")}
                image={data.new.imageURL}
                keywords={data.new.meta.tags}
            />
            <section className="section_container">
                <article className="delivery_content">
                    <div className="img_wrapper">
                        <img src={data.new.imageURL} alt={data.new.title} />
                    </div>
                    <p className="date">{getLocaleDate(data.new.updated_at)}</p>
                    <div dangerouslySetInnerHTML={{__html: data.new.full_text}} />
                </article>
            </section>
            <Footer />
        </>
    );
}

export async function getServerSideProps({ params, req }) {

    const urls = [`${process.env.NEWS_API_URL}/${params.id}?lang=${req.i18n.language}`];

    const [data] = await fetchMultipleUrls(urls);

    return {
        props: { data },
    };
}
