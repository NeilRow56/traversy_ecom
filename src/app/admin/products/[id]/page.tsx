import { getProductById } from '@/lib/actions/product.actions'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductForm from '../create/product-form'

export const metadata: Metadata = {
  title: 'Update Product'
}

const AdminProductUpdatePage = async (props: {
  params: Promise<{
    id: string
  }>
}) => {
  const { id } = await props.params

  const product = await getProductById(id)

  if (!product) return notFound()

  return (
    <div className='mx-auto max-w-5xl space-y-8'>
      <h1 className='h2-bold'>Update Product</h1>

      <ProductForm type='Update' product={product} productId={product.id} />
    </div>
  )
}

export default AdminProductUpdatePage
