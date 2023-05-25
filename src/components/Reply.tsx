'use client'

import {
  RiThumbUpLine,
  RiPencilLine,
  RiDeleteBinLine,
  RiMessage3Line,
} from 'react-icons/ri'
import page from '@/app/articles/[article]/page.module.css'
import Profile from './Profile'

function Reply() {
  return (
    <div className={page.reply}>
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
        cum, dolorum nobis ipsam obcaecati reprehenderit itaque ad amet nostrum
        illum libero assumenda, illo asperiores vitae fugit, voluptate nulla
        repellat eum?
      </p>
      <div className={page.btn_container}>
        <button className={`${page.btn} ${page.comment_btn}`}>
          <RiThumbUpLine className={page.icon} /> 176
        </button>
        <button className={page.btn}>
          <RiMessage3Line className={page.icon} />
        </button>
      </div>
    </div>
  )
}

export default Reply
