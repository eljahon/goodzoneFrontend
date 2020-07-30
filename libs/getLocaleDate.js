export const getLocaleDate = (date) => {
    const stringDate = new Date(Date.parse(date))
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }

    return stringDate.toLocaleString('ru-RU', options)
}