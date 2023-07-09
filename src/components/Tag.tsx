import Link from 'next/link'

export default function Tag({ tag }: { tag: string }) {
  return (
    <Link href={`/tags/${tag}`} className='article'>
      <span className='tag-name'>#{tag}</span>
      <img
        src={`/images/tags/${tag}-tag.jpg`}
        alt={tag}
        className='article-image'
      />
    </Link>
  )
}
