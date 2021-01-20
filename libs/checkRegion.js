export const checkRegion = (isHaved, user, product) => {
  if (user) {
    if (
      product.in_stock.tashkent_city &&
      user &&
      (user.area == 'Toshkent' || user.area == 'Ташкент') &&
      !product.in_stock.samarkand
    ) {
      isHaved(true)
    }
    if (
      product.in_stock.tashkent_city &&
      user &&
      (user.area == 'Toshkent' || user.area == 'Ташкент') &&
      product.in_stock.samarkand
    ) {
      isHaved(true)
    }
    if (
      !product.in_stock.tashkent_city &&
      user &&
      (user.area == 'Toshkent' || user.area == 'Ташкент') &&
      !product.in_stock.samarkand
    ) {
      isHaved(false)
    }
    if (
      !product.in_stock.tashkent_city &&
      user &&
      (user.area == 'Toshkent' || user.area == 'Ташкент') &&
      product.in_stock.samarkand
    ) {
      isHaved(false)
    }

    if (
      product.in_stock.tashkent_city &&
      user &&
      (user.area == 'Samarqand' || user.area == 'Самарканд') &&
      !product.in_stock.samarkand
    ) {
      isHaved(false)
    }
    if (
      product.in_stock.tashkent_city &&
      user &&
      (user.area == 'Samarqand' || user.area == 'Самарканд') &&
      product.in_stock.samarkand
    ) {
      isHaved(true)
    }
    if (
      !product.in_stock.tashkent_city &&
      user &&
      (user.area == 'Samarqand' || user.area == 'Самарканд') &&
      !product.in_stock.samarkand
    ) {
      isHaved(false)
    }
    if (
      !product.in_stock.tashkent_city &&
      user &&
      (user.area == 'Samarqand' || user.area == 'Самарканд') &&
      product.in_stock.samarkand
    ) {
      isHaved(true)
    }
  } else {
    const item = localStorage.getItem('region')
    if (
      product.in_stock.tashkent_city &&
      item &&
      (item == 'Toshkent' || item == 'Ташкент') &&
      !product.in_stock.samarkand
    ) {
      isHaved(true)
    }
    if (
      product.in_stock.tashkent_city &&
      item &&
      (item == 'Toshkent' || item == 'Ташкент') &&
      product.in_stock.samarkand
    ) {
      isHaved(true)
    }
    if (
      !product.in_stock.tashkent_city &&
      item &&
      (item == 'Toshkent' || item == 'Ташкент') &&
      !product.in_stock.samarkand
    ) {
      isHaved(false)
    }
    if (
      !product.in_stock.tashkent_city &&
      item &&
      (item == 'Toshkent' || item == 'Ташкент') &&
      product.in_stock.samarkand
    ) {
      isHaved(false)
    }

    if (
      product.in_stock.tashkent_city &&
      item &&
      (item == 'Samarqand' || item == 'Самарканд') &&
      !product.in_stock.samarkand
    ) {
      isHaved(false)
    }
    if (
      product.in_stock.tashkent_city &&
      item &&
      (item == 'Samarqand' || item == 'Самарканд') &&
      product.in_stock.samarkand
    ) {
      isHaved(true)
    }
    if (
      !product.in_stock.tashkent_city &&
      item &&
      (item == 'Samarqand' || item == 'Самарканд') &&
      !product.in_stock.samarkand
    ) {
      isHaved(false)
    }
    if (
      !product.in_stock.tashkent_city &&
      item &&
      (item == 'Samarqand' || item == 'Самарканд') &&
      product.in_stock.samarkand
    ) {
      isHaved(true)
    }
  }
}
