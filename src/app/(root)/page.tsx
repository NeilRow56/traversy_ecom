import ProductCarousel from '@/components/shared/product/product-carousel'
import ProductList from '@/components/shared/product/product-list'
import {
  getFeaturedProducts,
  getLatestProducts
} from '@/lib/actions/product.actions'
import ViewAllProductsButton from '@/lib/view-all-products-button'

const Homepage = async () => {
  const latestProducts = await getLatestProducts()
  const featuredProducts = await getFeaturedProducts()
  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProducts} title='Newest Arrivals' />
      <ViewAllProductsButton />
    </>
  )
}

export default Homepage
