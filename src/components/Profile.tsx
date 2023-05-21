import Link from 'next/link'

function Profile({
  width,
  height,
  forArticle,
}: {
  width: number
  height: number
  forArticle: boolean
}) {
  return (
    <Link href={'/@anandanshul02'} className='profile'>
      <img
        src='/images/featured/featured-1.jpg'
        alt='pfp'
        width={width}
        height={height}
      />
      {forArticle ? (
        <div style={{ marginLeft: '60px' }}>
          <small>by</small>
          <p>anshulanand02</p>
        </div>
      ) : (
        <div style={{ marginLeft: '50px' }}>
          <small>9th May 2023</small>
          <small>andhulanand02</small>
        </div>
      )}
    </Link>
  )
}

export default Profile
