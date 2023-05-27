export default function returnDate(object: any) {
  const date = new Date(object.createdAt)
  const d = date.getDate()
  const m = date.toLocaleString('default', { month: 'long' })
  const y = date.getFullYear()
  if (d > 3 && d < 21) return `${d}th ${m} ${y}`
  switch (d % 10) {
    case 1:
      return `${d}st ${m} ${y}`
    case 2:
      return `${d}nd ${m} ${y}`
    case 3:
      return `${d}rd ${m} ${y}`
    default:
      return `${d}th ${m} ${y}`
  }
}
