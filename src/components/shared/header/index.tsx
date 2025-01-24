import Image from 'next/image'
import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { ShoppingCart, User2Icon } from 'lucide-react'

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          <Link href='/' className='flex-start ml-4'>
            <Image
              src='/images/logo.svg'
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority={true}
            />
            <span className='ml-3 hidden text-2xl font-bold lg:block'>
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className='space-x-2'>
          <Button variant='ghost' asChild>
            <Link href='/cart'>
              <ShoppingCart />
            </Link>
          </Button>
          <Button variant='ghost' asChild>
            <Link href='/sign-in'>
              <User2Icon />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
