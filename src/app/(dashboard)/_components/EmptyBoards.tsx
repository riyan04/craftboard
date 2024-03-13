import { Button } from "@/components/ui/button";
import Image from "next/image";

const EmptyBoards = () => {
  return (
    <div className=" h-full flex flex-col items-center justify-center">
        <Image 
            src="/emptyBoards.svg"
            alt="not found"
            height={200}
            width={200}
        />
        <h1 className=" text-2xl font-semibold mt-7">
            No Boards found
        </h1>
        <p className=" text-muted-foreground textg-sm mt-3">
            Create a Craftboard
        </p>
        <Button size="lg" className="mt-7">
          Create Board
        </Button>
    </div>
  )
}

export default EmptyBoards