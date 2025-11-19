'use client'
import { CardLoading } from '@/components/custom/Card/CardLoading';
import ProductCard from '@/components/custom/Card/ProductCard';
import EmptyComponent from '@/components/layout/Empty';
import Wrapper from '@/components/layout/Wrapper'
import HeaderSection from '@/components/section/HeaderSection'
import { useFetch } from '@/hooks/useFetch';
import { useWishlist } from '@/stores/useWishlist';
import { ProductType } from '@/types/model';
import { useEffect } from 'react';


const WishlistPage = () => {
  // ambil data dari API
  const { data: apiWishlist, loading } = useFetch({
    url: "/api/wishlist",
  });

  // ambil store wishlist (ID array)
  const { wishlist, hydrateWishlist } = useWishlist();

  // saat API selesai → hydrate ke store
  useEffect(() => {
    if (apiWishlist) {
      hydrateWishlist(apiWishlist); 
    }
  }, [apiWishlist, hydrateWishlist]);

  return (
    <Wrapper className='my-8 md:my-12 min-h-screen'>
      <HeaderSection title='Wishlist Page' totalProduct={wishlist.length} >
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Checkout
        </button>
      </HeaderSection>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 my-8 md:my-14 md:px-0">
        {loading ? (
          <CardLoading count={8} />
        ) : (
          <>
            {apiWishlist?.filter((product: ProductType) =>
              wishlist.includes(product.id)
            ).map((product: ProductType) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </>
        )}
      </div>

      {apiWishlist && wishlist.length === 0 && (
        <EmptyComponent title='Wishlist is Empty' isSubtitle subtitle='add wishlist in your cart'/>
      )}
    </Wrapper>
  )
}

export default WishlistPage;
