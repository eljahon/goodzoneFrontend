import React from 'react'
import { Table } from 'react-bootstrap'
import { withTranslation } from '../i18n'
import { calcRassrochka } from '../libs/calculateRassrochka'
import { separateNumber } from '../libs/numberToPrice'

const RassrochkaTable = ({ t, month, price, prepayment }) => {
  const {
    rassrochkaPrice,
    rassrochkaPriceAfterPrepayment,
    monthlyPayment,
    skidka,
    totalPayment,
  } = calcRassrochka({
    price,
    month,
    prepayment,
  })

  let tableData = []
  let leftAmount = rassrochkaPriceAfterPrepayment
  for (let i = 1; i <= month; i++) {
    if (i == 1) {
      leftAmount = totalPayment - prepayment
    } else {
      leftAmount -= monthlyPayment
    }
    const tableRowData = {
      month: i,
      price,
      leftAmount,
      monthlyPayment,
    }
    tableData.push(tableRowData)
  }

  return (
    <>
      <p>
        {t('initial-rassrochka-price')}:{' '}
        {`${separateNumber(rassrochkaPrice)} ${t('currency')}`}
      </p>
      <p>
        {t('prepayment-amount')}:{' '}
        {`${separateNumber(prepayment)} ${t('currency')}`}
      </p>
      <p>
        {t('skidka')}: {`${separateNumber(skidka)} ${t('currency')}`}
      </p>
      <p>
        {t('overall-sum')}: {`${separateNumber(totalPayment)} ${t('currency')}`}
      </p>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>{t('month')}</th>
            <th>{t('monthly-payment')}</th>
            <th>{t('left-debt')}</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((el) => {
            // console.log("el", el);
            return (
              <tr key={el.month}>
                <td>{el.month}</td>
                <td>
                  {el.month == 1
                    ? separateNumber(Number(prepayment).toFixed(0))
                    : separateNumber(Number(el.monthlyPayment).toFixed(0))}{' '}
                  {t('currency')}
                </td>
                <td>
                  {separateNumber(Number(el.leftAmount).toFixed(0))}{' '}
                  {t('currency')}
                </td>
              </tr>
            )
          })}
          <br />
          <tr>
            <td>{t('overall-paid')}</td>
            <td>
              {separateNumber(Number(totalPayment).toFixed(0))} {t('currency')}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default withTranslation('common')(RassrochkaTable)
