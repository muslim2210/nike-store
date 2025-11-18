import { Skeleton } from "@/components/ui/skeleton"

export function CardLoading({ count = 4 }: { count?: number }) {
  return (
    <>
    {Array.from({ length: count }).map((_, i) => (  
      <div key={i} className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] md:h-[170px] max-w-[350px] lg:max-w-[400px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 max-w-[130px] md:max-w-[250px]" />
          <Skeleton className="h-4 max-w-[100px] md:max-w-[200px]" />
        </div>
      </div>
      ))}
    </>
  )
}
