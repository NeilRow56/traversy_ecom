import ProductCard from '@/components/shared/product/product-card'
import { getAllCategories, getAllProducts } from '@/lib/actions/product.actions'
import Link from 'next/link'

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string
    category?: string
    price?: string
    rating?: string
    sort?: string
    page?: string
  }>
}) => {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1'
  } = await props.searchParams

  const products = await getAllProducts({
    query: q,
    category: category,
    price: price,
    rating: rating,
    sort: sort,
    page: Number(page)
  })

  const categories = await getAllCategories()

  return (
    <div className='grid md:grid-cols-5 md:gap-5'>
      <div className='filter-links'>
        {/* Category Links */}
        <div className='mb-2 mt-3 text-xl'>Department</div>
        <div>
          <ul className='space-y-1'>
            <li>
              <Link
                className={`${
                  (category === 'all' || category === '') && 'font-bold'
                }`}
                href='/'
              >
                Any
              </Link>
            </li>
            {categories.map(x => (
              <li key={x.category}>
                <Link
                  className={`${category === x.category && 'font-bold'}`}
                  href='/'
                >
                  {x.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='space-y-4 md:col-span-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {products.data.length === 0 && <div>No products found</div>}
          {products.data.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
