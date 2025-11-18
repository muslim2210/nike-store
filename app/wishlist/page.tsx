'use client'
import ProductCard from '@/components/custom/Card/ProductCard';
import EmptyComponent from '@/components/layout/Empty';
import Wrapper from '@/components/layout/Wrapper'
import HeaderSection from '@/components/section/HeaderSection'
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useFetch } from '@/hooks/useFetch';
import { ProductType } from '@/types/model';


const WishlistPage = () => {
  const { data: wishlist, loading } = useFetch({
          url: "/api/wishlist",
  });


  return (
    <Wrapper className='my-8 md:my-12 min-h-screen'>
      <HeaderSection title='Wishlist Page' totalProduct={wishlist?.length} />

        {/* products grid start */}
        {loading ? (
          <Button variant="outline" disabled size="sm">
            <Spinner />
            Please wait
          </Button>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 my-8 md:my-14 md:px-0">
            {wishlist?.map((product: ProductType) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

        {
          wishlist && wishlist.length === 0 && (
           <EmptyComponent title='Wishlist is Empty'/>
          )
        }
    </Wrapper>
  )
}

export default WishlistPage
