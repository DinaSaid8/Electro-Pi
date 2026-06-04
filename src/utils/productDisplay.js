export function getDiscountLabel(product) {
  const pct = product?.discountPercentage;
  if (!pct || pct <= 0) return null;
  return `-${Math.round(pct)}%`;
}

export function getStockLabel(stock) {
  if (stock == null) return null;
  if (stock === 0) return { text: 'Out of stock', tone: 'danger' };
  if (stock < 10) return { text: `Only ${stock} left`, tone: 'warn' };
  return null;
}
