export const calcRassrochka = ({ percent, price, month, prepayment }) => {
  let totalLeft = (price - prepayment) * (1 + percent / 100);
  // let totalLeft

  console.log("percent", percent);
  console.log("price", price);
  const installmentPrice = price * (percent / 100 + 1);
  const threshold = installmentPrice / month;
  console.log(threshold);

  //   if (prepayment > threshold) {
  //     totalLeft = (price - prepayment) * (1 + percent / 100);
  //   } else {
  //     totalLeft = installmentPrice - prepayment;
  //   }
  const perMonthPayment = totalLeft / month;
  console.log("totalLeft", totalLeft);
  console.log("month", month);

  return [perMonthPayment, totalLeft, installmentPrice];
};

// percent - foiz miqdori
// totalLeft - umumiy narxdan birinchi to'lov ayirilgandan keyingi qolgan summa
// installmentPrice - mahsulotning rassrochka narxi (price + percent)
// threshold - birinchi to'lovning eng kam miqdori
// month - to'lov muddati
// perMonthPayment - to'lov muddati mobaynida oyiga to'lanishi kerak bo'lgan summa
