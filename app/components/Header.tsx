import Link from 'next/link'
import Image from 'next/image'
import {
  RiSunLine,
  RiMoonLine,
  RiPencilLine,
  RiSearchLine,
} from 'react-icons/ri'

const Header = () => {
  return (
    <header className='bg-secondaryBackgroundColorLight sticky top-0 z-10 px-2 drop-shadow-md'>
      <nav className='relative container flex justify-between items-center mx-auto py-3'>
        <h1 className='text-2xl font-bold'>DAM</h1>
        <ul className='flex justify-between items-center gap-7 text-lg'>
          <li className='text-2xl text-lightColorAlt hover:text-lightColor'>
            <button className='flex justify-center items-center'>
              <RiSearchLine />
            </button>
          </li>
          <li className='text-2xl text-lightColorAlt hover:text-lightColor'>
            <button className='flex justify-center items-center'>
              <RiMoonLine />
            </button>
          </li>
          {/* <li className='text-2xl text-lightColorAlt hover:text-lightColor'>
            <Link href='/new'>
              <RiPencilLine />
            </Link>
          </li> */}
          <li className='w-[100px] h-[50px]'>
            <div className='relative w-[100%] h-[100%] gradient-color flex justify-center items-center'>
              <Link
                href='/login'
                className='absolute px-[20px] py-[7px] bg-secondaryBackgroundColorLight'
              >
                Log In
              </Link>
            </div>
          </li>
          {/* <li>
            <Link href='/profile'>
              <Image
                src='/lets.escape.matrix.png'
                alt='Picture of the author'
                width={40}
                height={40}
                className='rounded-full'
              />
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  )
}

export default Header
