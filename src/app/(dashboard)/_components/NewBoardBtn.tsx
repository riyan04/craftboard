"use client"

import { useApiMutation } from "@/hooks/useApiMutation"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { api } from "../../../../convex/_generated/api"
import { toast } from "sonner"

interface NewBoardBtnProps {
    organizationId: string,
    disabled?: boolean
}

const NewBoardBtn = ({organizationId, disabled}: NewBoardBtnProps) => {
  const {mutate, awaiting} = useApiMutation(api.board.create)
  const onClick = () => {
    mutate({
      title: "Untitled",
      organizationID: organizationId
    })
    .then((id)=>{
      toast.success("Board created")
      // TODO: redirect to /board/{id}
    })
    .catch(() => toast.error("Failed to create the board"))
  }
  return (
    <button 
      disabled={awaiting || disabled}
      onClick={onClick}
      className={cn(
        " col-span-1 spect-[100/127] bg-[#EEEEEE] border border-[#a7a7a7] rounded-lg hover:bg-[#bbbbbb] flex flex-col items-center justify-center py-7",
        (awaiting || disabled) && "opacity-75 hover:bg-[#EEEEEE] cursor-not-allowed"
      )}
    >
      <Plus className=" h-9 w-9 text-gray-500 stroke-1" />
      <p className=" text-[13px] font-light ">
        New Board
      </p>
    </button>
  )
}

export default NewBoardBtn