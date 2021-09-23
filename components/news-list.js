import React from "react";
import { Row } from "react-bootstrap";
import { withTranslation, i18n } from "../i18n";
import Link from "next/link";
import { getLocaleDate } from "../libs/getLocaleDate";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Col } from "react-bootstrap";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
function NewsList({ news, t }) {
  return news ? (
    <section className="news_container news-list">
      <div className="news_content news-block">
        <h1>{t("news-blog")}</h1>
        <Row className="products_row news-row">
          {news.slice(0, 3).map((news) => (
            <Col key={news.id} sm={12} lg={4} className="products_col">
              <div className="product_card">
                <Link
                  href={`${i18n.language === "ru" ? "" : "/uz"}/news/[id]`}
                  as={`${i18n.language === "ru" ? "" : "/uz"}/news/${
                    news.slug
                  }`}
                >
                  <a className="news_image">
                    <LazyLoadImage
                      src={news.preview_image}
                      alt={news.title}
                      className="img-fluid"
                      effect="blur"
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
                      href={`${i18n.language === "ru" ? "" : "/uz"}/news/[id]`}
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
  ) : // </section>

  null;
}
export default trackWindowScroll(withTranslation("footer")(NewsList));
