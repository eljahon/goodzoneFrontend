import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import OrderDetails from "./order-details";
import { useSelector, shallowEqual } from "react-redux";
import { withTranslation, i18n } from "../i18n";
import { numberToPrice } from "../libs/numberToPrice";
import { calcTotalPrice } from "../libs/calcTotalPrice";
import Link from "next/link";
import axios from "axios";

const statusDict = {
  "in-process": "В обработке",
  cancelled: "Отменен",
  finished: "Завершено",
};

function OrderListMobile({ t, orders }) {
  return (
    <div className="mobile_view">
      <h3>{t("my-orders")}</h3>
      <Accordion defaultActiveKey="0">
        {orders
          ? orders.map((order, i) => order.items && (
              <Link
                href={`${
                  i18n.language === "ru" ? "" : "/uz"
                }/order-history/[id]`}
                as={`${i18n.language === "ru" ? "" : "/uz"}/order-history/${
                  order.number
                }`}
                key={order.id}
              >
                <div key={i}>
                  <Accordion.Toggle eventKey={i}>
                    <div className="order_card">
                      <div className="card_header">
                        <span>
                          {t("order")} #{order.number}
                        </span>
                      </div>
                      <div className="card_body">
                        <div className="card_meta">
                          <span>{t("date")}:</span>
                          <span>{order.created_at}</span>
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
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={i}>
                    <OrderDetails />
                  </Accordion.Collapse>
                </div>
              </Link>
            ))
          : ""}
      </Accordion>
    </div>
  );
}

export default withTranslation("checkout")(OrderListMobile);
