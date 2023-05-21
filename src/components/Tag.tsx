import Link from 'next/link'

const Tag = ({ tag }: { tag: string }) => {
  return (
    <Link href={`/tags/${tag}`} className='article'>
      <span className='tag-name'>#{tag}</span>
      <img
        src={`/images/tags/${tag}-tag.jpg`}
        alt=''
        className='article-image'
      />
    </Link>
  )
}

export default Tag
