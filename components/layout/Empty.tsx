import { LuFolderHeart } from "react-icons/lu";
import { ArrowUpRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

type Props = {
  title: string
  subtitle?: string
}

const EmptyComponent = ({ title, subtitle }: Props) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <LuFolderHeart />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>
          {subtitle || " You haven&apos;t created any projects yet. Get started by creating your first project."}
         
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Go to Products</Button>
          <Button variant="outline">Back to Home</Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}

export default EmptyComponent
