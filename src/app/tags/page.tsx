import Tag from '@/components/Tag'

export default function page() {
  const tags = [
    'marvel',
    'dc',
    'bleach',
    'dragonball',
    'pokemon',
    'jojo',
    'naruto',
    'onepiece',
    'onepunchman',
    'jujutsukaisen',
    'boruto',
    'blackclover',
    'fairytail',
  ]

  return (
    <section style={{ marginTop: '5rem' }} className='popular-tags section'>
      <div className='container'>
        <h2 className='title section-title' data-name='Popular tags'>
          Popular tags
        </h2>
        <div className='popular-tags-container d-grid'>
          {tags.length > 0 && tags.map(tag => <Tag tag={tag} key={tag} />)}
        </div>
      </div>
    </section>
  )
}
