import {
  RiShareForwardLine,
  RiThumbUpLine,
  RiPencilLine,
  RiDeleteBinLine,
  RiChat1Line,
} from 'react-icons/ri'
import page from '@/app/articles/[article]/page.module.css'

const Controls = () => {
  return (
    <div className={page.controls}>
      <button>
        <RiThumbUpLine />5
      </button>
      <button>
        <RiChat1Line />9
      </button>
      <button>
        <RiShareForwardLine />
        Share
      </button>
      <button>
        <RiPencilLine /> Edit
      </button>
      <button>
        <RiDeleteBinLine /> Delete
      </button>
    </div>
  )
}

export default Controls
