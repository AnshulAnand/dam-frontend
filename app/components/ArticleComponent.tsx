import Image from 'next/image'

export default function ArticleComponent() {
  return (
    <>
      <div className='flex m-2 rounded-md border-[1px] border-slate-500 bg-secondaryBackgroundColorLight'>
        <div>
          <img
            src='/lets.escape.matrix.png'
            alt='Alt text for image'
            className='rounded-l-md max-w-[100%]'
          />
        </div>
        <div className='p-3'>
          <div className='flex gap-3 items-center'>
            <Image
              src='/lets.escape.matrix.png'
              alt='Picture of the author'
              width={40}
              height={40}
              className='rounded-full'
            />
            <div>
              <h3>Anshul Anand</h3>
              <p>April 29</p>
            </div>
          </div>
          <h1>
            Creating Visual Interest: How to Use MouseMove Hover to Reveal
            Background Images
          </h1>
          <div>
            <span>#webdev</span>
            <span>#javascript</span>
            <span>#beginners</span>
            <span>#tutorial</span>
          </div>
          <div>
            <div>
              <span>5</span>
              <span>10</span>
            </div>
            <span>5 min read</span>
          </div>
        </div>
      </div>
    </>
  )
}
