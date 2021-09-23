import React from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import CompareCards from "./compare-card";
import { shallowEqual, useSelector } from "react-redux";

export default function CompareCard() {
  const compareItems = useSelector(
    (state) => state.compare.compareItems,
    shallowEqual
  );

  return (
    <>
      <Row className="compare_rows">
        {Boolean(compareItems.length > 0) ? (
          <Col sm={12} lg={3} className="compare_col">
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
          <div className="no_compare_title">
            <h3>Нет товаров. Пожалуйста, сначала добавьте товар!</h3>
          </div>
        )}
        <CompareCards />
      </Row>
    </>
  );
}
