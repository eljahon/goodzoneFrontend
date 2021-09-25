import React from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import CompareCards from "./compare-card";
import { shallowEqual, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FaShoppingBag } from "react-icons/fa";
import CartPopup from "./cart-popup";
import { useTranslation } from "../i18n";

export default function CompareCard() {
  const compareItems = useSelector(
    (state) => state.compare.compareItems,
    shallowEqual
  );
  const { t } = useTranslation();
  console.log("compare", compareItems);

  const router = useRouter();
  const { categoryId } = router.query;
  const products = compareItems.filter(
    (item) => item.category.id == categoryId
  );
  console.log(categoryId);

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
                      Цена
                    </a>
                  </li>
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      Цена в рассрочку
                    </a>
                  </li>
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      Цена в рассрочку
                    </a>
                  </li>
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      Цена в рассрочку
                    </a>
                  </li>
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      Цена в рассрочку
                    </a>
                  </li>
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      Цена в рассрочку
                    </a>
                  </li>
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      Цена в рассрочку
                    </a>
                  </li>
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      Цена в рассрочку
                    </a>
                  </li>
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      Цена в рассрочку
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        ) : (
          <div className="no_compare_card">
            <h3 className="no_compare_title">{t("noProduct")}</h3>
          </div>
        )}
        <CompareCards categoryId={categoryId} />
      </Row>
    </>
  );
}
