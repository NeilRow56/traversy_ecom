import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { Product } from '@/types'
import ProductPrice from './product-price'

const ProductCard = ({ product }: { product: any }) => {
  return (
    <Card className='relative w-full max-w-sm'>
      <CardHeader className='items-center p-0'>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            height={300}
            width={300}
            priority={true}
          />
        </Link>
      </CardHeader>
      <CardContent className='grid gap-4 p-4'>
        <div className='text-xs'>{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className='text-sm font-medium'>{product.name}</h2>
        </Link>
        <div className='h-4'></div>
        <div className=''>
          <div className='absolute bottom-2 left-4 flex gap-4'>
            {product.rating} Stars
          </div>

          {product.stock > 0 ? (
            <div className='absolute bottom-2 right-4 flex'>
              <ProductPrice value={product.price} />
            </div>
          ) : (
            <div className='absolute bottom-2 right-2 flex'>
              <p className='text-destructive'>Out of Stock</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
