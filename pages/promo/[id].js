import SEO from "../../components/seo";
import Footer from "../../components/footer";
import { fetchMultipleUrls } from "../../libs/fetchMultipleUrls";
import { getLocaleDate } from "../../libs/getLocaleDate";
import Head from "next/head";
import { useEffect } from "react";

export default function PromoSingle({ data }) {
  const { promo } = data;
  useEffect(() => {
    document.querySelectorAll("oembed[url]").forEach((element) => {
      // Create the <a href="..." class="embedly-card"></a> element that Embedly uses
      // to discover the media.
      const anchor = document.createElement("a");
      anchor.setAttribute("href", element.getAttribute("url"));
      anchor.className = "embedly-card";
      element.appendChild(anchor);
    });
  }, []);

  return (
    <>
      <SEO
        title={promo.meta.title || promo.title}
        description={
          promo.meta.description ||
          promo.description.replace(/(<([^>]+)>)/gi, "")
        }
        image={promo.imageURL}
        keywords={promo.meta.tags}
      />
      <section className="section_container">
        <article className="delivery_content">
          <div className="img_wrapper">
            <img src={promo.image} alt={promo.title} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: promo.description }} />
          <span dangerouslySetInnerHTML={{ __html: promo.preview_text }} />
          <div className="promo_status">
            <div className="status">
              <span className="title">Статус на данный момент</span>
              <span className="desc">Завершилась</span>
            </div>
            <div className="status">
              <span className="title">Период проведения</span>
              <span className="desc">
                {getLocaleDate(promo.start_time)} -{" "}
                {getLocaleDate(promo.end_time)}
              </span>
            </div>
          </div>
        </article>
      </section>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  const urls = [
    `${process.env.PROMO_API_URL}/${params.id}?lang=${req.i18n.language}`,
    `${process.env.CATEGORY_API_URL}?lang=${req.i18n.language}`,
  ];

  const [data, categories] = await fetchMultipleUrls(urls);

  return {
    props: { data, categories },
  };
}
