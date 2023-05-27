export default function readingTime(object: any) {
  const text = object.body
  const wpm = 300
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wpm)
}
