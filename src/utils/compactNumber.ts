export const numberFormatter = (number: number) => {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  return formatter.format(number)
}
