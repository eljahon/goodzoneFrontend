import React from "react";
import Link from "next/link";
import { Col } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { asyncRemoveFromCompareAction } from "../redux/actions/compareActions/compareActions";

export default function CompareCards() {
  const compareItems = useSelector(
    (state) => state.compare.compareItems,
    shallowEqual
  );
  const removeFromCompareHandler = (compareItem) => {
    dispatch(asyncRemoveFromCompareAction(compareItem));
  };
  const dispatch = useDispatch();

  return (
    <>
      {compareItems.map((compareItem) => {
        return (
          <Col sm={12} lg={3} className="compare_col">
            <div key={compareItem.id} className="compare_card">
              <Link href="#!">
                <div className="compare_image">
                  <img
                    src={compareItem.image}
                    alt={compareItem.name}
                    className="compare__img"
                  />
                </div>
              </Link>
              <div className="compare_info">
                <Link href="#!">
                  <a>
                    <h3 className="compare_title">{compareItem.name}</h3>
                  </a>
                </Link>
                <Link href="#!">
                  <button className="compare_btn">
                    <img src="../compare_icon.svg" alt="compare_icon" />
                  </button>
                </Link>
                <div className="campare_delete">
                  <a
                    href=""
                    onClick={() => removeFromCompareHandler(compareItem)}
                  >
                    <img src="../Red_arrow.svg" alt="red_arrow" />
                  </a>
                  <a
                    href=""
                    className="campare_delete-txt"
                    onClick={() => removeFromCompareHandler(compareItem)}
                  >
                    Удалить
                  </a>
                </div>
                <ul className="compare_list">
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      {compareItem.price.price}
                    </a>
                  </li>
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      Есть
                    </a>
                  </li>
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      Есть
                    </a>
                  </li>
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      Есть
                    </a>
                  </li>
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      Есть
                    </a>
                  </li>
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      Есть
                    </a>
                  </li>
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      Есть
                    </a>
                  </li>
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      Есть
                    </a>
                  </li>
                  <li className="compare_item">
                    <a href="#!" className="compare_link">
                      Есть
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        );
      })}
    </>
  );
}
