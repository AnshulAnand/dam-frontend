import page from '@/app/articles/page.module.css'

export default function ArticleSkeleton() {
  return (
    <div
      style={{ borderRadius: '10px' }}
      className={`skeleton animate-pulse ${page.article}`}
    ></div>
  )
}
