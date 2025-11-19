import { LuFolderHeart } from "react-icons/lu";
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { useRouter } from "next/navigation";

type Props = {
  title: string
  subtitle?: string
  isSubtitle?: boolean
}

const EmptyComponent = ({ title, subtitle, isSubtitle }: Props) => {

  const router = useRouter();

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <LuFolderHeart />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>
          {isSubtitle ? subtitle || " You haven&apos;t created any projects yet. Get started by creating your first project." : ""}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button onClick={() => router.push("/products")}>Go to Products</Button>
          <Button onClick={() => router.push("/")} variant="outline">Back to Home</Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}

export default EmptyComponent
