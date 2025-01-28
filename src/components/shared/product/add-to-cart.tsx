'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Plus, Loader } from 'lucide-react'
import { CartItem } from '@/types'
import { useToast } from '@/hooks/use-toast'

import { useTransition } from 'react'
import { addItemToCart } from '@/lib/actions/cart.actions'
import { ToastAction } from '@/components/ui/toast'

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter()
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  const handleAddToCart = async () => {
    const res = await addItemToCart(item)

    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.message
      })
      return
    }

    //Handle success add to cart
    toast({
      description: `${item.name} added to cart`,
      action: (
        <ToastAction
          className='bg-primary text-white hover:bg-gray-800'
          altText='Go To Cart'
          onClick={() => router.push('/cart')}
        >
          Go To Cart
        </ToastAction>
      )
    })
  }

  return (
    <div>
      <Button className='w-full' type='button' onClick={handleAddToCart}>
        {isPending ? (
          <Loader className='h-4 w-4 animate-spin' />
        ) : (
          <Plus className='h-4 w-4' />
        )}{' '}
        Add To Cart
      </Button>
    </div>
  )
}

export default AddToCart
