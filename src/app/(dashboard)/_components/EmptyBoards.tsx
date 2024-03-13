"use client"

// To refer to the process of calling mutation from client, check https://docs.convex.dev/functions/mutation-functions#calling-mutations-from-clients


import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api"
import { useOrganization } from "@clerk/nextjs";

const EmptyBoards = () => {
  const {organization} = useOrganization()
  const create = useMutation(api.board.create)
  const onClick = () => {
    if(!organization) return
    create({
      title: "Untitled",
      organizationID: organization?.id
    })
  }
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
        <Button size="lg" className="mt-7" onClick={onClick}>
          Create Board
        </Button>
    </div>
  )
}

export default EmptyBoards