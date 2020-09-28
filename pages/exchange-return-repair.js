import SEO from "../components/seo";
import Footer from "../components/footer";
import { i18n } from "../i18n";
import useAxios from "../libs/hooks/useAxios";

export default function ExchangeReturnRepair() {
    const [pageInfo, error] = useAxios(
        `${process.env.PAGE_API_URL}/obmen-vozvrat-i-remont-tovara?lang=${i18n.language}`
    );

    console.log("pageInfo :>> ", pageInfo);

    const { content, meta, title, image, description } = pageInfo
        ? pageInfo?.data?.page
        : {};

    return (
        pageInfo && (
            <>
                <SEO
                    title={meta.title || title}
                    description={
                        meta.description ||
                        description.replace(/(<([^>]+)>)/gi, "")
                    }
                    keywords={meta.tags}
                />
                <div className="delivery_splash">
                    <img
                        src={image || "images/exchange.jpg"}
                        alt="Goodzone Questions"
                    />
                </div>
                <section className="section_container">
                    <article className="delivery_content">
                        <div
                            dangerouslySetInnerHTML={{ __html: content }}
                            className="content_block"
                        ></div>
                    </article>
                </section>
                <Footer />
            </>
        )
    );
}
