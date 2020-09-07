import React, { useEffect, useState } from "react";
import { withTranslation, i18n } from "../i18n";
import { useSelector, shallowEqual } from "react-redux";
import axios from "axios";
import { numberToPrice } from "../libs/numberToPrice";
import { calcTotalPrice } from "../libs/calcTotalPrice";
import Link from "next/link";

const statusDict = {
  "in-process": "В обработке",
  cancelled: "Отменен",
  finished: "Завершено",
};

function OrderList({ t, orders }) {
  return orders ? (
    <div className="order_list-wrapper">
      <h3>{t("my-orders")}</h3>
      <div className="order_content-wrapper">
        <div className="order_content">
          <div className="order_list">
            {orders ? (
              orders.map((order) => order.items && (
                <Link
                  href={`${
                    i18n.language === "ru" ? "" : "/uz"
                    }/order-history/[id]`}
                  as={`${i18n.language === "ru" ? "" : "/uz"}/order-history/${
                    order.number
                    }`}
                  key={order.id}
                >
                  <a className="order_card">
                    <div className="card_header">
                      <span>
                        {t("order")} #{order.number}
                      </span>
                    </div>
                    <div className="card_body">
                      <div className="card_meta">
                        <span>{t("date")}:</span>
                        <span> {order.created_at}</span>
                      </div>
                      <div className="card_meta">
                        <span>{t("status")}:</span>
                        <span>{statusDict[order.status]}</span>
                      </div>
                      <div className="card_meta">
                        <span>{t("total")}:</span>
                        <span>
                          {numberToPrice(calcTotalPrice(order.items))}
                        </span>
                      </div>
                    </div>
                  </a>
                </Link>
              ))
            ) : (
                <p>{t("you-havent-ordered-yet")}</p>
              )}
          </div>
        </div>
      </div>
    </div>
  ) : (
      ""
    );
}

export default withTranslation("checkout")(OrderList);
