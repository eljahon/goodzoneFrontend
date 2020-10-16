import React from "react";
import Link from "next/link";
import SEO from "../components/seo";
import Footer from "../components/footer";
import { Row, Col } from "react-bootstrap";
import { FaLongArrowAltRight } from "react-icons/fa";
import { withTranslation, i18n } from "../i18n";
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";
import { getLocaleDate } from "../libs/getLocaleDate";

function News({ t, news }) {
  return (
    <>
      <SEO title={t("news")} />

      <section className="news_container">
        <div className="news_content">
          <h1>{t("news")}</h1>
          <Row className="products_row">
            {news.map((news) => (
              <Col key={news.id} sm={12} lg={4} className="products_col">
                <div className="product_card">
                  <Link
                    href={`${i18n.language === "ru" ? "" : "/uz"}/news/[id]`}
                    as={`${i18n.language === "ru" ? "" : "/uz"}/news/${
                      news.slug
                    }`}
                  >
                    <a className="product_image">
                      <img
                        src={news.preview_image}
                        alt={news.title}
                        className="img-fluid"
                      />
                    </a>
                  </Link>
                  <div className="product_info">
                    <Link
                      href={`${i18n.language === "ru" ? "" : "/uz"}/news/[id]`}
                      as={`${i18n.language === "ru" ? "" : "/uz"}/news/${
                        news.slug
                      }`}
                    >
                      <a>
                        <h3 className="product_title">{news.title}</h3>
                      </a>
                    </Link>
                    <div className="product_desc">{news.description}</div>
                    <div className="product_meta">
                      <span className="date">
                        {getLocaleDate(news.updated_at)}
                      </span>
                      <Link
                        href={`${
                          i18n.language === "ru" ? "" : "/uz"
                        }/news/[id]`}
                        as={`${i18n.language === "ru" ? "" : "/uz"}/news/${
                          news.slug
                        }`}
                      >
                        <a className="btn product_btn">
                          <span className="btn_text">{t("read-more")}</span>
                          <span className="btn_icon">
                            <FaLongArrowAltRight />
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default withTranslation("footer")(News);

export async function getServerSideProps({ req }) {
  const urls = [
    `${process.env.NEWS_API_URL}?lang=${req.i18n.language}`,
    `${process.env.CATEGORY_API_URL}?lang=${req.i18n.language}`,
  ];
  const [{ news }, categories] = await fetchMultipleUrls(urls);

  return {
    props: {
      news,
      categories,
    },
  };
}
