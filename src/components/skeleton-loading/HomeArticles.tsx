export default function HomeArticlesSkeleton() {
  return (
    <>
      <div className='article featured-article featured-article-1 skeleton animate-pulse'></div>
      <div className='article featured-article featured-article-2 skeleton animate-pulse'></div>
      <div className='article featured-article featured-article-3 skeleton animate-pulse'></div>

      {/* Side bar */}
      <div className='sidebar d-grid skeleton animate-pulse'>
        <h3 className='title featured-content-title'>Trending Articles</h3>
        <div className='trending-news-box'></div>
      </div>
    </>
  )
}
