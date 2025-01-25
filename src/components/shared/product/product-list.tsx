import ProductCard from './product-card'

const ProductList = ({
  data,
  title,
  limit
}: {
  data: any
  title: string
  limit?: number
}) => {
  //slice() method selects from a given start, up to a (not inclusive) given end.
  const limitedData = limit ? data.slice(0, limit) : data
  return (
    <div className='my-10'>
      <h2 className='h2-bold mb-4'>{title}</h2>

      {data.length > 0 ? (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {limitedData.map((product: any) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div>
          <p>No Products found</p>
        </div>
      )}
    </div>
  )
}

export default ProductList
