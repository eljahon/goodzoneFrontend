import React from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import CompareCards from "./compare-card";
import { shallowEqual, useSelector } from "react-redux";
import { useRouter } from "next/router";
import CartPopup from "./cart-popup";
import { useTranslation } from "../i18n";
import { useEffect } from "react";
import { useState } from "react";

export default function CompareCard() {
  const compareItems = useSelector(
    (state) => state.compare.compareItems,
    shallowEqual
  );

  const [properties, setProperties] = useState([]);
  const [products, setProducts] = useState([]);

  const { t } = useTranslation();

  const router = useRouter();

  const { categoryId } = router.query;

  useEffect(() => {
    const arr2 = compareItems.filter((item) => item.category.id == categoryId);
    setProducts(arr2);
  }, [categoryId]);

  useEffect(() => {
    const arr = [];
    products?.map((item) => {
      if (item.properties) {
        arr.push(item.properties);
      }
    });
    let sortedProductsByPrice = arr.sort((a, b) => a.length - b.length);
    setProperties(sortedProductsByPrice[arr.length - 1]);
  }, [products]);

  return (
    <>
      <CartPopup />
      <Row className="compare_rows">
        {Boolean(products.length) ? (
          <Col sh={12} sm={6} md={6} lg={4} xl={3} className="compare_col">
            <div className="compare_card-1">
              <div className="compare_info">
                <ul className="compare_list">
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      {t("comparePrice")}
                    </a>
                  </li>
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      {t("mark")}
                    </a>
                  </li>
                  {properties?.map(
                    (item, index) =>
                      item.property.id && (
                        <li className="compare_item" key={index}>
                          <a href="#!" className="compare_link">
                            {item.property.name}
                          </a>
                        </li>
                      )
                  )}
                </ul>
              </div>
            </div>
          </Col>
        ) : (
          <div className="no_compare_card">
            <h3 className="no_compare_title">{t("noProduct")}</h3>
          </div>
        )}
        <CompareCards categoryId={categoryId} properties={properties} />
      </Row>
    </>
  );
}
