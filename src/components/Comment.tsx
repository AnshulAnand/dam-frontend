import {
  RiThumbUpLine,
  RiPencilLine,
  RiDeleteBinLine,
  RiChat1Line,
  RiMessage3Line,
} from 'react-icons/ri'
import { useEffect, useState } from 'react'
import page from '@/app/articles/[article]/page.module.css'
import Profile from './Profile'
import Reply from './Reply'

const Comment = () => {
  const [repliesVisible, setRepliesVisible] = useState(false)
  const [repliesVisibleClass, setRepliesVisibleClass] = useState('d-none')

  const showReplies = () => {
    if (repliesVisible) setRepliesVisible(false)
    else setRepliesVisible(true)
  }

  useEffect(() => {
    if (repliesVisible) setRepliesVisibleClass('d-block')
    else setRepliesVisibleClass('d-none')
  }, [repliesVisible])

  return (
    <div className={page.comment}>
      {/* Parent comment */}
      <div className={page.comment_parent}>
        <div className={page.profile}>
          <Profile width={40} height={40} forArticle={false} />
          <div className={page.btn_container}>
            <button className={page.btn}>
              <RiPencilLine />
            </button>
            <button className={page.btn}>
              <RiDeleteBinLine />
            </button>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quidem
          asperiores veniam perspiciatis voluptas ipsam quae quia? Officia, odit
          et? Fugit illum quod expedita ratione laboriosam atque inventore
          numquam enim.
        </p>
      </div>
      <div className={page.btn_container}>
        <button className={`${page.btn} ${page.comment_btn}`}>
          <RiThumbUpLine className={page.icon} /> 287
        </button>
        <button
          className={`${page.btn} ${page.comment_btn}`}
          onClick={showReplies}
        >
          <RiChat1Line className={page.icon} /> 198
        </button>
        <button className={page.btn}>
          <RiMessage3Line className={page.icon} />
        </button>
      </div>
      {/* Child comments */}
      <div className={`${page.replies} ${repliesVisibleClass}`}>
        <Reply />
        <Reply />
        <Reply />
      </div>
    </div>
  )
}
export default Comment
