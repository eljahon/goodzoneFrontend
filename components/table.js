import React from "react";
import { Table } from "react-bootstrap";
import { withTranslation } from "../i18n";
import { calcRassrochka } from "../libs/calculateRassrochka";
import { separateNumber } from "../libs/numberToPrice";

const RassrochkaTable = ({ t, month, price, percent, prepayment }) => {
  const [perMonthPayment, totalLeft, installmentPrice] = calcRassrochka({
    percent,
    price,
    month,
    prepayment,
  });

  let tableData = [];
  for (let i = 1; i <= month; i++) {
    const tableRowData = {
      month: i,
      price,
      totalLeft:
        (price - prepayment) * (1 + percent / 100) - i * perMonthPayment,
      perMonthPayment,
    };
    tableData.push(tableRowData);
  }

  return (
    <>
      <p>
        {t("initial-price")}: {`${separateNumber(price)} ${t("currency")}`}
      </p>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>{t("month")}</th>
            <th>{t("monthly-payment")}</th>
            <th>{t("left-debt")}</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((el) => {
            console.log("el", el);
            return (
              <tr key={el.month}>
                <td>{el.month}</td>
                <td>
                  {separateNumber(Number(el.perMonthPayment).toFixed(0))}{" "}
                  {t("currency")}
                </td>
                <td>
                  {separateNumber(Number(el.totalLeft).toFixed(0))}{" "}
                  {t("currency")}
                </td>
              </tr>
            );
          })}
          <br />
          <tr key={month + 1}>
            <td>{t("overall-paid")}</td>
            <td>
              {separateNumber(Number(totalLeft).toFixed(0))} {t("currency")}
            </td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default withTranslation("common")(RassrochkaTable);
