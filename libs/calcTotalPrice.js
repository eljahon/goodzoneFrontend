export const calcTotalPrice = (order) => {
    return order.map(item => {
        return item.price * item.quantity
    }).reduce((a, b) => {
        return Math.round(a + b)
    })
}