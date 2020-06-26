export const numberToPrice = (number, som = false) => {
    return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум`;
};
