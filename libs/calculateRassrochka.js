export const calcRassrochka = ({ price, month, prepayment }) => {
  prepayment = Number(prepayment)
  price = Number(price)
  month = Number(month)

  const rassrochkaPrice = price * (process.env.PERCENT / 100 + 1)

  let rassrochkaPriceAfterPrepayment =
    (price - prepayment) * (1 + process.env.PERCENT / 100)
  let totalPayment = rassrochkaPriceAfterPrepayment + prepayment
  let skidka = rassrochkaPrice - totalPayment
  let monthlyPayment = rassrochkaPriceAfterPrepayment / (month - 1)

  // console.log("rassrochkaPriceAfterPrepayment", rassrochkaPriceAfterPrepayment);
  // console.log("monthlyPayment", monthlyPayment);
  // console.log("month", month);

  return {
    rassrochkaPrice,
    rassrochkaPriceAfterPrepayment,
    monthlyPayment,
    skidka,
    totalPayment,
  }
}
