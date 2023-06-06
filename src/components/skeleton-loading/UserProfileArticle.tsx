import page from '@/app/[userId]/page.module.css'

export default function UserArticleSkeleton() {
  return (
    <div
      style={{ borderRadius: '10px' }}
      className={`skeleton animate-pulse ${page.article}`}
    ></div>
  )
}
