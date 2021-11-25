export const numberToPrice = (number) => {
  return `${number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум`;
};

export const separateNumber = (number) => {
  return `${number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
};
