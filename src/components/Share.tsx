import {
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share'

export default function Share({ shareUrl }: { shareUrl: string }) {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <WhatsappShareButton url={shareUrl}>
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>

      <RedditShareButton url={shareUrl}>
        <RedditIcon size={40} round={true} />
      </RedditShareButton>

      <TwitterShareButton url={shareUrl}>
        <TwitterIcon size={40} round={true} />
      </TwitterShareButton>
    </div>
  )
}
