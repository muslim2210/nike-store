'use client'

import ProductInfo from '@/components/custom/Card/ProductInfo'
import ProductDetailImage from '@/components/custom/slider/ProductDetailImage'
import Wrapper from '@/components/layout/Wrapper'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchDetail } from '@/hooks/useFetchDetail'
import { use } from 'react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { data: productDetails, loading } = useFetchDetail({
    url: '/api/products',
    id: Number(id),
    params: { with: ["collection"] }
  });

  // Jika loading → tampilkan full skeleton layout
  if (loading) {
    return (
      <Wrapper className="my-8 md:my-12 min-h-screen">
        <div className="flex flex-col md:flex-row lg:px-10 gap-2 md:gap-10 lg:gap-[70px]">
          
          {/* LEFT SKELETON */}
          <div className='flex-1 w-full'>
            <Skeleton className="max-w-full h-[250px] md:[350px] lg:h-[450px] rounded-[10px]" />
          </div>
         
          {/* RIGHT SKELETON */}
          <div className="flex-1 mt-10 md:mt-12 lg:mt-0 flex flex-col gap-4 py-3 space-y-4">
            <Skeleton className="h-6 max-w-[300px] md:max-w-[400px]" />
            <Skeleton className="h-5 max-w-[120px] md:max-w-[250px]" />
            <Skeleton className="h-5 max-w-[260px] md:max-w-[350px]" />
            <Skeleton className="h-5 max-w-[260px] md:max-w-[350px]" />
            <Skeleton className="h-5 max-w-[260px] md:max-w-[350px]" />
            <div className='grid grid-cols-3 gap-3 max-w-[350px]'>
              <Skeleton className="h-7 max-w-[100px]" />
              <Skeleton className="h-7 max-w-[100px]" />
              <Skeleton className="h-7 max-w-[100px]" />
            </div>
             <div className='grid grid-cols-3 gap-3 max-w-[350px]'>
              <Skeleton className="h-7 max-w-[100px]" />
              <Skeleton className="h-7 max-w-[100px]" />
              <Skeleton className="h-7 max-w-[100px]" />
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // Jika tidak ada data → produk tidak ditemukan
  if (!productDetails) {
    return (
      <Wrapper className="my-8 md:my-12 min-h-screen">
        <p className="text-center text-gray-500">Produk tidak ditemukan.</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper className='my-8 md:my-12'>
      <div className="flex flex-col md:flex-row lg:px-10 gap-2 md:gap-10 lg:gap-[50px]">

        {/* LEFT COLUMN */}
        <div className="w-full md:w-auto flex-1 max-w-[350px] md:max-w-[600px] lg:max-w-full mx-auto lg:mx-0">
          {productDetails?.images?.length ? (
            <ProductDetailImage productMedia={productDetails.images} />
          ) : (
            <p className="text-gray-500">Tidak ada gambar</p>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 mt-[-230px] md:mt-0">
          <ProductInfo productInfo={productDetails} />
        </div>

      </div>
    </Wrapper>
  );
}
