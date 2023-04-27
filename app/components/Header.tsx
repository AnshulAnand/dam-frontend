import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <header className='bg-white sticky top-0 z-10 px-2'>
      <nav className='container flex justify-between items-center mx-auto py-3'>
        <h1 className='text-2xl'>DAM</h1>
        <ul className='flex justify-between items-center'>
          <li className='mx-2'>
            <Link href='/new'>Write</Link>
          </li>
          <li className='mx-2'>
            <Link href='/login'>Log in</Link>
          </li>
          <li className='mx-2'>
            <Link href='/profile'>
              <Image
                src='/lets.escape.matrix.png'
                alt='Picture of the author'
                width={40}
                height={40}
                className='rounded-full'
              />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
