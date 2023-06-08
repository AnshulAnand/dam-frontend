export default function ProfileSkeleton() {
  return (
    <div className='profile profile-skeleton'>
      <div className={`skeleton animate-pulse profile-skeleton-circle`}></div>
      <div className='profile-skeleton-lines'>
        <div className={`skeleton animate-pulse`}></div>
        <div className={`skeleton animate-pulse`}></div>
      </div>
    </div>
  )
}
