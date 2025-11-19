'use client'
import { CardLoading } from '@/components/custom/Card/CardLoading'
import ProductCard from '@/components/custom/Card/ProductCard'
import EmptyComponent from '@/components/layout/Empty'
import Wrapper from '@/components/layout/Wrapper'
import HeaderSection from '@/components/section/HeaderSection'
import { useFetch } from '@/hooks/useFetch'
import { ProductType } from '@/types/model'

const ProductsPage = () => {
   const { data: products, loading, response } = useFetch({
        url: "/api/products",
        params: {
          with: ["collection"],
        }
    });


  return (
    <Wrapper className='my-8 md:my-12 min-h-screen'>
      <HeaderSection title='Products Page' totalProduct={response?.data.data.total} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 my-8 md:my-14 md:px-0">
        {loading ? (
          <CardLoading count={8} />
        ) : (
          <>
            {
              products && products.map((product: ProductType) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </>
        )}
      </div>

      {products && products.length === 0 && (
        <EmptyComponent title='Product Not Found' />
      )}
    </Wrapper>
  )
}

export default ProductsPage
