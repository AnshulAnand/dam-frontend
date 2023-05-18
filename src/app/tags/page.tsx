import Tag from '@/components/Tag'

const page = () => {
  const tags = [
    'bleach',
    'db',
    'jojo',
    'naruto',
    'onepiece',
    'opm',
    'bleach',
    'db',
    'jojo',
    'naruto',
    'onepiece',
    'opm',
    'bleach',
    'db',
    'jojo',
    'naruto',
    'onepiece',
    'opm',
  ]
  return (
    <section style={{marginTop: '5rem'}} className='popular-tags section'>
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
export default page
