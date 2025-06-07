export const calculateTotalPrice = (priceBeforeVat, vat) => {
  return Math.round(priceBeforeVat * (1 + vat / 100))
}
