'use client'

import { RiThumbUpLine, RiPencilLine, RiDeleteBinLine } from 'react-icons/ri'
import page from '../articles/[article]/page.module.css'
import Profile from './Profile'

function Reply() {
  return (
    <div className={page.reply}>
      <div className={page.profile}>
        <Profile width={40} height={40} forArticle={false} />
        <div style={{ display: 'flex' }}>
          <div className={page.edit_btn}>
            <RiPencilLine />
          </div>
          <div style={{ marginLeft: '1rem' }} className={page.delete_btn}>
            <RiDeleteBinLine />
          </div>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
        cum, dolorum nobis ipsam obcaecati reprehenderit itaque ad amet nostrum
        illum libero assumenda, illo asperiores vitae fugit, voluptate nulla
        repellat eum?
      </p>
      <button
        className={page.button}
        style={{ marginLeft: 0, marginTop: '1rem' }}
      >
        <RiThumbUpLine />
      </button>
      <button
        style={{ marginLeft: '1rem', marginTop: '1rem' }}
        className={page.button}
      >
        Reply
      </button>
    </div>
  )
}

export default Reply
