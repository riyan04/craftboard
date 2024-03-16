"use client"

// To refer to the process of calling mutation from client, check https://docs.convex.dev/functions/mutation-functions#calling-mutations-from-clients


import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api"
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/useApiMutation";
import { toast } from "sonner"
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";


const EmptyBoards = () => {
  const router = useRouter() // Get the router methods. For example router.push('/dashboard')
  const {organization} = useOrganization()
  const { mutate, awaiting} = useApiMutation(api.board.create)
  const onClick = () => {
    if(!organization) return
    mutate({
      title: "Untitled",
      organizationID: organization?.id
    })
    .then((id) => {
      toast.success("Board created")
      // TODO: redirect to board/{id}
      router.push(`/board/${id}`)
    })
    .catch(() => toast.error("Failed to create the board"))
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
        <Button disabled={awaiting} size="lg" className="mt-7" onClick={onClick}>
          Create Board
        </Button>
    </div>
  )
}

export default EmptyBoards