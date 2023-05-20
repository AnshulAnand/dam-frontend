import { FC } from 'react'

interface PageProps {
  params: { userId: string }
}

const Profile: FC<PageProps> = ({ params }) => {
  console.log(params.userId.replace('%40', ''))
  return <div>{params.userId}</div>
}

export default Profile
